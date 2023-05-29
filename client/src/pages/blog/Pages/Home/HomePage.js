import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "../../Components/Header";
import MainFeaturedPost from "../../Components/MainFeaturedPost";
import FeaturedPost from "../../Components/FeaturedPost";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { minWidth } from "@mui/system";
import Typography from "@mui/material/Typography";
import FocusArticle from "../../Components/FocusArticle";
import HotArticle from "../../Components/HotArticle";
import SubscribeForm from "../../Components/SubscribeForm";
import FloatingSearchButton from "../../Components/FloatingSearchButton";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Lottie from "lottie-react";
import GirlRunning from "../../../../assets/GirlRunning.json";
import loadingGif from "../../../../assets/loading.gif";


export default function HomePage() {
    const [posts, setPosts] = React.useState([]);
    const theme = useTheme();
    const [showArrows, setShowArrows] = React.useState(false);
    const [girlRunningPosition, setGirlRunningPosition] = React.useState(-25);
    const [isLoading, setIsLoading] = React.useState(true);

    

    React.useEffect(() => {
        fetch("http://localhost:8080/blogs")
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
                setIsLoading(false);
            });
    }, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setGirlRunningPosition((prevPosition) => {
                if (prevPosition >= 110) {
                    return -25;
                }
                return prevPosition + 1;
            });
        }, 25);
        return () => clearInterval(interval);
    }, []);

    const settings = {
        autoplay: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        pauseOnHover: true,
        className: "my-slider",
        prevArrow: (
            <ArrowBackIosIcon
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "-30",
                    zIndex: 100,
                    fontSize: "30px",
                    color: "black",
                }}
            />
        ),
        nextArrow: (
            <ArrowForwardIosIcon
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: "-30",
                    zIndex: 100,
                    fontSize: "30px",
                    color: "black",
                }}
            />
        ),
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    if (isLoading) {
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

    return (
        <Box>
            <Header title="Blog" />
            <MainFeaturedPost />
            <Container
                maxWidth="lg"
                sx={{
                    paddingTop: 3,
                    paddingBottom: 3,
                    paddingRight: 0,
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        overflow: "visible",
                    }}
                >
                    <Slider {...settings}>
                        {posts.map((post) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                key={post.title}
                                sx={{
                                    minHeight: "300px",
                                    minWidth: "100%",
                                    overflowX: "scroll",
                                }}
                            >
                                <FeaturedPost
                                    cardStyle="normalCard"
                                    actionAreaStyle="normalActionArea"
                                    mediaStyle="normalMedia"
                                    contentStyle="normalContent"
                                    currentIndex={0}
                                    post={post}
                                />
                            </Grid>
                        ))}
                    </Slider>
                    <ArrowBackIosIcon
                        sx={{
                            position: "absolute",
                            top: "40%",
                            left: -50,
                            zIndex: 10,
                            fontSize: "40px",
                            color: "#1BB6B2",
                        }}
                    />
                    <ArrowForwardIosIcon
                        sx={{
                            position: "absolute",
                            top: "40%",
                            right: -50,
                            zIndex: 10,
                            fontSize: "40px",
                            color: "#1BB6B2",
                        }}
                    />
                </Box>

                <Grid container spacing={2}>
                    {posts.length > 0 && (
                        <Grid item xs={12} md={6} lg={6}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 4,
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    component="div"
                                    sx={{
                                        color: theme.palette.primary.dark,
                                        mr: 4,
                                    }}
                                >
                                    焦點文章
                                </Typography>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        height: "4px",
                                        backgroundColor:
                                            theme.palette.primary.light,
                                        marginLeft: "8px",
                                    }}
                                />
                            </Box>
                            {posts.length > 0 && (
                                <FocusArticle post={posts[40]} />
                            )}
                        </Grid>
                    )}
                    <Grid item xs={12} md={6} lg={6}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 4,
                            }}
                        >
                            <Typography
                                variant="h3"
                                component="div"
                                sx={{
                                    color: theme.palette.primary.dark,
                                    mr: 4,
                                }}
                            >
                                大家都在看
                            </Typography>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    height: "4px",
                                    backgroundColor:
                                        theme.palette.primary.light,
                                    marginLeft: "8px",
                                }}
                            />
                        </Box>
                        <Box sx={{ position: "relative" }}>
                            <Box
                                sx={{
                                    maxHeight: "476.5px", // 設定容器的最大高度
                                    overflowY: "scroll", // 讓容器在內容超出時可以滾動
                                }}
                            >
                                {posts.slice(5, 51).map((post, index) => (
                                    <HotArticle key={index} post={post} />
                                ))}
                            </Box>
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: "50px",
                                    background:
                                        "linear-gradient(0deg, rgba(255, 255, 255, 0.9), transparent)",
                                }}
                            ></Box>
                        </Box>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        position: "relative",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3} lg={3}></Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    my: 4,
                                    position: "relative",
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    component="div"
                                    sx={{
                                        color: theme.palette.primary.dark,
                                    }}
                                >
                                    訂閱我們
                                </Typography>
                            </Box>
                            <SubscribeForm />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}></Grid>
                    </Grid>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%", // 調整女孩在垂直方向上的位置
                            left: `${girlRunningPosition}%`, // 女孩的水平位置將根據 girlRunningPosition 變量而變化
                            zIndex: -1, // 將女孩置於背景後
                        }}
                    >
                        <Lottie
                            animationData={GirlRunning}
                            play
                            loop
                            speed={4}
                            rendererSettings={{
                                preserveAspectRatio: "xMidYMid slice",
                            }}
                            style={{
                                width: 200,
                                height: 200,
                            }}
                        />
                    </Box>
                </Box>
                <FloatingSearchButton />
            </Container>
        </Box>
    );
}
