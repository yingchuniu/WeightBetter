import React from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Box, Typography, Grid, Paper } from "@mui/material";
import theme from "@/Styles/themeMui";

const useStyles = makeStyles(() => ({
    commentContainer: {
        backgroundColor: "white",
        border: "3px solid " + theme.palette.primary.light,
        borderRadius: "8px",
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    userAvatar: {
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

const CommentSection = ({ comments }) => {
    const classes = useStyles();
    if (!comments) {
        return null;
    }

    return (
        <Box>
            {comments.map((comment) => (
                <Paper key={comment.id} className={classes.commentContainer}>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Avatar
                                src={comment.profile_image}
                                alt={comment.fullname}
                                className={classes.userAvatar}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h4">
                                {comment.fullname}
                            </Typography>
                            <Typography variant="h6">
                                {new Date(comment.created_at).toLocaleString()}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="body1">{comment.content}</Typography>
                </Paper>
            ))}
        </Box>
    );
};

export default CommentSection;
