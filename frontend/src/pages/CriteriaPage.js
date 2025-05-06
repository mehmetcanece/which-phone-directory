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
  FormControlLabel,
  Checkbox,
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

  const[useMaxPrice, setUseMaxPrice] = React.useState(false);
  const[useMinRating, setUseMinRating] = React.useState(false);
  const[useMinCpu, setUseMinCpu] = React.useState(false);
  const[useMinBattery,setUseMinBattery] = React.useState(false);
  const[useRam,setUseRam] = React.useState(false);
  const[useInternalMemory,setUseInternalMemory] = React.useState(false);
  const[useScreenSize,setUseScreenSize] = React.useState(false);
  const[useMaxWeight,setUseMaxWeight] = React.useState(false);
  const[useCameraQuality,setUseCameraQuality] = React.useState(false);

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
      battery_capacity: [minBattery, 6000],
      ram_capacity: ram ? [ram, ram] : null,
      internal_memory: internalMemory ? [internalMemory, internalMemory] : null,
      screen_size: [screenSize, 7.5],
      cpu_benchmark: [minCpu, 11000],
      avg_rating: [minRating, 10],
      camera_quality: cameraQuality ? [cameraQuality, 108] : null,
      weight: maxWeight ? [0, maxWeight] : null,
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
      <Typography variant="h4" gutterBottom textAlign="center">
        Enter Your Preferred Phone Criteria
      </Typography>

      {/* Performance */}
      <Typography variant="h5" sx={{ mt: 3 }}>
        Performance
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <FormControlLabel
            control={<Checkbox checked={useMaxPrice} onChange={(e) => setUseMaxPrice(e.target.checked)} sx={{'&.Mui-checked':{color:"#0a192f"},}} />}
             />
          <Typography gutterBottom>Maximum Price (₺)</Typography>
          <Slider
            value={maxPrice}
            onChange={(e, val) => setMaxPrice(val)}
            min={filterOptions?.price_range?.min || 1000}
            max={filterOptions?.price_range?.max || 100000}
            step={1000}
            valueLabelDisplay="auto"
            sx={{color:"#0a192f"}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControlLabel
            control={<Checkbox checked={useMinRating} onChange={(e) => setUseMinRating(e.target.checked)} sx={{'&.Mui-checked':{color:"#0a192f"},}} />}
            />
            
          <Typography gutterBottom>Minimum Average Rating</Typography>
          <Slider
            value={minRating}
            onChange={(e, val) => setMinRating(val)}
            min={filterOptions?.avg_rating_range?.min || 1}
            max={filterOptions?.avg_rating_range?.max || 10}
            step={0.1}
            valueLabelDisplay="auto"
            sx={{color:"#0a192f"}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControlLabel
            control={<Checkbox checked={useMinCpu} onChange={(e) => setUseMinCpu(e.target.checked)} sx={{'&.Mui-checked':{color:"#0a192f"},}} />}
            />
          <Typography gutterBottom>Minimum CPU Benchmark</Typography>
          <Slider
            value={minCpu}
            onChange={(e, val) => setMinCpu(val)}
            min={filterOptions?.cpu_benchmark_range?.min || 1000}
            max={filterOptions?.cpu_benchmark_range?.max || 11000}
            step={500}
            valueLabelDisplay="auto"
            sx={{color:"#0a192f"}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControlLabel
            control={<Checkbox checked={useMinBattery} onChange={(e) => setUseMinBattery(e.target.checked)} sx={{'&.Mui-checked':{color:"#0a192f"},}} />}
            />
          <Typography gutterBottom>Minimum Battery Capacity (mAh)</Typography>
          <Slider
            value={minBattery}
            onChange={(e, val) => setMinBattery(val)}
            min={filterOptions?.battery_range?.min || 2000}
            max={filterOptions?.battery_range?.max || 6000}
            step={100}
            valueLabelDisplay="auto"
            sx={{color:"#0a192f"}}
          />
        </Grid>
        </Grid>

      {/* Storage */}
      <Typography variant="h5" sx={{ mt: 4 }}>
        Storage
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <FormControlLabel
            control={<Checkbox checked={useRam} onChange={(e) => setUseRam(e.target.checked)} sx={{'&.Mui-checked':{color:"#0a192f"},}} />}
            />
          <FormControl fullWidth sx={{ minWidth:200, mb: 2 }}>
            <InputLabel id="ram-select-label">RAM (GB)</InputLabel>
            <Select
              labelId="ram-select-label"
              value={ram}
              label="RAM (GB)"
              onChange={(e) => setRam(Number(e.target.value))}
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
            <FormControlLabel
            control={<Checkbox checked={useInternalMemory} onChange={(e) => setUseInternalMemory(e.target.checked)} sx={{'&.Mui-checked':{color:"#0a192f"},}} />}
            />
          <FormControl fullWidth sx={{minWidth:200}}>
            <InputLabel id="memory-select-label">
              Internal Memory (GB)
            </InputLabel>
            <Select
              labelId="memory-select-label"
              value={internalMemory}
              label="Internal Memory (GB)"
              onChange={(e) => setInternalMemory(Number(e.target.value))}
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
      <Typography variant="h5" sx={{ mt: 4 }}>
        Display
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <FormControlLabel
            control={<Checkbox checked={useScreenSize} onChange={(e) => setUseScreenSize(e.target.checked)} sx={{'&.Mui-checked':{color:"#0a192f"},}} />}
            />
          <Typography gutterBottom>Minimum Screen Size (inches)</Typography>
          <Slider
            value={screenSize}
            onChange={(e, val) => setScreenSize(val)}
            min={filterOptions?.screen_size_range?.min || 5.0}
            max={filterOptions?.screen_size_range?.max || 7.5}
            step={0.1}
            valueLabelDisplay="auto"
            sx={{color:"#0a192f"}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControlLabel
            control={<Checkbox checked={useMaxWeight} onChange={(e) => setUseMaxWeight(e.target.checked)} sx={{'&.Mui-checked':{color:"#0a192f"},}}/>}
            />
          <Typography gutterBottom>Max Weight (gr)</Typography>
          <Slider
            value={maxWeight}
            onChange={(e, val) => setMaxWeight(val)}
            min={filterOptions?.weight_range?.min || 150}
            max={filterOptions?.weight_range?.max || 300}
            step={1}
            valueLabelDisplay="auto"
            sx={{color:"#0a192f"}}
          />
        </Grid>
      </Grid>

      {/* Camera */}
      <Typography variant="h5" sx={{ mt: 4 }}>
        Camera
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <FormControlLabel
            control={<Checkbox checked={useCameraQuality} onChange={(e) => setUseCameraQuality(e.target.checked)} sx={{'&.Mui-checked':{color:"#0a192f"},}} />}
            />
          <FormControl fullWidth sx={{ minWidth:300, mb: 4 }}>
            <InputLabel id="camera-select-label">
              Camera Quality (MP)
            </InputLabel>
            <Select
              labelId="camera-select-label"
              value={cameraQuality}
              label="Camera Quality (MP)"
              onChange={(e) => setCameraQuality(Number(e.target.value))}
            >
              {filterOptions?.camera_quality_options?.map((mp) => (
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
          sx={{backgroundColor:"#0a192f"}}
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
