import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const useStyles = makeStyles({
    card: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "250px",
        borderRadius:"8px",
    },
    media: {
        width: "100%",
        height: "150px",
        objectFit: "cover",
    },
    content: {
        padding: "16px",
    },
});

function CardList(props) {
    const {  posts } = props;
    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(1);

    if (!posts) {
        return null;
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // 每5篇文章分割成一個子數組
    const itemsPerPage = 5;
    const postGroups = posts.reduce((acc, curr, index) => {
        const groupIndex = Math.floor(index / itemsPerPage);
        if (acc[groupIndex]) {
            acc[groupIndex].push(curr);
        } else {
            acc[groupIndex] = [curr];
        }
        return acc;
    }, []);

    const currentGroup = postGroups[currentPage - 1] || [];

    return (
        <Grid container spacing={2}>
            {currentGroup.map((post) => {
                return (
                    <Grid item key={post.id} xs={12}>
                        <Card className={classes.card}>
                            <CardActionArea
                                href={`/blog/BlogPost/${post.id}`}
                                component="a"
                            >
                                <CardMedia
                                    className={classes.media}
                                    image={post.image}
                                    title={post.title}
                                />
                            </CardActionArea>
                            <CardContent className={classes.content}>
                                <Typography
                                    gutterBottom
                                    variant="h2"
                                    component="h2"
                                >
                                    <a href={`/blog/BlogPost/${post.id}`}>
                                        {post.title}
                                    </a>
                                </Typography>

                                <Typography>
                                    By {post.author_fullname}
                                </Typography>
                                <Typography>
                                    {post.date.substring(0, 10)}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    {post.content.substring(0, 100)}...
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
            <Grid item xs={12}>
                <Pagination
                    count={postGroups.length}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Grid>
        </Grid>
    );
}

export default CardList;
