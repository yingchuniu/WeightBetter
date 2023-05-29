import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/AuthContext";
import {
    Container,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Paper,
    TablePagination,
    TextField,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyBlogs = () => {
    const { currentUser } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [search, setSearch] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [toBeDeletedId, setToBeDeletedId] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    "http://localhost:8080/blogs",
                    {
                        params: {
                            author_id: currentUser.id,
                        },
                    }
                );
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        }

        fetchData();
    }, [currentUser]);

    useEffect(() => {
        async function fetchUserId() {
            try {
                const response = await axios.get(
                    "http://localhost:8080/users", // 更新此 URL
                    {
                        params: {
                            username: username,
                        },
                    }
                );
                if (response.data.length > 0) {
                    return response.data[0].id;
                } else {
                    return null;
                }
            } catch (error) {
                console.error("Error fetching user ID:", error);
                return null;
            }
        }

        async function fetchData() {
            const userId = await fetchUserId();
            if (userId) {
                try {
                    const response = await axios.get(
                        "http://localhost:8080/blogs",
                        {
                            params: {
                                author_id: userId,
                            },
                        }
                    );
                    setBlogs(response.data);
                } catch (error) {
                    console.error("Error fetching blogs:", error);
                }
            }
        }

        fetchData();
    }, [username]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
            setBlogs(blogs.filter((blog) => blog.id !== toBeDeletedId));
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
        setOpenDialog(false);
    };

    const handleCancelDelete = () => {
        setOpenDialog(false);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const truncateContent = (content) => {
        return content.length > 55 ? content.substring(0, 55) + "..." : content;
    };

    const filteredBlogs = blogs.filter(
        (blog) =>
            blog.title.toLowerCase().includes(search.toLowerCase()) ||
            blog.content.toLowerCase().includes(search.toLowerCase())
    );

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

    const sortedBlogs = [...filteredBlogs].sort((a, b) => {
        if (sortDirection === "asc") {
            return new Date(a.date) - new Date(b.date);
        } else {
            return new Date(b.date) - new Date(a.date);
        }
    });

    return (
        <Container>
            <TableContainer
                component={Paper}
                sx={{
                    bgcolor: "rgba(211, 211, 211, 0.3)",
                    borderColor: "lightblue",
                    border: 1,
                    mt: 2,
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h3" component="span">
                        搜尋
                    </Typography>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={search}
                        onChange={handleSearch}
                        sx={{ flex: 1, marginLeft: 1, maxWidth: "50%" }}
                    />
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{ width: "15%", cursor: "pointer" }}
                                onClick={toggleSortDirection}
                            >
                                時間
                                {sortDirection === "asc" && (
                                    <ExpandLess fontSize="small" />
                                )}
                                {sortDirection === "desc" && (
                                    <ExpandMore fontSize="small" />
                                )}
                            </TableCell>
                            <TableCell sx={{ width: "25%" }}>標題</TableCell>
                            <TableCell sx={{ width: "40%" }}>內文</TableCell>
                            <TableCell sx={{ width: "20%" }}>動作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedBlogs
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell>
                                        {blog.date.substring(0, 10)}
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            to={`/blog/BlogPost/${blog.id}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            {blog.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {truncateContent(blog.content)}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleEdit(blog.id)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() =>
                                                handleDelete(blog.id)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={filteredBlogs.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="每頁顯示："
                    rowsPerPageOptions={[3, 5, 10, 20, 50]}
                />
            </TableContainer>
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
        </Container>
    );
};

export default MyBlogs;
