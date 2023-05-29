import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const data = [
    {
        title: "保持健康的方法",
        description: "養成良好的飲食習慣、保持適量運動，健康就不會離你太遠。",
        image: "https://source.unsplash.com/random/?health",
        imageText: "健康",
        linkText: "閱讀更多...",
    },
    {
        title: "保持身體狀態",
        description: "好處不僅僅是外在形象的改善，能擁有更多的能量和活力。",
        image: "https://source.unsplash.com/random/?diet",
        imageText: "減肥",
        linkText: "閱讀更多...",
    },
    {
        title: "健身的重要性",
        description: "健身不只能夠讓身體健康，提高免疫力，更能夠增強自信心。",
        image: "https://source.unsplash.com/random/?fitness",
        imageText: "健身",
        linkText: "閱讀更多...",
    },
    {
        title: "如何改善睡眠品質",
        description:
            "保持規律，營造一個安靜、舒適的睡眠環境，就能夠有效改善睡眠品質。",
        image: "https://source.unsplash.com/random/?sleep",
        imageText: "睡眠",
        linkText: "閱讀更多...",
    },
    {
        title: "保養的影響力",
        description:
            "保養的好處能夠緩解壓力和焦慮，提高心理健康。",
        image: "https://source.unsplash.com/random/?wellness",
        imageText: "養生",
        linkText: "閱讀更多...",
    },
];
function MainFeaturedPost() {
    const [index, setIndex] = React.useState(0);
    const post = data[index];

    // 定義輪播圖更新的函數
    const handleInterval = () => {
        setIndex((prevIndex) =>
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
    };

    // 啟動輪播圖更新
    React.useEffect(() => {
        const intervalId = setInterval(handleInterval, 5000);

        // 組件卸載時清除定時器
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Paper
            sx={{
                position: "relative",
                backgroundColor: "grey.800",
                color: "#fff",
                mb: 4,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${post.image})`,
                minHeight: "200px",
            }}
        >
            {/* Increase the priority of the hero background image */}
            {
                <img
                    style={{ display: "none" }}
                    src={post.image}
                    alt={post.imageText}
                />
            }
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: "rgba(0,0,0,.3)",
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: "relative",
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h1"
                            color="inherit"
                            gutterBottom
                        >
                            {post.title}
                        </Typography>
                        <Typography variant="h4" color="inherit" paragraph>
                            {post.description}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default MainFeaturedPost;
