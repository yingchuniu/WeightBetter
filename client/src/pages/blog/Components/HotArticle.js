import * as React from "react";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/system";

export default function HotArticle({ post }) {
    const { id, title, description, image } = post;

    return (
        <Card
            sx={{
                maxWidth: "100%",
                height: "153px",
                display: "flex",
                flexDirection: "row",
                alignItems: "left",
                marginBottom: "8px",
            }}
        >
            <CardActionArea
                component={RouterLink}
                to={`/blog/BlogPost/${id}`}
                sx={{ display: "flex", flexDirection: "row", alignItems: "left", width: "100%" }}
            >
                <CardMedia
                    component="img"
                    sx={{
                        width: "50%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                    image={image}
                    alt={title}
                />
                <CardContent
                sx={{
                        width: "50%",
                        objectFit: "cover",
                    }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography gutterBottom variant="h4" component="div">
                        {title}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        {description}
                    </Typography>
                  </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
