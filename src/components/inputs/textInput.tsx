import { FunctionComponent as FC, useEffect } from 'react';
import { TextField } from '@mui/material';
import { UseFormRegister, FieldError, UseFormSetError } from 'react-hook-form';

interface InputTextFieldProps {
    register: UseFormRegister<any>;
    setError:UseFormSetError<any>;
    name: string;
    error?: FieldError;
    required: boolean;
    minLength: number;
    maxLength: number;
    touched?: boolean
}

export const InputTextField: FC<InputTextFieldProps> = (
    inputProps:InputTextFieldProps,
    ...props
) => {
    const types = {
        required: "This is required",
        minLength: "MIN length of ",
        maxLength: "MAX length of "
    }

    useEffect(() => {
        inputProps.setError(inputProps.name, { types })
    }, [inputProps.setError])

    return (
        <>
            <TextField
                label={inputProps.name}
                {...inputProps.register(inputProps.name, {
                    required: inputProps.required,
                    minLength: inputProps.minLength,
                    maxLength: inputProps.maxLength,
                })}
                placeholder={inputProps.name}
                error={inputProps.error ? (true && inputProps.touched) : false}
                color="secondary"
                {...props}
            />

            {inputProps.error && inputProps.error.type == 'required' && (
                <span style={{ color: 'crimson', fontWeight: 'bold' }}>{inputProps.name} required</span>
            )}
            {inputProps.error && inputProps.error.type == 'minLength' && (
                <span style={{ color: 'crimson', fontWeight: 'bold' }}>MIN lenght of {inputProps.minLength}</span>
            )}
            {inputProps.error && inputProps.error.type == 'maxLength' && (
                <span style={{ color: 'crimson', fontWeight: 'bold' }}>MAX lenght of {inputProps.maxLength}</span>
            )}
        </>
    );
};
