import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';

import CriteriaPage from './pages/CriteriaPage';
import RecognitionPage from './pages/RecognitionPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Router>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to="/">Criteria</Button>
          <Button color='inherit' component={Link} to="/recognition">Recognition</Button>
          
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<CriteriaPage />} />
          <Route path="/recognition" element={<RecognitionPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
