import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function RecognitionPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const steps = ["Upload", "Ready", "View Results"];

  const handleFile = (file) => {
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setUploadedFile(file);
    setActiveStep(1);

    setTimeout(() => {
      setActiveStep(2);
    }, 2000);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDelete = () => {
    setImagePreview(null);
    setUploadedFile(null);
    setActiveStep(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSeeResults = async () => {
    const file = uploadedFile;
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:8000/recognition", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        navigate("/recognition/result", {
          state: {
            error: errorData.detail || "Prediction failed",
            image: imagePreview,
          },
        });
        return;
      }

      const data = await res.json();
      const predictedBrand = data.predicted_brand;

      const resultRes = await fetch(
        `http://localhost:8000/recognition/result?brand=${predictedBrand}`
      );
      const resultData = await resultRes.json();

      navigate("/recognition/result", {
        state: {
          image: imagePreview,
          brand: predictedBrand,
          phones: resultData.top_5_phones,
        },
      });
    } catch (err) {
      navigate("/recognition/result", {
        state: {
          error:
            "We couldn’t recognize the phone brand from the image you uploaded. This might be due to unclear logo, poor lighting, or image quality issues.",
          image: imagePreview,
        },
      });
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", px: 2, py: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ textAlign: "center", mb: 6 }}
      >
        Recognize the Brand of Your Phone
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            width: "100%",
            maxWidth: 600,
            "& .MuiStepIcon-root": { color: "#0a192f" },
            "& .MuiStepIcon-root.Mui-active": { color: "#0a192f" },
            "& .MuiStepIcon-root.Mui-completed": { color: "#0a192f" },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          sx={{
            border: `2px dashed ${isDragging ? "#0a192f" : "#ccc"}`,
            borderRadius: 4,
            p: 6,
            width: "100%",
            maxWidth: 500,
            textAlign: "center",
            backgroundColor: isDragging ? "#f0f4f8" : "transparent",
            transition: "background-color 0.3s",
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Drag & drop a clear image of your phone’s back
          </Typography>

          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon sx={{ fontSize: 36 }} />}
            sx={{
              px: 8,
              py: 4,
              fontSize: "1.5rem",
              fontWeight: "bold",
              backgroundColor: "#0a192f",
              "&:hover": { backgroundColor: "#132f4c" },
            }}
          >
            Upload Phone Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </Button>
        </Box>

        {activeStep === 1 && (
          <Box textAlign="center">
            <CircularProgress
              size={60}
              thickness={4}
              sx={{ color: "#0a192f", mb: 2 }}
            />
            <Typography variant="body2" color="textSecondary">
              Just a few seconds...
            </Typography>
          </Box>
        )}

        {imagePreview && activeStep === 2 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={3}
          >
            <img
              src={imagePreview}
              alt="Phone preview"
              style={{
                width: "50%",
                maxWidth: 300,
                borderRadius: 12,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            />

            <Button
              variant="contained"
              onClick={handleSeeResults}
              sx={{
                backgroundColor: "#0a192f",
                px: 5,
                py: 2,
                fontSize: "1.1rem",
                "&:hover": { backgroundColor: "#132f4c" },
              }}
            >
              See Results
            </Button>

            <Tooltip title="Remove Photo">
              <IconButton
                onClick={handleDelete}
                sx={{
                  backgroundColor: "#0a192f",
                  color: "white",
                  "&:hover": { backgroundColor: "#132f4c" },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Divider sx={{ width: "100%", my: 4, bgcolor: "#999" }} />

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Box
            component="img"
            src="images/bau.png"
            alt="Bahçeşehir University"
            sx={{
              width: 120,
              height: "auto",
              mb: 1,
            }}
          />
          <Typography variant="body2" color="text.secondary">
            Bahçeşehir University - 2025
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default RecognitionPage;
