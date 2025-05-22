import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  Paper,
  Skeleton,
  Button,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import SellTwoToneIcon from "@mui/icons-material/SellTwoTone";

const RecognitionResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { image: uploadedImage, brand, phones, error } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingScreen(false);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (error || !brand || !phones?.length) {
      setLoading(false);
      return;
    }
    setLoading(false);
  }, [brand, phones, error]);

  const handleTryAgain = () => {
    navigate("/recognition");
  };

  const formattedBrand =
    brand?.charAt(0).toUpperCase() + brand?.slice(1).toLowerCase();

  if (loadingScreen) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          We are recognizing your brand...
        </Typography>
        <CircularProgress size={64} thickness={5} sx={{ color: "#0a192f" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", padding: 4 }}>
      <Box sx={{ width: "30%", pr: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Detected Brand
        </Typography>

        {loading ? (
          <Skeleton variant="text" width="80%" height={40} />
        ) : error ? (
          <Typography color="error" variant="h6">
            Brand Not Detected
          </Typography>
        ) : (
          <Typography variant="h6" sx={{ color: "#0a192f" }}>
            {formattedBrand}
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        {uploadedImage && (
          <Box
            component="img"
            src={uploadedImage}
            alt="Uploaded Phone"
            sx={{ width: "100%", borderRadius: 2, boxShadow: 2 }}
          />
        )}
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" align="center">
          Top 5 Recommended Phones by
          {" " + formattedBrand || " Unknown"}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {error && (
          <Box
            sx={{
              backgroundColor: "#ffebee",
              color: "#c62828",
              borderRadius: 2,
              p: 2,
              mb: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Recognition Failed
            </Typography>
            <Typography variant="body1">{error}</Typography>

            <Button
              variant="outlined"
              onClick={handleTryAgain}
              sx={{ mt: 2, borderColor: "#c62828", color: "#c62828" }}
            >
              Upload Another Image
            </Button>
          </Box>
        )}

        {loading && !error && (
          <>
            {Array.from(new Array(3)).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={100}
                sx={{ mb: 2 }}
              />
            ))}
          </>
        )}

        {!loading && !error && phones?.length > 0 && (
          <List>
            {phones.map((phone, index) => (
              <Paper key={index} sx={{ mb: 2, p: 2 }} elevation={3}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography variant="h6" fontWeight="bold">
                        {phone.model}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="subtitle1" color="text.secondary">
                          Price: {phone.price}₺ <SellTwoToneIcon />
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          User Rating: {phone.avg_rating} / 10{" "}
                          <ThumbUpOffAltRoundedIcon />
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          fontStyle="italic"
                        >
                          This phone is ranked #{phone.ranking} in our list.{" "}
                          <MilitaryTechRoundedIcon />
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default RecognitionResultsPage;
