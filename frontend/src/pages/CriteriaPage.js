import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function CriteriaPage() {
  const [ram, setRam] = useState("");
  const [internalMemory, setInternalMemory] = useState("");
  const [screenSize, setScreenSize] = useState(6.0);
  const [cameraQuality, setCameraQuality] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(7);
  const [minCpu, setMinCpu] = useState(3000);
  const [minBattery, setMinBattery] = useState(3000);
  const [maxWeight, setMaxWeight] = useState(170);
  const [filterOptions, setFilterOptions] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/filter-criteria")
      .then((res) => res.json())
      .then((data) => {
        setFilterOptions(data);
        console.log("Filtre opsiyonları:", data);
      })
      .catch((err) => {
        console.error("Filtre verisi alınamadı:", err);
      });
  }, []);

  const handleSubmit = async () => {
    const criteria = {
      brand_name: null,
      price: [0, maxPrice],
      battery_capacity: [minBattery, filterOptions?.battery_range?.[1] || 6000],
      ram_capacity: ram ? [parseInt(ram), parseInt(ram)] : null,
      internal_memory: internalMemory
        ? [parseInt(internalMemory), parseInt(internalMemory)]
        : null,
      screen_size: [screenSize, filterOptions?.screen_size_range?.[1] || 7.5],
      cpu_benchmark: [minCpu, filterOptions?.cpu_benchmark_range?.[1] || 11000],
      avg_rating: [minRating, filterOptions?.avg_rating_range?.[1] || 10],
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/filter-criteria/result",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(criteria),
        }
      );

      const data = await response.json();
      console.log("Gelen telefonlar:", data.top_5_phones);
      navigate("/results", { state: data.top_5_phones });
    } catch (error) {
      console.error("API Hatası:", error);
      alert("Sunucuya bağlanırken hata oluştu.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Enter Your Preferred Phone Criteria
      </Typography>

      {/* Performance */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Performance
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Maximum Price (₺)</Typography>
          <Slider
            value={maxPrice}
            onChange={(e, val) => setMaxPrice(val)}
            min={filterOptions?.price_range?.[0] || 1000}
            max={filterOptions?.price_range?.[1] || 100000}
            step={1000}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Minimum Average Rating</Typography>
          <Slider
            value={minRating}
            onChange={(e, val) => setMinRating(val)}
            min={filterOptions?.avg_rating_range?.[0] || 1}
            max={filterOptions?.avg_rating_range?.[1] || 10}
            step={0.1}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Minimum CPU Benchmark</Typography>
          <Slider
            value={minCpu}
            onChange={(e, val) => setMinCpu(val)}
            min={filterOptions?.cpu_benchmark_range?.[0] || 1000}
            max={filterOptions?.cpu_benchmark_range?.[1] || 11000}
            step={500}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Minimum Battery Capacity (mAh)</Typography>
          <Slider
            value={minBattery}
            onChange={(e, val) => setMinBattery(val)}
            min={filterOptions?.battery_range?.[0] || 2000}
            max={filterOptions?.battery_range?.[1] || 6000}
            step={100}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>

      {/* Storage */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Storage
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>RAM (GB)</InputLabel>
            <Select
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              label="RAM (GB)"
            >
              {filterOptions?.ram_options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option} GB
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Internal Memory (GB)</InputLabel>
            <Select
              value={internalMemory}
              onChange={(e) => setInternalMemory(e.target.value)}
              label="Internal Memory (GB)"
            >
              {filterOptions?.internal_memory_options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option} GB
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Display */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Display
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Minimum Screen Size (inches)</Typography>
          <Slider
            value={screenSize}
            onChange={(e, val) => setScreenSize(val)}
            min={filterOptions?.screen_size_range?.[0] || 5.0}
            max={filterOptions?.screen_size_range?.[1] || 7.5}
            step={0.1}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Max Weight (gr)</Typography>
          <Slider
            value={maxWeight}
            onChange={(e, val) => setMaxWeight(val)}
            min={150}
            max={300}
            step={1}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>

      {/* Camera */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Camera
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel>Camera Quality (MP)</InputLabel>
            <Select
              value={cameraQuality}
              onChange={(e) => setCameraQuality(e.target.value)}
              label="Camera Quality (MP)"
            >
              {[12, 48, 64, 108].map((mp) => (
                <MenuItem key={mp} value={mp}>
                  {mp} MP
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Submit */}
      <Box mt={5}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleSubmit}
        >
          Show Recommended Phones
        </Button>
      </Box>
    </Box>
  );
}

export default CriteriaPage;
