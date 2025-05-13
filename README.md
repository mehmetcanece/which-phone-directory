# 📱 Which Phone Project

A full-stack, containerized decision support system for smartphone selection based on user-defined preferences and computer vision brand recognition.

## 🔧 Tech Stack

- **Frontend**: React (JavaScript)
- **Backend**: FastAPI (Python)
- **Computer Vision**: OpenCV, TensorFlow, YOLOv8
- **Containerization**: Docker

---

## 📂 Project Structure

```
which-phone-project/
├── backend/
├── computer_vision/
├── frontend/
```

---

## 🚀 Getting Started (with Docker)


### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/which-phone-project.git
cd which-phone-project
```

### 2. Build Containers

```bash
docker-compose build --no-cache
```

### 3. Run the Application

```bash
docker-compose up
```

### 4. Access the App

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000/docs](http://localhost:8000/docs)

### 5. Stop Everything

```bash
docker-compose down --volumes --remove-orphans
```

---

## 🧠 Features

- Upload a smartphone back cover image to **brand recognition** using object recognition.
- Choose filtering criteria such as **RAM**, **internal memory**, **screen size**, **camera quality**, and **price**.
- See the top 5 phones calculated using **Multi-Criteria Decision Analysis (MCDA)**.
- Fully containerized setup with minimal system dependencies.

---


## 📦 Docker Notes

Your `backend/Dockerfile` must include the following to support OpenCV:

```dockerfile
RUN apt-get update && apt-get install -y libgl1-mesa-glx libglib2.0-0
```

These packages are required for OpenCV’s `cv2` module to run correctly.

---

## 🧪 API Endpoints

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | `/home`                      | Welcome/info message                 |
| POST   | `/recognition`          | Detect phone brand from uploaded image |
| GET    | `/recognition/result`   | Return top 5 phones based on recognized brand|
| POST   | `/filter-criteria`          | Receive user filter preferences      |
| GET    | `/filter-criteria/result`   | Return top 5 phones based on MCDA    |

---

## 👥 Contributors
– Computer Engineering  
- Mehmetcan Ece
- Ecir Aykan Bican  
- Berk Erdoğan  
– Industrial Engineering  
- Aslı Konuk 
- Ayşegül Özer  
- Taha Türkmen

---

## 📄 License

This project is developed for academic purposes and is not intended for commercial use.

---

## 💬 Feedback & Contact

For questions or suggestions, feel free to open an issue or contact the team.

