// Input styling
export const textInput = {
    width: { xs: "100%", sm: "150px" },
    "& label": {
        fontSize: "16px",
    },
    "& input:valid + fieldset": {
        borderColor: "neutral.main",
        borderWidth: 1,
    },
    "& input:invalid + fieldset": {
        borderColor: "red",
        borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
        borderLeftWidth: 5,
        padding: "4px",
    },
};
