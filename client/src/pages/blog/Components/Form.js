import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    ThemeProvider,
    Grid,
    Paper,
    Typography,
    Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/lab/Alert";
import axios from "axios";
import Editor from "./Editor";
import {} from "@mui/material";
import theme from "@/Styles/themeMui";

class CustomUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(
            (file) =>
                new Promise((resolve, reject) => {
                    const data = new FormData();
                    data.append("image", file);

                    axios
                        .post("http://localhost:8080/blogs/UploadImage", data)
                        .then((response) => {
                            resolve({
                                default: `/assets/BlogImages/${response.data.fileName}`,
                            });
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                            reject(error);
                        });
                })
        );
    }
}

function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new CustomUploadAdapter(loader);
    };
}

const FormWrapper = styled(Paper)({
    padding: "30px",
});

const StyledEditor = styled(Editor)(({ theme }) => ({
    overflowY: "auto", // 添加垂直滾動條，如果內容超過最大高度
    height: "800px",
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    marginTop: "16px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
}));

function Form() {
    const navigate = useNavigate();

    const [successMessage, setSuccessMessage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [newPost, setNewPost] = useState(null);
    const [category, setCategory] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    // const htmlContent = content;

    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleEditorChange(event, editor) {
        const data = editor.getData();
        setContent(data);
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        // 從 localStorage 中讀取用户 ID
        const userJson = localStorage.getItem("user");

        if (!userJson) {
            console.error("請確認已登入。");
            return;
        }

        // 解析成JSON 格式
        const userObj = JSON.parse(userJson);

        // 提出 ID
        const userId = userObj.id;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("content", content);
        formData.append("category", category);
        formData.append("author_id", userId);
        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        //向後端發送post請求
        axios
            .post("http://localhost:8080/blogs",formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                //提交表單中的各項
                title,
                description,
                content,
                category,
                author_id: userId,
            })
            .then((response) => {
                //設定成功發布訊息
                setSuccessMessage("文章發布成功！");
                //設置新post id
                setTimeout(() => {
                    setNewPost(response.data.id);
                }, 500);
            });
    }

    useEffect(() => {
        if (newPost) {
            navigate(`/blog/BlogPost/${newPost}`);
        }
    }, [newPost]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} md={8}>
                        <FormWrapper>
                            <form
                                onSubmit={handleSubmit}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="category-select-label">
                                        分類
                                    </InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        value={category}
                                        onChange={handleCategoryChange}
                                        label="分類"
                                    >
                                        <MenuItem value="fitness">
                                            健身鍛鍊
                                        </MenuItem>
                                        <MenuItem value="home-workouts">
                                            居家運動
                                        </MenuItem>
                                        <MenuItem value="healthy-eating">
                                            健康飲食
                                        </MenuItem>
                                        <MenuItem value="health-wellness">
                                            養生保健
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="title"
                                    label="標題"
                                    value={title}
                                    onChange={handleTitleChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="description"
                                    label="描述"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    required
                                />
                                <FormControl fullWidth margin="normal">
                                    {/* <InputLabel htmlFor="image-input">
                                        選擇圖片
                                    </InputLabel> */}
                                    <input
                                        style={{ display: "none" }}
                                        id="image-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <label htmlFor="image-input">
                                        <Button
                                            variant="outlined"
                                            component="span"
                                        >
                                            上傳文章主視覺圖片
                                        </Button>
                                    </label>
                                    {previewImage && (
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            style={{
                                                width: "100%",
                                                marginTop: "16px",
                                            }}
                                        />
                                    )}
                                </FormControl>
                                <StyledEditor
                                    onChange={handleEditorChange}
                                    config={{
                                        height: "500px",
                                        extraPlugins: [
                                            CustomUploadAdapterPlugin,
                                        ],
                                        image: {
                                            // 設置圖片大小
                                            styles: {
                                                "max-width": "100%",
                                                "max-height": "500px",
                                            },
                                            // 圖片預覽
                                            previewImage: true,
                                        },
                                    }}
                                />

                                <SubmitButton
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                >
                                    發布文章
                                </SubmitButton>
                            </form>
                            <Snackbar
                                //控制snackbar是否顯示
                                open={Boolean(successMessage)}
                                //自動消失時間
                                autoHideDuration={1500}
                                //關閉時的
                                onClose={() => setSuccessMessage("")}
                                //設置位置
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                            >
                                <MuiAlert
                                    //訊息類型
                                    severity="success"
                                    //關閉的
                                    onClose={() => setSuccessMessage("")}
                                    //設定訊息樣式
                                    style={{ fontSize: "18px" }}
                                >
                                    <Typography variant="h3">
                                        {successMessage}
                                    </Typography>
                                </MuiAlert>
                            </Snackbar>
                        </FormWrapper>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
}

export default Form;
