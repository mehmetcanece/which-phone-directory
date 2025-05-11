import os

folder_path = "../Phone_Images/vivo"
prefix = "vivo" 

images = sorted([f for f in os.listdir(folder_path) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])

for i, filename in enumerate(images, 1):
    ext = os.path.splitext(filename)[1]
    new_name = f"{prefix}_{i}{ext}"
    src = os.path.join(folder_path, filename)
    dst = os.path.join(folder_path, new_name)
    os.rename(src, dst)

print(f"success")
