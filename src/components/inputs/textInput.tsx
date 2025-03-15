import { FunctionComponent as FC} from 'react';
import { TextField } from '@mui/material';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface InputTextFieldProps {
    register: UseFormRegister<any>;
    name: string;
    error?: FieldError;
    required: boolean;
    minLength: number;
    maxLength: number;
    touched?:boolean
}

export const InputTextField: FC<InputTextFieldProps> = ({
    register,
    name,
    error,
    required,
    minLength,
    maxLength,
    touched,
    // color
    ...props
}) => {

    return (
        <>
            <TextField
                label={name}
                {...register(name, {
                    required: required,
                    minLength: minLength,
                    maxLength: maxLength,
                })}
                placeholder={name}
                // aria-invalid={error ? "true" : "false"}
                error={error ? (true && touched) : false}
                color="secondary"
                {...props}
            />

            {error && error.type == 'required' && (
                <span style={{color:'crimson', fontWeight:'bold'}}>{name} required</span>
            )}
            {error && error.type == 'minLength' && (
                <span style={{color:'crimson', fontWeight:'bold'}}>MIN lenght of {minLength}</span>
            )}
            {error && error.type == 'maxLength' && (
                <span style={{color:'crimson', fontWeight:'bold'}}>MAX lenght of {maxLength}</span>
            )}
        </>
    );
};
