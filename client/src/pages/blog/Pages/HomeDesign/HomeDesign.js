import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Typography, Button } from "@material-ui/core";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const scrollAnimation = keyframes`
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
`;

const ScrollingText = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;

    &::before {
        content: "ARTICLES";
        color: rgba(0, 0, 0, 0.1);
        font-size: 36rem;
        white-space: nowrap;
        animation: ${scrollAnimation} 25s linear infinite;
    }
`;

const MainVisualContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Highlight = styled.span`
    font-size: 1.2em; // 大小
    font-weight: bold;
    color: #6677c8;
    text-border: 3px solid #ffe4a3;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
`;

const MainVisualTitle = styled(Typography)`
    font-family: "Helvetica Neue", sans-serif;
    font-size: 49px !important;
    font-weight: bold;
    color: #2f2d3f;
    letter-spacing: 4px;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
    text-align: center;
    line-height: 1;
`;

const AuthorImage = styled.img`
    width: 120px;
    height: 120px;
    object-fit: cover;
    border: 5px solid #5b6cbf;
    border-radius: 50%;
    margin: 0px 16px;
    background-color: #90caf9;
`;

const AuthorFullName = styled(Typography)`
    display: flex;
    align-items: center;
    font-family: "Helvetica Neue", sans-serif;
    font-size: 24px;
    font-weight: bold;
    color: #5b6cbf;
    margin-bottom: 8px;
    text-align: center;
    min-height: 90px;
`;

const AuthorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-wrap: wrap;
    margin-bottom: 32px;
`;

const ArticleContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 228, 163, 0.3) 20%,
        rgba(255, 165, 174, 0.3) 80%,
        rgba(255, 255, 255, 0) 100%
    );
`;

const ArticleCard = styled(animated.div)`
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    margin: 0px 13px 0px 13px;
    border-radius: 8px;
    padding: 16px;
    width: 320px;
    height: 380px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    flex-grow: 1;

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
`;

const ArticleImage = styled.img`
    width: 100%;
    height: 130px;
    object-fit: cover;
    margin-bottom: 16px;
`;
const ArticleTitle = styled(Typography)`
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
    text-align: center;
    min-height: 62px;
`;

const ArticleText = styled(Typography)`
    font-size: 14px;
    margin-bottom: 16px;
    text-align: justify;
    flex-grow: 1;
    min-height: 60px;
`;

const ReadMoreButton = styled(Button)`
    background-color: #5b6cbf;
    color: #ffffff;
    position: absolute;
    bottom: 16px;
    &&:hover {
        background-color: #6677c880 !important;
    }

    transition: transform 0.3s ease-out;
    &:hover {
        transform: scale(1.1);
    }
`;

const AuthorProfession = styled(Button)`
    color: #5b6cbf;
    fontsize: ;
`;

const handleImageLoad = (event) => {
    event.target.style.backgroundColor = "transparent"; // 將背景色設置為透明
};

const truncateText = (text, maxLength = 70) => {
    return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
};

const HomeDesign = () => {
    const [randomArticles, setRandomArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const predefinedAuthors = [
            {
                fullname: "Henry",
                profession: "國家泰拳代表隊",
                profileImage:
                    "https://source.unsplash.com/random/500x501/?professional+man",
            },
            {
                fullname: "Kirs",
                profession: "人魚潛水教練",
                profileImage:
                    "https://source.unsplash.com/random/500x502/?professional+woman",
            },
            {
                fullname: "Jason",
                profession: "台灣硬舉保持人",
                profileImage: "https://i.imgur.com/LfdAzrU.jpg",
            },
            {
                fullname: "Aurora",
                profession: "知名網紅營養師",
                profileImage:
                    "https://source.unsplash.com/random/500x504/?professional+woman",
            },
        ];

        axios
            .get(`http://localhost:8080/blogs/`)
            .then((response) => {
                const randomPosts = response.data
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4); // 根据需求获取所需的文章数量
                const randomArticlesWithAuthors = randomPosts.map(
                    (post, index) => ({
                        ...post,
                        author: predefinedAuthors[index],
                    })
                );
                setRandomArticles(randomArticlesWithAuthors);
            })
            .catch((error) => console.error(error));
    }, []);

    // 設定卡片動畫效果
    const articleAnimation = useSpring({
        to: { opacity: 1, transform: "translateY(0)" },
        from: { opacity: 0, transform: "translateY(100px)" },
        config: { duration: 1500 },
    });

    const [animate, setAnimate] = useState(false);

    //設定頭貼動畫
    const AnimatedAuthorContainer = animated(AuthorContainer);

    const AuthorContainerWithAnimation = ({ children }) => {
        const styles = useSpring({
            to: { opacity: 1, transform: "translateY(0)" },
            from: { opacity: 0, transform: "translateY(50px)" },
            config: { duration: 1500 },
        });

        return (
            <AnimatedAuthorContainer style={styles}>
                {children}
            </AnimatedAuthorContainer>
        );
    };

    return (
        <>
            <ArticleContainer>
                <MainVisualContainer>
                    <div>
                        <MainVisualTitle>
                            不只動，還要<Highlight>懂</Highlight>！
                        </MainVisualTitle>
                    </div>
                </MainVisualContainer>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {randomArticles.map((article, index) => (
                        <div key={article.id}>
                            <AuthorContainerWithAnimation>
                                <AuthorImage
                                    src={article.author.profileImage}
                                    onLoad={handleImageLoad}
                                />
                                <AuthorFullName>
                                    {article.author.fullname}
                                </AuthorFullName>

                                <AuthorProfession>
                                    {article.author.profession}
                                </AuthorProfession>
                            </AuthorContainerWithAnimation>
                            <ArticleCard
                                style={{
                                    ...articleAnimation,
                                    delay: index * 100,
                                }}
                            >
                                <ArticleImage src={article.image} />
                                <div>
                                    <ArticleTitle variant="h6">
                                        {article.title}
                                    </ArticleTitle>
                                    <ArticleText variant="body1">
                                        {truncateText(article.content)}
                                    </ArticleText>
                                    <ReadMoreButton
                                        variant="contained"
                                        onClick={() =>
                                            navigate(
                                                `/blog/BlogPost/${article.id}`
                                            )
                                        }
                                    >
                                        閱讀全文
                                    </ReadMoreButton>
                                </div>
                            </ArticleCard>
                        </div>
                    ))}
                </div>
                <ScrollingText />
            </ArticleContainer>
        </>
    );
};

export default HomeDesign;
