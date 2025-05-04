import React from 'react';
import {
     Box, 
     Typography,
     TextField,
     Grid,
     Button,
     Slider,
     FormControl,
     InputLabel,
     Select,
     MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CriteriaPage(){
    const[ram, setRam] = React.useState('');
    const[internal_memory, setInternalMemory] = React.useState('');
    const[screen_quality,setScreenQuality] = React.useState('');
    const[camera_quality,setCameraQuality] = React.useState('');
    const[maxPrice,setMaxPrice] = React.useState(10000);
    const[minRating,setMinRating] = React.useState(7);
    const[minCpu,setMinCpu] = React.useState(3000);
    const[minBattery,setMinBattery] = React.useState(3000);


    const navigate = useNavigate();


const handleRamChange= (event) => {
    setRam(event.target.value);
};
const handleInternalMemoryChange= (event) => {
    setInternalMemory(event.target.value);
};
const handleScreenQualityChange= (event) => {
    setScreenQuality(event.target.value);
}; 
const handleCameraQualityChange= (event) => {
    setCameraQuality(event.target.value);
};    

const handleSubmit = () => {
    const criteria = {
        ram,
        internal_memory,
        screen_quality,
        camera_quality,
        max_price : maxPrice,
        min_rating : minRating,
        min_cpu : minCpu,
        min_battery : minBattery,

    };
    navigate('/results', {state: criteria});
};
    
    
  

    return(
        <Box p={3}>
            <Typography variant='h4' gutterBottom>
                Enter Your Preferred Phone Criteria
            </Typography>

            {/*Performance Section */}
            <Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
                Performance
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>Maximum Price (₺)</Typography>
                    <Slider value={maxPrice} onChange={(e,newValue) => setMaxPrice(newValue)} min={1000} max={100000} step={1000} valueLabelDisplay="auto"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>Minimum Average Rating</Typography>
                    <Slider value={minRating} onChange={(e,newValue) => setMinRating(newValue)} min={1} max={10} step={0.1} valueLabelDisplay="auto"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>Minimum CPU Benchmark</Typography>
                    <Slider value={minCpu} onChange={(e,newValue) => setMinCpu(newValue)} min={1000} max={11000} step={1000} valueLabelDisplay="auto"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>Minimum Battery Capacity (mAh)</Typography>
                    <Slider value={minBattery} onChange={(e,newValue) => setMinBattery(newValue)} min={2000} max={6000} step={100} valueLabelDisplay="auto"/>
                </Grid>
            </Grid>

            {/*Storage Section*/}
            <Typography variant='h6' gutterBottom sx={{ mt: 4}}>
                Storage
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{ minWidth: 200, marginBottom: 2 }}>
                        <InputLabel id="ram-capacity-select-label">RAM Capacity (GB)</InputLabel>
                        <Select
                         labelId='ram-capacity-select-label'
                         id='ram-capacity-select-label'
                         value={ram}
                         label="RAM Capacity (GB)"
                         onChange={handleRamChange}
                         >
                            <MenuItem value={4}>4 GB</MenuItem>
                            <MenuItem value={6}>6 GB</MenuItem>
                            <MenuItem value={8}>8 GB</MenuItem>
                            <MenuItem value={12}>12 GB</MenuItem>
                        </Select>
                    </FormControl>

            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{minWidth:200}}>
                    <InputLabel id="internal-memory-select-label">Internal Memory (GB)</InputLabel>
                    <Select
                    labelId='internal-memory-select-label'
                    id='internal-memory-select-label'
                    value={internal_memory}
                    label="Internal Memory (GB)"
                    onChange={handleInternalMemoryChange}>
                        <MenuItem value={64}>64 GB</MenuItem>
                        <MenuItem value={128}>128 GB</MenuItem>
                        <MenuItem value={256}>256 GB</MenuItem>
                        <MenuItem value={512}>512 GB</MenuItem>
                        <MenuItem value={1024}>1024 GB</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            </Grid>

            {/* Display Section */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4}}>
                Display
            </Typography>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Typography gutterBottom>Minimum Screen Size (inches)</Typography>
                <Slider defaultValue={6.0} min={5.0} max={7.5} step={0.1} valueLabelDisplay="auto"/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{minWidth:200}}>
                    <InputLabel id="screen-quality-select-label">Screen Quality</InputLabel>
                    <Select
                    labelId='screen-quality-select-label'
                    id='screen-quality-select-label'
                    value={screen_quality}
                    label="Screen Quality"
                    onChange={handleScreenQualityChange}>
                        <MenuItem value={"1080p"}>1080p</MenuItem>
                        <MenuItem value={"4K"}>4K</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            </Grid>

            {/* Camera Section */}
            <Typography variant='h6' gutterBottom sx={{ mt: 4}}>
                Camera
            </Typography>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{minWidth:300, marginBottom:4}}>
                    <InputLabel id="camera-quality-select-label">Minimum Camera Quality (MP)</InputLabel>
                    <Select
                    labelId='camera-quality-select-label'
                    id='camera-quality-select-label'
                    value={camera_quality}
                    label="Minimum Camera Quality (MP)"
                    onChange={handleCameraQualityChange}>
                        <MenuItem value={12}>12 MP</MenuItem>
                        <MenuItem value={48}>48 MP</MenuItem>
                        <MenuItem value={64}>64 MP</MenuItem>
                        <MenuItem value={108}>108 MP</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            </Grid>

            {/* Submit Button */}
            <Box mt={5}>
                <Button variant="contained" color="primary" fullWidth size="large">
                    Show Recommended Phones
                </Button>
            </Box>
            
           
        </Box>
    );
}


export default CriteriaPage;