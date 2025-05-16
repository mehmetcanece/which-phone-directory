import os
import cv2
import torch
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from ultralytics import YOLO


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
YOLO_MODEL_PATH = os.path.abspath(os.path.join(BASE_DIR, "../../runs/detect/train4/weights/best.pt"))
EFFNET_MODEL_PATH = os.path.abspath(os.path.join(BASE_DIR, "phone_brand_classifier_efficientnet_v2.h5"))

class_names = ['apple', 'asus', 'google', 'motorola', 'nokia', 'oppo', 'samsung', 'vivo', 'xiaomi']

yolo_model = YOLO(YOLO_MODEL_PATH)
eff_model = tf.keras.models.load_model(EFFNET_MODEL_PATH)

def predict_phone_brand(image_path: str, threshold: float = 40.0) -> dict | None:
    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError(f"Image not found: {image_path}")

    print(" YOLO starting...")
    results = yolo_model.predict(source=image_path, conf=0.25, save=False, verbose=False)
    boxes = results[0].boxes

    if boxes and len(boxes) > 0:
        confidences = boxes.conf.cpu().numpy()
        best_index = np.argmax(confidences)
        best_box = boxes[best_index]

        class_id = int(best_box.cls.cpu().numpy()[0])
        yolo_confidence = float(best_box.conf.cpu().numpy()[0]) * 100  

        print(f"YOLO prediction: {class_names[class_id]}, Confidence: {yolo_confidence:.2f}%")

        if yolo_confidence >= threshold:
            return {
                "source": "yolo",
                "brand": class_names[class_id],
                "confidence": yolo_confidence  
            }

        print(" YOLO has low confidence, trying EfficientNet...")

    else:
        print(" YOLO couldn't found a result, trying EfficientNet...")

    print(" EfficientNet starting...")
    resized_img = cv2.resize(img, (224, 224))
    img_array = image.img_to_array(resized_img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = eff_model.predict(img_array)
    predicted_index = np.argmax(predictions[0])
    eff_confidence = float(np.max(predictions[0])) * 100  

    print(f" EfficientNet prediciton: {class_names[predicted_index]}, Confidence: {eff_confidence:.2f}%")

    if eff_confidence >= threshold:
        return {
            "source": "efficientnet",
            "brand": class_names[predicted_index],
            "confidence": eff_confidence  
        }

    print("Both models couldnt find it")
    return None