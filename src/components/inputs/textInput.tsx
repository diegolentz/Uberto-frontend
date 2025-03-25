import { FunctionComponent as FC } from 'react';
import BaseInputField, { ChildrenProps } from './baseInput';


export const InputTextField: FC<ChildrenProps> = (inputProps) => {
    return (
        <BaseInputField
            {...inputProps}
            label="Username"
            type="text"
        />
    );
};