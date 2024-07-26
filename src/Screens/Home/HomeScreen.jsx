import React from "react";
import { Box, } from "@mui/material";
//import { Link } from "react-router-dom";
//import Typography from '@mui/material/Typography';
import RenderImage from "../../Components/Render/RenderImage";
import PlantDiseasePredictor from "../Model/Model";

const HomeScreen = () => {

    return (
        <>
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                    alignContent: "center",
                    color: "#050A30",
                    background: "transparent",
                }}
            >

                <PlantDiseasePredictor />
                <RenderImage />
            </Box>
        </>
    );
}

export default HomeScreen;
