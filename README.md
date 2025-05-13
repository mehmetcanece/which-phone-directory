# 📱 Which Phone Project

A full-stack, containerized decision support system for smartphone selection based on user-defined preferences and computer vision-based brand recognition.

---

## Tech Stack

- **Frontend**: React (JavaScript)
- **Backend**: FastAPI (Python)
- **Computer Vision**: OpenCV, TensorFlow, YOLOv8
- **Containerization**: Docker

---

## Project Structure

```
which-phone-project/
├── backend/
├── computer_vision/
├── frontend/
```

---

## Getting Started (with Docker)

### 1. Clone the Repository

```bash
git clone https://github.com/mehmetcanece/which-phone-project.git
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

- Frontend: http://localhost:3000  
- Backend API: http://localhost:8000/docs

### 5. Stop Everything

```bash
docker-compose down --volumes --remove-orphans
```

---

## Key Features

- Upload a smartphone back cover image to detect its brand using object recognition.
- Select filtering criteria such as RAM, internal memory, screen size, camera quality, and price.
- Get the top 5 recommended phones using Multi-Criteria Decision Analysis (MCDA).
- Fully containerized architecture with minimal dependencies.

---

## Docker Notes

Ensure the following dependencies are present in `backend/Dockerfile` for OpenCV:

```dockerfile
RUN apt-get update && apt-get install -y libgl1-mesa-glx libglib2.0-0
```

---

## API Endpoints

| Method | Endpoint                     | Description                            |
|--------|------------------------------|----------------------------------------|
| GET    | `/home`                      | Welcome/info message                   |
| POST   | `/recognition`               | Detect phone brand from image          |
| GET    | `/recognition/result`        | Return top 5 phones by detected brand  |
| POST   | `/filter-criteria`           | Submit filter preferences              |
| GET    | `/filter-criteria/result`    | Return top 5 phones by MCDA            |

---

## Contributors

**Computer Engineering**
- Mehmetcan Ece
- Ecir Aykan Bican  
- Berk Erdoğan  

**Industrial Engineering**
- Aslı Konuk  
- Ayşegül Özer  
- Taha Türkmen

---

## License

This project is developed for academic purposes and is not intended for commercial use.

---

## Contact

For questions, suggestions, or contributions, please open an issue or contact the project team.
