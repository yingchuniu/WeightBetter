import { Button } from "@mui/material";

const DenyButton = (props) => {
    return (
        <Button
            size="large"
            variant="contained"
            color="pink"
            sx={{
                mx: 1, // ✔️ this shortcut is specific to the `sx` prop,
                my: 3,
            }}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    );
};

export default DenyButton;
