import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay

#load the desired model
model = tf.keras.models.load_model("phone_brand_classifier_efficientnet_v2.h5")

validation_dataset = tf.keras.utils.image_dataset_from_directory(
    '../train_images',
    validation_split=0.2,
    subset="validation",
    seed=42,
    image_size=(224, 224),
    batch_size=32
)

class_names = validation_dataset.class_names
validation_dataset = validation_dataset.prefetch(tf.data.AUTOTUNE)

y_true = []
y_pred = []

for images, labels in validation_dataset:
    predictions = model.predict(images)
    y_true.extend(labels.numpy())
    y_pred.extend(np.argmax(predictions, axis=1))

cm = confusion_matrix(y_true, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=class_names)

plt.figure(figsize=(10, 8))
disp.plot(cmap=plt.cm.Blues, xticks_rotation=45, values_format='d')
plt.title("Confusion Matrix – Brand Recognition")
plt.tight_layout()
plt.show()