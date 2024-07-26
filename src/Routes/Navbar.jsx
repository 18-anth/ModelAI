
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
//import { Box } from '@mui/material';


const Navbar = () => {
    // <Box>
    //  <Typography variant="h6" component="div">
    //  <Link to="/PlantDiseasePredictor"
    //   style={{
    //      textDecoration: 'none',
    // color: 'inherit'
    //   }}>
    //    PlantDiseasePredictor
    //  </Link>
    //  </Typography>
    // </Box>
    return (
        <AppBar
            position="fixed"
            sx={{
                background: "#f4f4f4",
                color: "#000",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
            }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    <Link to="/" style={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}>
                        AI PapaAnalyzer
                    </Link>
                </Typography>

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;



