import { FunctionComponent as FC, useEffect } from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { UseFormRegister, FieldError, UseFormSetError } from 'react-hook-form';

export type ChildrenProps = {
    register: UseFormRegister<any>;
    setError: UseFormSetError<any>;
    name: string;
    error?: FieldError;
    required: boolean;
    minLength: number;
    maxLength: number;
    touched?: boolean;
}

type ParentProps = {
    label: string;
    type: string;
    endAdornment?: React.ReactNode;
}
type BaseInputFieldProps = ParentProps & ChildrenProps;


const BaseInputField: FC<BaseInputFieldProps> = (
    baseInputProps:BaseInputFieldProps
) => {
    const types = {
        required: "This is required",
        minLength: "min length of ",
        maxLength: "max length of "
    };

    useEffect(() => {
        baseInputProps.setError(baseInputProps.name, { types });
    }, [baseInputProps.setError, baseInputProps.name]);

    return (
        <>
            <FormControl variant="outlined">
                <InputLabel htmlFor={baseInputProps.name} color={baseInputProps.error ? 'error' : 'secondary'}>{baseInputProps.label}</InputLabel>
                <OutlinedInput
                    id={baseInputProps.name}
                    label={baseInputProps.label}
                    type={baseInputProps.type}
                    color={baseInputProps.error ? 'error' : 'secondary'}
                    endAdornment={baseInputProps.endAdornment}
                    {...baseInputProps.register(baseInputProps.name, {
                        required: baseInputProps.required,
                        minLength:baseInputProps.minLength,
                        maxLength:baseInputProps.maxLength
                    })}
                    error={baseInputProps.error ? (true && baseInputProps.touched) : false}
                />
            </FormControl>

            {baseInputProps.error && baseInputProps.error.type === 'required' && (
                <span style={{ color: 'crimson', fontWeight: 'bold' }}>{baseInputProps.name} required</span>
            )}
            {baseInputProps.error && baseInputProps.error.type === 'minLength' && (
                <span style={{ color: 'crimson', fontWeight: 'bold' }}>MIN length of {baseInputProps.minLength}</span>
            )}
            {baseInputProps.error && baseInputProps.error.type === 'maxLength' && (
                <span style={{ color: 'crimson', fontWeight: 'bold' }}>MAX length of {baseInputProps.maxLength}</span>
            )}
        </>
    );
};

export default BaseInputField;