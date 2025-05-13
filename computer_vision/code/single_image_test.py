import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import matplotlib.pyplot as plt

model = tf.keras.models.load_model("phone_brand_classifier_efficientnet_v2.h5")

class_names = ['apple', 'asus', 'google', 'motorola', 'nokia', 'oppo', 'samsung', 'vivo', 'xiaomi']

img_path = "../test_images/test.jpg" 

img = image.load_img(img_path, target_size=(224, 224))
img_array = image.img_to_array(img)
img_array = tf.expand_dims(img_array, 0) 

predictions = model.predict(img_array)
predicted_index = np.argmax(predictions[0])
confidence = np.max(predictions[0]) * 100

print(f"Prediction: {class_names[predicted_index]} (%{confidence:.2f} güven)")

plt.imshow(img)
plt.title(f"Prediction: {class_names[predicted_index]} (%{confidence:.2f})")
plt.axis("off")
plt.show()
