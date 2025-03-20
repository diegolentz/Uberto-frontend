import { Box, Button, styled } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { tryLogin } from "../services/login.service";
import { useEffect } from "react";
import { InputTextField } from "../components/inputs/textInput";
import { useNavigate } from "react-router-dom";

const LoginFormContainerBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
    height: '100vh',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light
}));

type Inputs = {
    username: string,
    password: string
};

export const Login = () => {
    const { register, handleSubmit, formState: { errors, touchedFields }, setError } = useForm<Inputs>({ criteriaMode: 'all' });
    const navigate = useNavigate()


    const onSubmit: SubmitHandler<Inputs> = async data => {
        await tryLogin(data) ? goHome() : console
    };

    
    function goHome(){
        navigate("/Home")
    }
    const types = {
        required: "This is required",
        minLength: "MIN length of ",
        maxLength: "MAX length of "
    }

    useEffect(() => {
        setError('username', {types})
        setError('password', {types})
    }, [setError])
    
    return <>

        <LoginFormContainerBox>
            <h1 style={{ color: '#ba68c8' }}>UBERTO</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <InputTextField
                    register={register} name="username"
                    minLength={5} maxLength={20}
                    required={true} error={errors.username}
                    touched={touchedFields.username}
                />

                <InputTextField
                    register={register} name="password"
                    minLength={5} maxLength={20}
                    required={true} error={errors.password}
                    touched={touchedFields.password}
                />

                <StyledButton type="submit" variant="contained">Log in</StyledButton>
            </form>
        </LoginFormContainerBox>
    </>
};