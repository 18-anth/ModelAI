import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Card, CardContent, CardMedia, Typography, Button, Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[5],
}));

const categories = ['healthy', 'early blight', 'late blight'];

const PlantDiseasePredictor = () => {
    const [model, setModel] = useState(null);
    const [image, setImage] = useState(null);
    const [rawPrediction, setRawPrediction] = useState(null);
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        const loadModel = async () => {
            try {
                console.log('Loading model...');
                const model = await tf.loadLayersModel('https://18-anth.github.io/ModelAI/tfjs_model/model.json');
                setModel(model);
                console.log('Model loaded successfully');
            } catch (error) {
                console.error('Error loading the model:', error);
            }
        };

        loadModel();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result);
                console.log('Image loaded successfully');
            };

            reader.readAsDataURL(file);
        } else {
            console.log('No file selected');
        }
    };

    const handlePredict = async () => {
        if (!model) {
            console.log('Model not loaded');
            return;
        }

        if (!image) {
            console.log('Image not loaded');
            return;
        }

        const imgElement = document.createElement('img');
        imgElement.src = image;

        imgElement.onload = async () => {
            try {
                // Ajustar el tamaño de la imagen a 256x256
                const tensor = tf.browser.fromPixels(imgElement)
                    .resizeNearestNeighbor([256, 256])  // Ajustar tamaño
                    .toFloat()
                    .expandDims()
                    .div(tf.scalar(255)); // Normalización

                console.log('Image tensor:', tensor);

                const prediction = await model.predict(tensor).data();
                console.log('Raw prediction:', prediction);

                const maxIndex = prediction.indexOf(Math.max(...prediction));
                console.log('Max index:', maxIndex);

                setRawPrediction(Array.from(prediction)); // Asignar predicción en bruto al estado
                setPrediction(categories[maxIndex]); // Asignar categoría basada en el índice
            } catch (error) {
                console.error('Error making prediction:', error);
            }
        };
    };

    return (
        <Container style={{ marginTop: '10px' }}>
            <StyledCard>
                <CardContent>
                    <Typography variant="h6" component="div" color='#8D8D8D'>
                        Selecciona una imagen para el analisis
                    </Typography>

                    <hr style={{ width: 200, border: '1px solid #8D8D8D' }} />
                    <br />
                    <Box sx={{
                        alignContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <input
                            accept="image/*"
                            id="upload-image"
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="upload-image">
                            <Button
                                variant="contained"
                                component="span"
                                color="primary"
                                sx={{ mt: 2 }}>
                                Upload Image
                            </Button>
                        </label>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handlePredict}
                            sx={{ mt: 2 }}>
                            Predict
                        </Button>
                    </Box>
                    {image && (
                        <CardMedia
                            component="img"
                            src={image}
                            alt="Uploaded"
                            sx={{ mt: 2, maxHeight: 300 }}
                        />
                    )}
                    {rawPrediction && (
                        <TableContainer component={Paper} sx={{ mt: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {categories.map((category) => (
                                            <TableCell key={category}>{category}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        {rawPrediction.map((value, index) => (
                                            <TableCell key={index}>{value.toFixed(4)}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {prediction && (
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            sx={{ mt: 2 }}>
                            Prediction: {prediction}
                        </Typography>
                    )}
                </CardContent>
            </StyledCard>
        </Container>
    );
};

export default PlantDiseasePredictor;
