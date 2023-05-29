import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    Grid,
    Paper,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button,
    Menu,
    MenuItem,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import CommentForm from "../../Components/CommentForm";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import Header from "../../Components/Header";
import theme from "@/Styles/themeMui";
import CommentSection from "../../Components/CommentSection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingSearchButton from "../../Components/FloatingSearchButton";

import loadingGif from "../../../../assets/loading.gif";
import defaultUserImage from "../../../../assets/default_user.png";

const MainVisual = styled("img")(({ loaded }) => ({
    maxHeight: "500px",
    display: "block",
    margin: "0 auto",
    opacity: loaded ? 1 : 0.5,
    transition: "opacity 0.5s ease-in-out",
}));

const BlogContent = styled("div")({
    fontSize: "18px",
    lineHeight: "2",
    height: "100vh",
    margin: "30px",
    // backgroundColor: "lightgray",
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    marginTop: "16px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#F5F5F5 ",
    },
    title: {
        color: "#333 ",
    },
    subtitle: {
        color: "#999",
    },
    button: {
        button: {
            backgroundColor: theme.palette.primary.main,
            color: "white",
            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
            },
            borderRadius: "50%",
            minWidth: "auto",
            width: theme.spacing(5),
            height: theme.spacing(5),
        },
    },
    authorPaper: {
        background: "linear-gradient(135deg, rgba(255,194,209,0.5) 0%, rgba(255,165,174,0.2) 100%)",
        // border: "8px solid #6677C880",
        padding: theme.spacing(2),
        marginBottom: theme.spacing(3),
        marginRight: theme.spacing(2),
        borderRadius: "8px",
    },
    recommendedPaper: {
        padding: theme.spacing(2),
        marginRight: theme.spacing(2),
        borderRadius: "8px",
    },
    contentPaper: {
        backgroundColor: "#F8F8F8", // 添加背景顏色
        padding: theme.spacing(2),
        marginBottom: theme.spacing(3), // 添加分隔 margin
        borderRadius: "8px",
    },
    category: {
        backgroundColor: "#FFA5AE",
        color: "#FFF",
        padding: theme.spacing(0.5, 1),
        borderRadius: "8px",
        marginRight: theme.spacing(1),
    },
    containerHeader: {
        backgroundColor: "#FFE4A380",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
    },
    recommendedTitleContainer: {
        backgroundColor: "#6677C880", // 這裡是背景色
        padding: theme.spacing(1), // 這裡可以添加一些間距
        borderRadius: "8px",
    },

    authorImage: {
        width: "200px",
        height: "200px",
        objectFit: "cover",
        display: "block",
        margin: "auto",
        borderRadius: "50%",
        border: "4px solid #FFF",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    },
}));

function isExternalLink(url) {
    return /^(https?:)?\/\//i.test(url);
}

