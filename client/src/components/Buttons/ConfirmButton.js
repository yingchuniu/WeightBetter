import { Button } from "@mui/material";

const ConfirmButton = (props) => {
    return (
        <Button
            size={props.size}
            variant="contained"
            color="teal"
            sx={{
                mx: props.mx || 1, // ✔️ this shortcut is specific to the `sx` prop,
                my: props.my || 2,
            }}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    );
};

export default ConfirmButton;
