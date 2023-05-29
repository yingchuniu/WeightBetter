import AuthService from "@/services/auth.service";
import { registerReducer, initialStates } from "./registerReducer";
// hooks
import { useNavigate } from "react-router-dom";
import { useState, useReducer, useEffect } from "react";
import { styled } from "@mui/system";
// components
import { Box, TextField, Stack, Button, InputAdornment } from "@mui/material";
import ArrowButton from "../ArrowButton/ArrowButton";
import FlexColBox from "@/components/FlexBox/FlexColBox";
import AuthHeader from "../AuthHeader";
import RegisterSuccess from "../RegisterSuccess";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const StyledTextField = styled(TextField)(({ theme }) => ({
    margin: 5,
    size: "small",
    "&.MuiTextField-root": { width: "75%" },
    "& .MuiFormHelperText-root": { color: theme.palette.pink.dark },
}));

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{7,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegisterForm() {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(registerReducer, initialStates);
    const [step, setStep] = useState(1);

    const validation = async (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            const validEmail = EMAIL_REGEX.test(value);
            dispatch({ type: "validEmail", validEmail: validEmail });
            dispatch({
                type: "inputError",
                errMsg: { email: `${validEmail ? "" : "email格式不正確"}` },
            });
            dispatch({ type: "emailInput", email: value });
        }

        if (name === "username") {
            dispatch({ type: "usernameInput", username: value });
            const validUsername = USERNAME_REGEX.test(value);
            dispatch({ type: "validateUsername", validUsername: validUsername });
            dispatch({
                type: "inputError",
                errMsg: {
                    username: `${validUsername ? "" : "帳號名稱需至少8位數，且不得包含特殊符號"}`,
                },
            });
            // const response = await AuthService.checkUsername(value);
            // if (response.data?.success) {
            //     dispatch({
            //         type: "inputError",
            //         errMsg: { username: response.data.success },
            //     });
            // }
        }

        if (name === "password") {
            dispatch({ type: "passwordInput", pwd: value });
            const validPwd = PWD_REGEX.test(value);
            dispatch({ type: "validatePassword", validPwd: validPwd });
            dispatch({
                type: "inputError",
                errMsg: {
                    password: `${validPwd ? "" : "密碼需至少8位數，且需包含大小寫及特殊符號"}`,
                },
            });
        }

        if (name === "matchPwd") {
            console.log(state.validMatch);
            dispatch({ type: "passwordCheck", matchPwd: value });
            const validMatch = state.pwd === value;
            console.log(validMatch);
            dispatch({ type: "validatePasswordCheck", validMatch: validMatch });
            dispatch({
                type: "inputError",
                errMsg: {
                    matchPwd: `${validMatch ? "" : "確認密碼與輸入密碼需相同！"}`,
                },
            });
        }
    };
    const handlePrevStep = () => {
        setStep((step) => step - 1);
    };
    const handleNextStep = () => {
        switch (step) {
            case 1:
                setStep((step) => step + 1);
                break;
            case 2:
                state.validEmail && setStep((step) => step + 1);
                break;
            case 3:
                state.validUsername && setStep((step) => step + 1);
                break;
            case 4:
                state.validMatch && setStep((step) => step + 1);
                break;
            case 5:
                setStep((step) => step + 1);
                break;
            default:
                return "";
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { username, pwd: password, fullname, birth_date, email } = state;
        await AuthService.register({
            username,
            password,
            fullname,
            birth_date,
            email,
        }).then((res) => {
            handleNextStep();
            console.log(res.data);
        });
    };

    return (
        <form>
            <FlexColBox sx={{ justifyContent: "start" }} marginY={5}>
                {step === 1 && (
                    <>
                        <AuthHeader subtitle="可以填寫真名也可以保持神秘。">你的名字是？</AuthHeader>
                        <StyledTextField
                            autoComplete="false"
                            key="1"
                            label="姓名"
                            name="fullname"
                            size="small"
                            type="text"
                            value={state.fullname}
                            onChange={(e) => dispatch({ type: "fullnameInput", fullname: e.target.value })}
                        />
                    </>
                )}

                {step === 2 && (
                    <>
                        <AuthHeader>你的 Email 是什麼？</AuthHeader>
                        <StyledTextField
                            autoComplete="false"
                            key="2"
                            label="電子郵件"
                            size="small"
                            type="text"
                            value={state.email}
                            name="email"
                            onChange={(e) => {
                                validation(e);
                            }}
                            helperText={state.errMsg?.email}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {state.validEmail ? <CheckRoundedIcon color="teal" sx={{ fontWeight: "500" }} /> : ""}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </>
                )}

                {step === 3 && (
                    <>
                        <AuthHeader subtitle="取個讓人好記的帳號八">請輸入帳號</AuthHeader>
                        <StyledTextField
                            autoComplete="false"
                            key="3"
                            label="帳號名稱"
                            size="small"
                            type="text"
                            placeholder="帳號名稱"
                            value={state.username}
                            name="username"
                            onChange={(e) => {
                                console.log(e.target.name);
                                validation(e);
                            }}
                            helperText={state.usernameFocus && state.errMsg.username}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {state.validUsername ? <CheckRoundedIcon color="teal" sx={{ fontWeight: "500" }} /> : ""}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </>
                )}
                {step === 4 && (
                    <>
                        <AuthHeader subtitle="飲食健康有助於密碼記憶">請輸入密碼</AuthHeader>
                        <StyledTextField
                            autoComplete="false"
                            key="4"
                            label="密碼"
                            size="small"
                            type="password"
                            name="password"
                            value={state.pwd}
                            onChange={(e) => validation(e)}
                            helperText={state.errMsg?.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {state.validPwd ? <CheckRoundedIcon color="teal" sx={{ fontWeight: "500" }} /> : ""}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <StyledTextField
                            autoComplete="false"
                            key="5"
                            label="再次確認密碼"
                            size="small"
                            type="password"
                            name="matchPwd"
                            value={state.matchPwd}
                            onChange={(e) => validation(e)}
                            helperText={state.errMsg?.matchPwd}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {state.validMatch ? <CheckRoundedIcon color="teal" sx={{ fontWeight: "500" }} /> : ""}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </>
                )}
                {step === 5 && (
                    <>
                        <AuthHeader subtitle="讓我們算算你幾歲了。">請輸入你的出生年月日</AuthHeader>
                        <StyledTextField
                            autoComplete="false"
                            label=""
                            size="small"
                            type="date"
                            name="birth_date"
                            value={state.birth_date}
                            onChange={(e) => dispatch({ type: "birthInput", birth_date: e.target.value })}
                        />
                    </>
                )}
                {step === 6 && (
                    <>
                        <RegisterSuccess />
                        <Button variant="outlined" size="large" onClick={() => navigate("/login")}>
                            立即登入
                        </Button>
                    </>
                )}
                {step < 5 && <ArrowButton type="button" onClick={handleNextStep}></ArrowButton>}
                {step < 5 && step > 1 && (
                    <Button type="button" onClick={handlePrevStep} sx={{ position: "absolute", bottom: 0, left: 0 }}>
                        上一步
                    </Button>
                )}
                {step === 5 && <ArrowButton type="submit" onClick={(e) => onSubmit(e)}></ArrowButton>}
            </FlexColBox>
        </form>
    );
}

export default RegisterForm;