function BlogPost() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [toBeDeletedId, setToBeDeletedId] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentUpdateTrigger, setCommentUpdateTrigger] = useState(false);

    const classes = useStyles();

    const handleEdit = (id) => {
        navigate(`/blog/EditPost/${id}`);
        // Implement your edit functionality here
    };

    const handleDelete = async (id) => {
        setToBeDeletedId(id);
        setOpenDialog(true);
    };
    const handleConfirmDelete = async () => {
        try {
            await axios.delete(
                `http://localhost:8080/blogs/post/${toBeDeletedId}`
            );
            navigate("/blog");
            setBlogs(blogs.filter((blog) => blog.id !== toBeDeletedId));
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
        setOpenDialog(false);
    };

    const handleCancelDelete = () => {
        setOpenDialog(false);
    };

    const categoryMapping = {
        latest: "最新文章",
        fitness: "健身鍛鍊",
        "home-workouts": "居家運動",
        "healthy-eating": "健康飲食",
        "health-wellness": "養生保健",
    };

    const fetchComments = () => {
        axios
            .get(
                `http://localhost:8080/blogs/post/${id}/comments`
            )
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchComments();
    }, [commentUpdateTrigger]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCommentSubmit = (commentData) => {
        axios
            .post(
                `http://localhost:8080/blogs/post/${commentData.post_id}/comments`,
                commentData
            )
            .then((response) => {
                console.log("Comment saved:", response.data);
                setCommentUpdateTrigger((prevTrigger) => !prevTrigger);
                setTimeout(() => {
                    toast.success("留言已發布！"); // 加入成功提示
                    fetchComments(); // 強制重新獲取留言列表
                }); // 延遲 500 毫秒
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8080/blogs/post/${id}`)
            .then((response) => {
                const post = response.data;
                const author = {
                    fullname: post.author_fullname || "Unknown",
                    profileImage:
                        post.profile_image ||
                        "https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png",
                    email: post.email || "Unknown",
                };
                setBlog({ ...post, author });
            })
            .catch((error) => console.error(error));
    }, [id]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/blogs/`)
            .then((response) => {
                const randomPosts = response.data
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 6);
                setRelatedPosts(randomPosts);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/blogs/post/${id}/comments`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => console.error(error));
    }, [id]);

    if (!blog) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <img src={loadingGif} alt="Loading..." />
            </div>
        );
    }
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const { title, description, content, image, imageLabel, category } = blog;

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Header title="Blog" />
                <MainVisual
                    src={image}
                    loaded={imageLoaded}
                    onLoad={() => setImageLoaded(true)}
                    style={{
                        width: "100%",
                        height: "350px",
                        objectFit: "cover",
                        marginBottom: "30px",
                    }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={3}></Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper style={{ borderRadius: "8px" }}>
                            <Box className={classes.containerHeader}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    // spacing={2}
                                >
                                    <Grid item xs={12} sm={10} sx={{ m: 2 }}>
                                        <Typography
                                            variant="h3"
                                            className={classes.category}
                                            component={Link}
                                            to={`/blog/CategoryPage/${category}`}
                                        >
                                            {categoryMapping[category]}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        <Button
                                            className={classes.button}
                                            aria-controls="post-menu"
                                            aria-haspopup="true"
                                            onClick={handleMenuOpen}
                                            startIcon={<MoreVertIcon />}
                                        ></Button>
                                        <Menu
                                            id="post-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem
                                                onClick={() =>
                                                    handleEdit(blog.id)
                                                }
                                            >
                                                編輯文章
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    handleDelete(blog.id)
                                                }
                                            >
                                                刪除文章
                                            </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Grid item>
                                <Typography
                                    variant="h1"
                                    align="center"
                                    sx={{ m: 2 }}
                                    className={classes.title}
                                >
                                    {title}
                                </Typography>
                            </Grid>
                            <Typography
                                variant="h5"
                                align="center"
                                sx={{ m: 2 }}
                            >
                                {description}
                            </Typography>
                            <Divider />
                            <BlogContent
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </Paper>
                        <CommentSection
                            key={commentUpdateTrigger}
                            comments={comments}
                        />
                        <CommentForm
                            onSubmit={handleCommentSubmit}
                            post_id={id}
                        />
                        <ToastContainer />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper className={classes.authorPaper}>
                            <div
                                onClick={() => navigate(`/${blog.username}`)} // 根據您的路由結構進行修改
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={blog.author.profileImage}
                                    alt={blog.author.fullname}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = defaultUserImage;
                                    }}
                                    className={classes.authorImage}
                                />
                            </div>
                            <Box
                                sx={{
                                    backgroundColor: "#fff",
                                    padding: "0.5rem",
                                    marginTop: "1rem",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    align="center"
                                    style={{
                                        marginTop: "1rem",
                                        color: "#6677C8",
                                        fontWeight: "bold",
                                    }}
                                >
                                    使用者名稱：{blog.author.fullname}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    style={{
                                        marginTop: "1rem",
                                        marginBottom: "1rem",
                                        color: "#6677C8",
                                        fontWeight: "bold",
                                    }}
                                >
                                    使用者信箱：
                                    {blog.author.email}
                                </Typography>
                            </Box>
                        </Paper>
                        <Paper className={classes.recommendedPaper}>
                            <Box className={classes.recommendedTitleContainer}>
                                <Typography
                                    variant="h4"
                                    align="center"
                                    gutterBottom
                                    style={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                        textShadow: "2px 2px 7px #333",
                                    }}
                                >
                                    推薦文章
                                </Typography>
                            </Box>
                            <List>
                                {relatedPosts.map((post) => (
                                    <StyledListItem
                                        component="a"
                                        href={`/blog/BlogPost/${post.id}`}
                                    >
                                        <img
                                            src={post.image}
                                            alt={post.imageLabel}
                                            style={{
                                                marginRight: "16px",
                                                width: "80px",
                                                height: "80px",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <ListItemText primary={post.title} />
                                    </StyledListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
                <Dialog
                    open={openDialog}
                    onClose={handleCancelDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">刪除文章</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            確定要刪除此文章嗎？此操作無法恢復，請慎重考慮。
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelDelete} color="primary">
                            取消
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            color="secondary"
                            autoFocus
                        >
                            確認刪除
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <FloatingSearchButton />
        </ThemeProvider>
    );
}

export default BlogPost;
