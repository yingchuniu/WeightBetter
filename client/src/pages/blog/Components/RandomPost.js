import React from "react";
import {
    Paper,
    Typography,
    Grid,
    CardMedia,
    CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

function RandomPost(props) {
    const { image, title, description, id } = props.post;

    return (
        <Grid container spacing={2} sx={{ display: "flex", flex: 1 }}>
            <Grid item xs={12} sm={7} sx={{ flex: 1 }}>
                <CardActionArea
                    component="a"
                    href={`/blog/BlogPost/${id}`}
                    sx={{
                        display: "flex",
                        width: "700px",
                        height: "400px",
                        borderRadius: "8px",
                        "&:hover": {
                            opacity: 0.8,
                        },
                    }}
                >
                    <CardMedia
                        component="img"
                        src={image}
                        sx={{
                            display: "block",
                            width: "700px",
                            height: "400px",
                            borderRadius: "8px",
                        }}
                    />
                </CardActionArea>
            </Grid>
            <Grid item xs={12} sm={5} sx={{ flex: 1 }}>
                <Paper
                    elevation={3}
                    style={{
                        padding: "16px",
                        height: "300px",
                        width: "400px",
                        position: "relative",
                        left: "-50px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 1,
                        borderRadius: "8px",
                    }}
                >
                    <Typography
                        variant="h5"
                        component={Link}
                        to={`/blog/BlogPost/${id}`}
                        gutterBottom
                        paragraph
                        sx={{ lineHeight: "1.5" }}
                    >
                        {title}
                    </Typography>
                    <br/>
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        component={Link}
                        to={`/blog/BlogPost/${id}`}
                        gutterBottom
                        paragraph
                        sx={{ lineHeight: "1.5" }}
                    >
                        {description}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default RandomPost;
