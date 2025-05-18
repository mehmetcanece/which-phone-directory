import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Divider,
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

  const [useMaxPrice, setUseMaxPrice] = useState(false);
  const [useMinRating, setUseMinRating] = useState(false);
  const [useMinCpu, setUseMinCpu] = useState(false);
  const [useMinBattery, setUseMinBattery] = useState(false);
  const [useRam, setUseRam] = useState(false);
  const [useInternalMemory, setUseInternalMemory] = useState(false);
  const [useScreenSize, setUseScreenSize] = useState(false);
  const [useMaxWeight, setUseMaxWeight] = useState(false);
  const [useCameraQuality, setUseCameraQuality] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/filter-criteria")
      .then((res) => res.json())
      .then((data) => {
        setFilterOptions(data);
      })
      .catch((err) => {
        console.error("Failed to fetch filter options:", err);
      });
  }, []);

  const handleSubmit = async () => {
    const criteria = {
      brand_name: null,
      price: useMaxPrice ? [0, maxPrice] : null,
      battery_capacity: useMinBattery ? [minBattery, 6000] : null,
      ram_capacity: useRam ? [ram, ram] : null,
      internal_memory: useInternalMemory
        ? [internalMemory, internalMemory]
        : null,
      screen_size: useScreenSize
        ? [screenSize, filterOptions?.screen_size_range?.max || 8.0]
        : null,
      cpu_benchmark: useMinCpu
        ? [minCpu, filterOptions?.cpu_benchmark_range?.max || 12000]
        : null,
      avg_rating: useMinRating ? [minRating, 10] : null,
      camera_quality: useCameraQuality ? [cameraQuality, 200] : null,
      weight: useMaxWeight ? [0, maxWeight] : null,
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
      navigate("/filter-criteria/result", { state: data.top_5_phones });
    } catch (error) {
      console.error("API Error:", error);
      alert("An error occurred while connecting to the server.");
    }
  };

  const disableWrap = (enabled, children) => (
    <Box
      sx={{
        opacity: enabled ? 1 : 0.5,
        pointerEvents: enabled ? "auto" : "none",
      }}
    >
      {children}
    </Box>
  );

  const checkboxStyle = { "&.Mui-checked": { color: "#0a192f" } };
  const sliderStyle = { color: "#0a192f" };
  const buttonStyle = {
    backgroundColor: "#0a192f",
    "&:hover": { backgroundColor: "#06101e" },
  };

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        fontWeight="bold"
        color="#0a192f"
      >
        Set Your Phone Preferences
      </Typography>

      <Typography variant="h5" sx={{ mt: 4 }} fontWeight="medium">
        Performance Filters
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={useMaxPrice}
                onChange={(e) => setUseMaxPrice(e.target.checked)}
                sx={checkboxStyle}
              />
            }
            label="Filter by Maximum Price"
          />
          {disableWrap(
            useMaxPrice,
            <>
              <Typography gutterBottom>Maximum Price (₺)</Typography>
              <Slider
                value={maxPrice}
                onChange={(e, val) => setMaxPrice(val)}
                min={filterOptions?.price_range?.min || 1000}
                max={filterOptions?.price_range?.max || 100000}
                step={1000}
                valueLabelDisplay="auto"
                sx={sliderStyle}
              />
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={useMinRating}
                onChange={(e) => setUseMinRating(e.target.checked)}
                sx={checkboxStyle}
              />
            }
            label="Filter by Minimum Rating"
          />
          {disableWrap(
            useMinRating,
            <>
              <Typography gutterBottom>Minimum Average Rating</Typography>
              <Slider
                value={minRating}
                onChange={(e, val) => setMinRating(val)}
                min={filterOptions?.avg_rating_range?.min || 1}
                max={filterOptions?.avg_rating_range?.max || 10}
                step={0.1}
                valueLabelDisplay="auto"
                sx={sliderStyle}
              />
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={useMinCpu}
                onChange={(e) => setUseMinCpu(e.target.checked)}
                sx={checkboxStyle}
              />
            }
            label="Filter by Minimum CPU Benchmark"
          />
          {disableWrap(
            useMinCpu,
            <>
              <Typography gutterBottom>Minimum CPU Benchmark</Typography>
              <Slider
                value={minCpu}
                onChange={(e, val) => setMinCpu(val)}
                min={filterOptions?.cpu_benchmark_range?.min || 1000}
                max={filterOptions?.cpu_benchmark_range?.max || 11000}
                step={500}
                valueLabelDisplay="auto"
                sx={sliderStyle}
              />
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={useMinBattery}
                onChange={(e) => setUseMinBattery(e.target.checked)}
                sx={checkboxStyle}
              />
            }
            label="Filter by Minimum Battery Capacity"
          />
          {disableWrap(
            useMinBattery,
            <>
              <Typography gutterBottom>
                Minimum Battery Capacity (mAh)
              </Typography>
              <Slider
                value={minBattery}
                onChange={(e, val) => setMinBattery(val)}
                min={filterOptions?.battery_range?.min || 2000}
                max={filterOptions?.battery_range?.max || 6000}
                step={100}
                valueLabelDisplay="auto"
                sx={sliderStyle}
              />
            </>
          )}
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mt: 4 }} fontWeight="medium">
        Storage & Display
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={useRam}
                onChange={(e) => setUseRam(e.target.checked)}
                sx={checkboxStyle}
              />
            }
            label="Filter by RAM"
          />
          {disableWrap(
            useRam,
            <FormControl fullWidth>
              <InputLabel id="ram-label">RAM (GB)</InputLabel>
              <Select
                labelId="ram-label"
                value={ram}
                label="RAM"
                onChange={(e) => setRam(Number(e.target.value))}
              >
                {filterOptions?.ram_options?.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt} GB
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={useInternalMemory}
                onChange={(e) => setUseInternalMemory(e.target.checked)}
                sx={checkboxStyle}
              />
            }
            label="Filter by Internal Storage"
          />
          {disableWrap(
            useInternalMemory,
            <FormControl fullWidth>
              <InputLabel id="storage-label">Storage (GB)</InputLabel>
              <Select
                labelId="storage-label"
                value={internalMemory}
                label="Storage"
                onChange={(e) => setInternalMemory(Number(e.target.value))}
              >
                {filterOptions?.internal_memory_options?.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt} GB
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={useScreenSize}
                onChange={(e) => setUseScreenSize(e.target.checked)}
                sx={checkboxStyle}
              />
            }
            label="Filter by Minimum Screen Size"
          />
          {disableWrap(
            useScreenSize,
            <>
              <Typography gutterBottom>Minimum Screen Size (inches)</Typography>
              <Slider
                value={screenSize}
                onChange={(e, val) => setScreenSize(val)}
                min={filterOptions?.screen_size_range?.min || 5.0}
                max={filterOptions?.screen_size_range?.max || 7.5}
                step={0.1}
                valueLabelDisplay="auto"
                sx={sliderStyle}
              />
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={useMaxWeight}
                onChange={(e) => setUseMaxWeight(e.target.checked)}
                sx={checkboxStyle}
              />
            }
            label="Filter by Maximum Weight"
          />
          {disableWrap(
            useMaxWeight,
            <>
              <Typography gutterBottom>Maximum Weight (g)</Typography>
              <Slider
                value={maxWeight}
                onChange={(e, val) => setMaxWeight(val)}
                min={filterOptions?.weight_range?.min || 100}
                max={filterOptions?.weight_range?.max || 300}
                step={1}
                valueLabelDisplay="auto"
                sx={sliderStyle}
              />
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={useCameraQuality}
                onChange={(e) => setUseCameraQuality(e.target.checked)}
                sx={checkboxStyle}
              />
            }
            label="Filter by Camera Quality"
          />
          {disableWrap(
            useCameraQuality,
            <FormControl fullWidth>
              <InputLabel id="camera-label">Camera (MP)</InputLabel>
              <Select
                labelId="camera-label"
                value={cameraQuality}
                label="Camera Quality"
                onChange={(e) => setCameraQuality(Number(e.target.value))}
              >
                {filterOptions?.camera_quality_options?.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt} MP
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
      </Grid>

      <Box mt={5}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleSubmit}
          sx={buttonStyle}
        >
          Show Recommended Phones
        </Button>
      </Box>
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
  );
}

export default CriteriaPage;
