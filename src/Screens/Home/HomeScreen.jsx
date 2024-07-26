import React, { useState } from "react";
import { Box, Card, CardActionArea, CardMedia, Button } from "@mui/material";
//import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import RenderImage from "../../Components/Render/RenderImage";

const HomeScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
                <Typography variant="h6" component="div" color='#8D8D8D'>
                    Selecciona una imagen para el analisis
                </Typography>

                <hr style={{ width: 200, border: '1px solid #8D8D8D' }} />
                <br />
                <Card
                    raised
                    sx={{
                        maxWidth: 345,
                        padding: 2,
                        boxShadow: 3,
                        backgroundColor: "#CFCFCF",
                        borderRadius: 4,
                    }}
                >
                    <CardActionArea>
                        {selectedImage ? (
                            <CardMedia
                                component="img"
                                image={selectedImage}
                                alt="Uploaded Image"
                                sx={{
                                    maxHeight: 300,
                                    borderRadius: 4
                                }}
                            />
                        ) : (
                            <Button
                                variant="contained"
                                component="label"
                                sx={{
                                    marginTop: 2,
                                    marginBottom: 2,
                                    backgroundColor: "#050A30",
                                    color: "#fff",
                                    '&:hover': {
                                        backgroundColor: "#050A30",
                                        opacity: 0.8,
                                    },
                                }}
                            >
                                Cargar Imagen
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleImageUpload}
                                />
                            </Button>
                        )}
                    </CardActionArea>
                </Card>
                <RenderImage />
            </Box>
        </>
    );
}

export default HomeScreen;