import React from "react";
import {
  Box,
  Typography,
  Container,
  Divider,
  Link,
  Avatar,
} from "@mui/material";

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="90vh"
        textAlign="center"
        pt={8}
        pb={8}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#000000" }}
        >
          Which Phone Should I Buy?
        </Typography>
        <Divider sx={{ width: "100%", my: 4, bgcolor: "#999" }} />
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#000000" }}
        >
          About the Project
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.1rem", mb: 4, color: "#000000" }}
        >
          This project was developed by senior students from Industrial
          Engineering and Computer Engineering departments. It helps users
          select the most suitable smartphone by combining multi-criteria
          decision-making with visual brand recognition.
        </Typography>
        <Divider sx={{ width: "100%", my: 4, bgcolor: "#999" }} />
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#000000" }}
        >
          How It Works
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.1rem", mb: 2, color: "#000000" }}
        >
          Use the <strong>Criteria</strong> page to filter your preferences
          (e.g., screen size, price) and see the top 5 phones in our dataset.
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.1rem", mb: 4, color: "#000000" }}
        >
          Or visit the <strong>Recognition</strong> page, upload a back photo of
          a phone, and get the top 5 recommended phones from the detected brand.
        </Typography>
        <Divider sx={{ width: "100%", my: 4, bgcolor: "#999" }} />
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#000000" }}
        >
          Technologies Used
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.1rem", color: "#000000", mb: 2 }}
        >
          React, JavaScript, Python, FastAPI, Material UI
        </Typography>
        <Link
          href="https://github.com/mehmetcanece/which-phone-directory"
          target="_blank"
          rel="noopener"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#000000",
            mb: 4,
          }}
        >
          <Avatar
            src="images/github.png"
            alt="GitHub"
            sx={{ width: 24, height: 24 }}
          />
          View the project on GitHub
        </Link>
        <Divider sx={{ width: "100%", my: 4, bgcolor: "#999" }} />
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#000000" }}
        >
          Team Members
        </Typography>
        <Box sx={{ color: "#000000", fontSize: "1.1rem" }}>
          <Typography>
            Ecir Aykan Bican (2003787), Computer Engineering
          </Typography>
          <Typography>Mehmetcan Ece (2003271), Computer Engineering</Typography>
          <Typography>Berk Erdoğan (2003200), Computer Engineering</Typography>
          <Typography>Aslı Konuk (2002429), Industrial Engineering</Typography>
          <Typography>
            Ayşegül Özer (2002051), Industrial Engineering
          </Typography>
          <Typography>
            Taha Türkmen (2018899), Industrial Engineering
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", my: 4, bgcolor: "#999" }} />,
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#000000" }}
        >
          Advisors
        </Typography>
        <Box sx={{ color: "#000000", fontSize: "1.1rem" }}>
          <Typography>
            Assist. Prof. Erkut Arıcan - Computer Engineering
          </Typography>
          <Typography>
            Assoc. Prof. Elif Haktanır Aktaş - Industrial Engineering
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
