import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Tooltip,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function RecognitionPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const steps = ["Upload", "Ready", "View Results"];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setActiveStep(1);

    setTimeout(() => {
      setActiveStep(2);
    }, 2000);
  };

  const handleDelete = () => {
    setImagePreview(null);
    setActiveStep(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSeeResults = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:8000/recognition", {
        method: "POST",
        body: formData,
      });
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
      console.error("Error:", err);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 700, mx: "auto", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        📷 Recognize the Brand of Your Phone
      </Typography>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          mb: 4,
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

      <Tooltip title="Upload a clear image of the phone">
        <IconButton>
          <InfoOutlinedIcon sx={{ color: "#0a192f" }} />
        </IconButton>
      </Tooltip>

      <Button
        variant="contained"
        component="label"
        startIcon={<UploadFileIcon />}
        sx={{ mt: 2, mb: 2, backgroundColor: "#0a192f" }}
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

      {imagePreview && (
        <Box position="relative" display="inline-block">
          <img
            src={imagePreview}
            alt="Phone preview"
            style={{
              width: "40%",
              borderRadius: 10,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              marginBottom: 20,
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0a192f",
              position: "absolute",
              top: "50%",
              right: 16,
              transform: "translateY(-50%)",
            }}
            onClick={handleSeeResults}
          >
            See Results
          </Button>
          <Box mt={2} display="flex" justifyContent="center">
            <Tooltip title="Remove Photo">
              <IconButton
                onClick={handleDelete}
                aria-label="delete"
                sx={{
                  backgroundColor: "#0a192f",
                  color: "white",
                  "&:hover": { backgroundColor: "#0a192f", color: "white" },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default RecognitionPage;
