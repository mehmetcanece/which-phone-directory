import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from PIL import Image
import shutil
from PIL import ImageOps

AUGMENTED_IMAGES_PER_IMAGE = 2  #increases total photo of a brand by 3x
LOW_DATASET_DIR = "../Phone_Images/samsung"    # Change folder accordingly
OUTPUT_DIR = "../Phone_Images/samsung_note_augmented"  # Change output folder accordingly

datagen = ImageDataGenerator(
    rotation_range=10,
    width_shift_range=0.05,
    height_shift_range=0.05,
    zoom_range=0.1,
    brightness_range=[0.9, 1.1],
    horizontal_flip=False,
    fill_mode='nearest'
)

if os.path.exists(OUTPUT_DIR):
    shutil.rmtree(OUTPUT_DIR)
os.makedirs(OUTPUT_DIR, exist_ok=True)

for filename in os.listdir(LOW_DATASET_DIR):
    if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
        path = os.path.join(LOW_DATASET_DIR, filename)

        try:
            img = Image.open(path).convert("RGB")
            img = ImageOps.pad(img, (224, 224), color=(0, 0, 0)) 
            x = tf.keras.preprocessing.image.img_to_array(img)
            x = x.reshape((1,) + x.shape)

            count = 0
            for batch in datagen.flow(x, batch_size=1, save_to_dir=OUTPUT_DIR,
                                       save_prefix=filename.split('.')[0],
                                       save_format='jpeg'):
                count += 1
                if count >= AUGMENTED_IMAGES_PER_IMAGE:
                    break
        except Exception as e:
            print(f"Hata oluştu: {filename} - {e}")

print("✅ Augmentation complete. Folder:", OUTPUT_DIR)
