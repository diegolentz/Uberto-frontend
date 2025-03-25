import { FunctionComponent as FC, useState } from 'react';
import BaseInputField, { ChildrenProps } from './baseInput.tsx';
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';


export const InputTextSecretField: FC<ChildrenProps> = (inputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const endAdornment = (
        <InputAdornment position="end">
            <IconButton
                // aria-label={showPassword ? 'hide password' : 'show password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    );

    return (
        <BaseInputField
            {...inputProps}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={endAdornment}
        />
    );
};
