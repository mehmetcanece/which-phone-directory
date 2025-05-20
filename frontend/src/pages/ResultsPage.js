import React from "react";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import SellTwoToneIcon from "@mui/icons-material/SellTwoTone";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const phones = location.state || [];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        Top 5 Recommended Phones
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {phones.length === 0 ? (
        <Typography variant="body1" align="center">
          No phone data found. Please go back and apply filters again.
        </Typography>
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
                        Price: {phone.price}₺
                        <SellTwoToneIcon />
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
                        This phone is ranked #{phone.ranking} in our list.
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
  );
};

export default ResultsPage;
