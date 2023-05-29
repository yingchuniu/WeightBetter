import * as React from "react";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";

const truncate = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
};

export default function FocusArticle({ post }) {
    const { id, title, description, image, content } = post;

    return (
        <Card sx={{ maxWidth: "100%" ,borderRadius:"8px"}}>
            <CardActionArea component={RouterLink} to={`/blog/BlogPost/${id}`}>
                <CardMedia
                    component="div"
                    sx={{
                        paddingTop: { xs: "50%", sm: "50%", md: "50%" },
                        backgroundSize: "cover",
                        backgroundImage: `url(${image})`,
                    }}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {title}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        {description}
                    </Typography>
                    <Box mt={2}>
                        <Typography variant="body2" color="text.secondary">
                            {truncate(content, 100)}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
