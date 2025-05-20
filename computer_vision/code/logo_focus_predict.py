import os
import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image                                                                                        #type: ignore
from ultralytics import YOLO

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
YOLO_MODEL_PATH = os.path.abspath(os.path.join(BASE_DIR, "../../runs/detect/train4/weights/best.pt"))
EFFNET_MODEL_PATH = os.path.abspath(os.path.join(BASE_DIR, "phone_brand_classifier_efficientnet_v2.h5"))

class_names = ['apple', 'asus', 'google', 'motorola', 'nokia', 'oppo', 'samsung', 'vivo', 'xiaomi']

yolo_model = YOLO(YOLO_MODEL_PATH)
eff_model = tf.keras.models.load_model(EFFNET_MODEL_PATH)

def predict_phone_brand(image_path: str, threshold: float = 80.0) -> dict | None:
    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError(f"Image not found: {image_path}")

    print(" YOLO starting...")
    results = yolo_model.predict(source=image_path, conf=0.25, save=False, verbose=False)
    boxes = results[0].boxes

    yolo_brand, yolo_confidence = None, 0.0
    if boxes and len(boxes) > 0:
        confidences = boxes.conf.cpu().numpy()
        best_index = np.argmax(confidences)
        best_box = boxes[best_index]
        class_id = int(best_box.cls.cpu().numpy()[0])
        yolo_brand = class_names[class_id]
        yolo_confidence = float(best_box.conf.cpu().numpy()[0]) * 100
        print(f"YOLO prediction: {yolo_brand}, Confidence: {yolo_confidence:.2f}%")
    else:
        print(" YOLO couldn't find a result.")

    print(" EfficientNet starting...")
    resized_img = cv2.resize(img, (224, 224))
    img_array = image.img_to_array(resized_img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = eff_model.predict(img_array, verbose=0)
    predicted_index = np.argmax(predictions[0])
    eff_confidence = float(np.max(predictions[0])) * 100
    eff_brand = class_names[predicted_index]
    print(f" EfficientNet prediction: {eff_brand}, Confidence: {eff_confidence:.2f}%")

    if yolo_confidence >= threshold and eff_confidence >= threshold:
        if yolo_brand == eff_brand:
            print("Both models agree with high confidence.")
            print("Brand:", yolo_brand)
            return {
                "source": "both_agree",
                "brand": yolo_brand,
                "confidence": (yolo_confidence + eff_confidence) / 2
            }
        else:
            if yolo_confidence > eff_confidence:
                print("Conflict with high confidence, choosing YOLO.")
                print("Brand:", yolo_brand)
                return {
                    "source": "yolo_high_conf",
                    "brand": yolo_brand,
                    "confidence": yolo_confidence
                }
            else:
                print("Conflict with high confidence, choosing EfficientNet.")
                print("Brand:", eff_brand)
                return {
                    "source": "eff_high_conf",
                    "brand": eff_brand,
                    "confidence": eff_confidence
                }

    elif yolo_confidence >= threshold:
        print("Only YOLO has high confidence.")
        print("Brand:", yolo_brand)
        return {
            "source": "yolo_only_confident",
            "brand": yolo_brand,
            "confidence": yolo_confidence
        }

    elif eff_confidence >= threshold:
        print("Only EfficientNet has high confidence.")
        print("Brand:", eff_brand)
        return {
            "source": "eff_only_confident",
            "brand": eff_brand,
            "confidence": eff_confidence
        }

    print("Both models have low confidence. Brand not recognised.")
    return {
        "source": "none_confident",
        "brand": "brand not recognised",
        "confidence": None
    }
