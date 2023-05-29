import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Box,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useParams, useNavigate } from "react-router-dom";

function SearchResult() {
    const theme = useTheme();
    const [searchResults, setSearchResults] = useState([]);
    const { searchTerm } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/blogs?search=${searchTerm}`
                );
                const data = await response.json();
                console.log("Search results from API:", data);
                setSearchResults(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchResults();
    }, [searchTerm]);

    return (
        <Container maxWidth="lg">
            <div style={{ display: "flex", alignItems: "center" }} sx={{my:5}}>
            <Typography
                    variant="h2"
                    style={{ margin: theme.spacing(2, 0) }}
                    sx={{color: theme.palette.teal.main,}}
                >
                    {searchTerm}
                </Typography>
                <Typography
                    variant="h2"
                    style={{ margin: theme.spacing(2, 0) }}
                >
                    相關文章搜尋結果：
                </Typography>
                
            </div>

            <Grid container spacing={1}>
                {searchResults.map((result) => (
                    <Grid item key={result.id} xs={12}>
                        <Card
                            sx={{
                                transition: "transform 0.2s ease-in-out",
                                "&:hover": { transform: "scale(1.03)" },
                            }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        flex: "1 1 0",
                                        padding: "16px",
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontFamily:
                                                theme.typography.h3.fontFamily,
                                            fontSize:
                                                theme.typography.h3.fontSize,
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            navigate(
                                                `/blog/BlogPost/${result.id}`
                                            )
                                        }
                                    >
                                        {result.title}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        color="text.secondary"
                                    >
                                        {result.description}
                                    </Typography>
                                </Box>
                                <CardMedia
                                    component="img"
                                    alt={result.imageLabel}
                                    image={result.image}
                                    sx={{
                                        objectFit: "cover",
                                        width: "100%",
                                        maxWidth: "350px",
                                        height: "100%",
                                        maxHeight: "175px",
                                        borderTopRightRadius: "4px",
                                        borderBottomRightRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        navigate(`/blog/BlogPost/${result.id}`)
                                    }
                                />
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default SearchResult;
