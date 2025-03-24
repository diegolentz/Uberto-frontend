import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputTextField } from "../components/inputs/textInput";
import { tryLogin } from "../services/login.service";
import { useToast } from "../hooks/toast/useToast";
import { loginRequest } from "../domain/login";
import { LoginFormContainerBox, StyledButton } from "../utils/loginStyles";

export const Login = () => {
    const {
        register, handleSubmit,
        formState: { errors, touchedFields },
        setError
    } = useForm<loginRequest>({ criteriaMode: 'all' });
    const navigate = useNavigate()
    const toast = useToast()

    const onSubmit: SubmitHandler<loginRequest> = async data => {
        try {
            await tryLogin(data);
            navigate("/Home");
            toast.open('Login succesfull', 'success')
        } catch (error:any) {
            toast.open(error.response.data.message, 'error')
        }
    };
    
    return <>

        <LoginFormContainerBox>
            <h1 style={{ color: '#ba68c8' }}>UBERTO</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <InputTextField
                    register={register} name="username" setError={setError}
                    minLength={2} maxLength={20}
                    required={true} error={errors.username}
                    touched={touchedFields.username}
                />

                <InputTextField
                    register={register} name="password" setError={setError}
                    minLength={2} maxLength={20}
                    required={true} error={errors.password}
                    touched={touchedFields.password}
                />

                <StyledButton type="submit" variant="contained">Log in</StyledButton>
            </form>
        </LoginFormContainerBox>
    </>
};