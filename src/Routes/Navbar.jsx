
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const Navbar = () => {
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
            <Toolbar>
                <Typography variant="h6" component="div">
                AI PapaAnalyzer
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;