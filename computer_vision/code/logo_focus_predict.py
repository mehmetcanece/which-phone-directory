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

def predict_phone_brand(image_path: str) -> dict:
    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError(f"Image not found: {image_path}")
    
    results = yolo_model.predict(source=image_path, conf=0.25, save=False, verbose=False)
    boxes = results[0].boxes

    if boxes and len(boxes) > 0:
        best_box = boxes[np.argmax(boxes.conf.cpu().numpy())]
        class_id = int(best_box.cls.cpu().numpy()[0])
        confidence = float(best_box.conf.cpu().numpy()[0]) * 100
        return {"source": "yolo", "brand": class_names[class_id], "confidence": confidence}
    
    # YOLO bulamazsa EfficientNet'e geç
    resized_img = cv2.resize(img, (224, 224))
    img_array = image.img_to_array(resized_img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = eff_model.predict(img_array)
    predicted_index = np.argmax(predictions[0])
    confidence = np.max(predictions[0]) * 100

    return {"source": "efficientnet", "brand": class_names[predicted_index], "confidence": confidence}