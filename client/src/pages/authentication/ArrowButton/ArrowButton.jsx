import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ArrowButton = (props) => {
    return (
        <Button
            type={props.type}
            variant="contained"
            color={props.color || "primary"}
            sx={{
                mx: 1, // ✔️ this shortcut is specific to the `sx` prop,
                mt: 4,
                width: 75,
                height: 75,
                borderRadius: 6,
            }}
            onClick={props.onClick}>
            <ArrowForwardIcon color="white" />
        </Button>
    );
};

export default ArrowButton;
