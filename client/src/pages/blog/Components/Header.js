import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
    categoryButton: {
        padding: "8px 16px",
        flexShrink: 0,
        textDecoration: "none",
        marginRight: "8px",
        color: "white !important",
        transition: "background-color 0.3s, color 0.3s, transform 0.3s",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            color: "#ffffff",
            cursor: "pointer",
            transform: "translateY(-2px)",
        },
    },
    publishButton: {
        padding: "8px 16px",
        flexShrink: 0,
        textDecoration: "none",
        color: "white !important",
        transition: "background-color 0.3s, color 0.3s, transform 0.3s",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            color: "#ffffff",
            cursor: "pointer",
        },
    },
}));

const sections = [
    { title: "最新文章", url: "/blog/CategoryPage/latest" },
    { title: "健身鍛鍊", url: "/blog/CategoryPage/fitness" },
    { title: "居家運動", url: "/blog/CategoryPage/home-workouts" },
    { title: "健康飲食", url: "/blog/CategoryPage/healthy-eating" },
    { title: "養生保健", url: "/blog/CategoryPage/health-wellness" },
];
function Header(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <React.Fragment>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{
                    justifyContent: "space-between",
                    overflowX: "auto",
                    backgroundColor: "#FFA5AE ",
                    minHeight: "60px",
                }}
            >
                <div sx={{ display: "flex" }}>
                    {sections.map((section) => (
                        <Link
                            className={classes.categoryButton}
                            key={section.title}
                            variant="h5"
                            component={RouterLink}
                            to={section.url}
                            underline="none"
                            sx={{ color: "white" }}
                        >
                            {section.title}
                        </Link>
                    ))}
                </div>
                <Link
                    className={classes.publishButton}
                    variant="h4"
                    href="/blog/WriteBlog"
                    underline="none"
                    sx={{ color: "white" }}
                >
                    發表文章
                </Link>
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
