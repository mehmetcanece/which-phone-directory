import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import HomePage from "./pages/HomePage";
import CriteriaPage from "./pages/CriteriaPage";
import RecognitionPage from "./pages/RecognitionPage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <Router>
      <AppBar position="static" sx={{ backgroundColor: "#0a192f" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          {[
            { to: "/", label: "Home" },
            { to: "/filter-criteria", label: "Criteria-Based Selection" },
            { to: "/recognition", label: "Brand Recognition" },
          ].map(({ to, label }) => (
            <Button
              key={to}
              color="inherit"
              component={Link}
              to={to}
              sx={{
                mx: 2,
                fontWeight: "bold",
                position: "relative",
                fontSize: "1rem",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "0%",
                  height: "2px",
                  bottom: 0,
                  left: 0,
                  backgroundColor: "white",
                  transition: "width 0.3s",
                },
                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/filter-criteria" element={<CriteriaPage />} />
          <Route path="/recognition" element={<RecognitionPage />} />
          <Route path="/filter-criteria/result" element={<ResultsPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
