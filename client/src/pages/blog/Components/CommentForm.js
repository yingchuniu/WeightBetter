import { useState, useEffect } from "react";
import { TextField, makeStyles, Button } from "@material-ui/core";
import { useAuth } from "@/hooks/AuthContext";
import styled from "styled-components";
import theme from "@/Styles/themeMui";

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        margin: theme.spacing(3, 0),
    },
    input: {
        marginBottom: theme.spacing(2),
    },
    button: {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
        },
        padding: "8px 16px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        alignSelf: "flex-end",
        fontSize: theme.typography.h6.fontSize,
    },
}));

function CommentForm({ onSubmit, post_id }) {
    const classes = useStyles();
    const [content, setContent] = useState("");
    const { currentUser } = useAuth();
    const [author_id, setAuthorId] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setAuthorId(user.id); // 更改為從 user 物件中獲取 id
        } else {
            // 如果在 localStorage 中找不到 user，則從 currentUser 中獲取
            setAuthorId(currentUser.uid);
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ content, author_id, post_id });
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
                label="Name"
                value={currentUser.username}
                disabled
                className={classes.input}
            />
            <TextField
                label="Comment"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                multiline
                rows={4}
                minRows={4}
                maxRows={10}
                variant="outlined"
                className={classes.input}
            />
            <Button type="submit" className={classes.button}>
                發表
            </Button>
        </form>
    );
}

export default CommentForm;
