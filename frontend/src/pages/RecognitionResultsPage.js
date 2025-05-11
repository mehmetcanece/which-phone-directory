import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Skeleton,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import SellTwoToneIcon from "@mui/icons-material/SellTwoTone";

const RecognitionResultsPage = () => {
  const location = useLocation();
  const { image: uploadedImage, brand, phones } = location.state || {};

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (brand && phones?.length > 0) {
      setLoading(false);
    }
  }, [brand, phones]);

  return (
    <Box sx={{ display: "flex", padding: 4 }}>
      <Box sx={{ width: "30%", pr: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Recognized Brand
        </Typography>
        {loading ? (
          <Skeleton variant="text" width="80%" height={40} />
        ) : (
          <Typography variant="h6" sx={{ color: "#0a192f" }}>
            {brand}
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
        <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
          Top 5 Phones from {brand || "..."}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {loading ? (
          Array.from(new Array(3)).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={100}
              sx={{ mb: 2 }}
            />
          ))
        ) : (
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
