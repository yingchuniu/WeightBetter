import React from "react";
import {
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
} from "@mui/material";

const cardStyles = {
    normalCard: {
        width: `100%`,
        height: `270px`,
    },
    largeCard: {
        width: `100%`,
        height: `560px`,
    },
    smallCard: {
        width: `100%`,
        height: `250px`,
    },
};

const actionAreaStyles = {
    normalActionArea: {
        width: `280px`,
        height: `270px`,
    },
    largeActionArea: {
        width: `450px`,
        height: `560px`,
    },
    smallActionArea: {
        width: `210px`,
        height: `250px`,
    },
};

const mediaStyles = {
    normalMedia: {
        width: `100%`,
        height: `190px`,
    },
    largeMedia: {
        width: `100%`,
        height: `350px`,
    },
    smallMedia: {
        width: `100%`,
        height: `180px`,
    },
};

const contentStyles = {
    // normalContent: { m:1,width: `320px` },
    // largeContent: { flex: 1, width: `450px` },
    // smallContent: { flex: 1, width: `320px` },
};

function FeaturedPost({
    post,
    cardStyle,
    actionAreaStyle,
    mediaStyle,
    contentStyle,
    gridMargin
}) {
    return (
        <Grid item xs={12} sm={6} lg={3} sx={{ maxWidth: "100%" , ...gridMargin   }}>
            <CardActionArea
                component="a"
                href={`/blog/BlogPost/${post.id}`}
                sx={{ ...actionAreaStyles[actionAreaStyle] }}
            >
                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        ...cardStyles[cardStyle],
                        borderRadius: "8px",
                        ml:0.5,
                    }}
                >
                    <CardMedia
                        component="img"
                        sx={{
                            ...mediaStyles[mediaStyle],
                            objectFit: "cover",
                            aspectRatio: "auto",
                        }}
                        image={post.image}
                        alt={post.imageLabel}
                    />
                    <Divider />
                    <CardContent sx={{ ...contentStyles[contentStyle] }}>
                        <Typography
                            component="h2"
                            variant="body1"
                            sx={{
                                wordWrap: "break-word", // 添加此行以實現自動換行
                                overflowWrap: "break-word", // 添加此行以實現自動換行
                            }}
                        >
                            {post.title}
                        </Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}
export default FeaturedPost;
