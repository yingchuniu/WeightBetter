import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Snackbar,
    ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Header from "../../Components/Header";
import MuiAlert from "@mui/material/Alert";
import theme from "@/Styles/themeMui";

const FormWrapper = styled(Paper)({
    padding: "30px",
});

const PutButton = styled(Button)(({ theme }) => ({
    marginTop: "16px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: "",
        description: "",
        content: "",
        image: "",
        imageLabel: "",
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/blogs/post/${id}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => console.error(error));
    }, [id]);

    const handleChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:8080/blogs/post/${id}`, post)
            .then(() => {
                setTimeout(() => {
                    setOpenSnackbar(true);
                    navigate(`/blog/BlogPost/${id}`);
                }, 1000);
            })
            .catch((error) => console.error(error));
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Header title="編輯文章" />
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} md={8}>
                        <FormWrapper>
                            <Typography
                                variant="h4"
                                align="center"
                                gutterBottom
                            >
                                編輯文章
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="title"
                                    label="標題"
                                    value={post.title}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="description"
                                    label="描述"
                                    value={post.description}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={10}
                                    margin="normal"
                                    name="content"
                                    label="內容"
                                    value={post.content}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="image"
                                    label="圖片網址"
                                    value={post.image}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="imageLabel"
                                    label="圖片標籤"
                                    value={post.imageLabel}
                                    onChange={handleChange}
                                />
                                <PutButton
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    style={{ marginTop: "16px" }}
                                >
                                    更新文章
                                </PutButton>
                            </form>
                        </FormWrapper>
                    </Grid>
                </Grid>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <Alert onClose={handleClose} severity="success">
                        文章更新完成！
                    </Alert>
                </Snackbar>
            </ThemeProvider>
        </>
    );
}

export default EditPost;
