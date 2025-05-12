import os

# Eski ID → Yeni ID eşlemesi
id_map = {
    15: 0,  # apple
    16: 1,  # asus
    17: 2,  # google
    18: 3,  # motorola
    19: 4,  # nokia
    20: 5,  # oppo
    21: 6,  # samsung
    22: 7,  # vivo
    23: 8   # xiaomi
}

labels_dir = "C:/Users/Ercan Bican/which-phone-directory/yolo_logos/labels/train"

for filename in os.listdir(labels_dir):
    if filename.endswith(".txt"):
        file_path = os.path.join(labels_dir, filename)
        with open(file_path, "r") as file:
            lines = file.readlines()

        new_lines = []
        for line in lines:
            parts = line.strip().split()
            if not parts:
                continue
            try:
                old_class_id = int(parts[0])
                parts[0] = str(id_map.get(old_class_id, old_class_id))  # Eğer map'te yoksa olduğu gibi bırak
                new_lines.append(" ".join(parts) + "\n")
            except ValueError:
                print(f"⚠️ Hatalı satır atlandı: {line.strip()}")
                new_lines.append(line)  # hatalıysa orijinal haliyle bırak

        with open(file_path, "w") as file:
            file.writelines(new_lines)

print("✅ Tüm .txt dosyaları başarıyla güncellendi (veri silinmedi).")
