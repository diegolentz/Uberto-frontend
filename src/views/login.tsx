import { Box, styled, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { tryLogin } from "../services/login.service";

const LoginFormContainerBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
}));

const StyledInputController = styled(TextField)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
}));

type Inputs = {
    username: string,
    password: string,
};


export const Login = () => {
    const { register, handleSubmit, watch, formState:{errors, touchedFields}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
        tryLogin()
    };
    console.log(touchedFields)
    const INPUT_MAX_LENGTH = 20
    const INPUT_MIN_LENGTH = 5
    return <>

        <LoginFormContainerBox>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                />
                {errors.username?.type === 'required' &&
                    <p role="alert">Username is required</p>
                }
                {errors.username?.type === 'maxLength' &&
                    <p role="alert">Max lenght of {INPUT_MAX_LENGTH}</p>
                }
                {errors.username?.type === 'maxLength' &&
                    <p role="alert">Max lenght of {INPUT_MAX_LENGTH}</p>
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
                />
                {errors.password?.type === 'required' &&
                    <p role="alert">Password required</p>
                }
                {errors.password?.type === 'maxLength' &&
                    <p role="alert">Max lenght of {INPUT_MAX_LENGTH}</p>
                }

                <input type="submit" />
            </form>
        </LoginFormContainerBox>
    </>
};