import { Box, Input, styled, TextField } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

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
    example: string,
    exampleRequired: string,
};

export const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const { control } = useForm({defaultValues:{firstName:''}});
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    
    return <>

        <LoginFormContainerBox>
            <form onSubmit={handleSubmit(onSubmit)}>
                <StyledInputController
                    label='mock'
                    // className="materialUIInput"
                />

                {/* register your input into the hook by invoking the "register" function */}

                {/* <input defaultValue="test" {...register("example")} /> */}

                {/* include validation with required or other standard HTML validation rules */}
                {/* <input {...register("exampleRequired", { required: true })} /> */}
                {/* errors will return when field validation fails  */}
                {/* {errors.exampleRequired && <span>This field is required</span>} */}

                <input type="submit" />
            </form>
        </LoginFormContainerBox>
    </>
};  