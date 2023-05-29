import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";


const SearchContainer = styled("div")(({ theme, expanded }) => ({
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
    borderRadius: expanded ? theme.spacing(1) : "50%",
    backgroundColor: theme.palette.yellow.light,
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "width 0.3s, box-shadow 0.3s, transform 0.3s",
    overflow: "hidden",
    width: expanded ? "300px" : "68px",
    minWidth: "68px",
    height: "68px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
    background: `linear-gradient(135deg, ${theme.palette.teal.light} 0%, ${theme.palette.primary.light} 100%)`,
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        boxShadow:
            "0 8px 12px rgba(0, 0, 0, 0.12), 0 3px 5px rgba(0, 0, 0, 0.1)",
        transform: "scale(1.05)",
    },
    animation: "shake 1s cubic-bezier(.36,.07,.19,.97) both",
    animationIterationCount: "1",
    "@keyframes shake": {
        "10%, 90%": {
            transform: "translate3d(-2px, 0, 0)",
        },
        "20%, 80%": {
            transform: "translate3d(4px, 0, 0)",
        },
        "30%, 50%, 70%": {
            transform: "translate3d(-6px, 0, 0)",
        },
        "40%, 60%": {
            transform: "translate3d(6px, 0, 0)",
        },
    },
}));

function FloatingSearchButton() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/blog/search/${inputValue}`);
    }
  };

  const handleSearchIconClick = () => {
    setExpanded(!expanded);
  };

  const handleSearchInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchInputBlur = () => {
    setTimeout(() => {
      setExpanded(false);
    }, 200);
  };

  return (
    <SearchContainer expanded={expanded} onClick={handleSearchIconClick}>
      {expanded ? (
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            onBlur={handleSearchInputBlur}
            onChange={handleSearchInputChange}
            value={inputValue}
            placeholder="搜尋文章"
            inputProps={{
              "aria-label": "search",
              style: { color: theme.palette.primary.dark },
            }}
            variant="standard"
          />
        </form>
      ) : (
        <SearchIcon fontSize="large" />
      )}
    </SearchContainer>
  );
}

export default FloatingSearchButton;