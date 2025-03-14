import { Box, Button, styled, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { tryLogin } from "../services/login.service";

const LoginFormContainerBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection:'column',
    gap:theme.spacing(5),
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
}));

const StyledInputController = styled(TextField)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light
}));

type Inputs = {
    username: string,
    password: string,
};


export const Login = () => {
    const { register, handleSubmit, formState:{errors, touchedFields}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        // console.log(data)
        tryLogin(data)
    };
    // console.log(touchedFields)
    const INPUT_MAX_LENGTH = 20
    const INPUT_MIN_LENGTH = 5
    return <>

        <LoginFormContainerBox>
            <h1 style={{color:'#ba68c8'}}>UBERTO</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                <StyledInputController
                    {...register(
                        "username",
                        {
                            required: true,
                            minLength: INPUT_MIN_LENGTH,
                            maxLength: INPUT_MAX_LENGTH
                        }
                    )}
                    aria-invalid={errors.username ? "true" : "false"}
                    label='Username'
                    color="secondary"
                />
                {errors.username?.type === 'required' &&
                    <p role="alert">Username is required</p>
                }
                {errors.username?.type === 'maxLength' &&
                    <p role="alert">Max lenght of {INPUT_MAX_LENGTH}</p>
                }
                {errors.username?.type === 'minLength' &&
                    <p role="alert">Min lenght of {INPUT_MIN_LENGTH}</p>
                }

                <StyledInputController
                    {...register(
                        "password",
                        {
                            required: true,
                            minLength: INPUT_MIN_LENGTH,
                            maxLength: INPUT_MAX_LENGTH
                        }
                    )}
                    aria-invalid={errors.password ? "true" : "false"}
                    label='Password'
                    color="secondary"
                />
                {errors.password?.type === 'required' &&
                    <p role="alert">Password required</p>
                }
                {errors.password?.type === 'maxLength' &&
                    <p role="alert">Max lenght of {INPUT_MAX_LENGTH}</p>
                }
                {errors.password?.type === 'minLength' &&
                    <p role="alert">Min lenght of {INPUT_MIN_LENGTH}</p>
                }

                <StyledButton type="submit" variant="contained">Log in</StyledButton>
            </form>
        </LoginFormContainerBox>
    </>
};