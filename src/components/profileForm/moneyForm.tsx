import { Box, Button, Stack, TextField } from "@mui/material";
import { estilosInput } from "../homeForm/homeFormStyles";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

interface MoneyFormProps {
    money: number;
    func: (data: any) => void;
}

export const MoneyForm = ({ money, func }: MoneyFormProps) => {

    
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        mode: "onChange",
        defaultValues: {
            money: 0
        }
    });

    const onSubmit = (data: { money: number }) => {
        if (!isValid) {
            console.log("Formulario con errores:", errors);
        } else {
            const add = Number(data.money);
            const updatedMoney = money + add; 
            func({ money: updatedMoney }); // Llama a func con el nuevo valor atributo : valor
            reset({ money: 0 }); // Resetea el formulario
        }
    }

    useEffect(() => {
        console.log("MoneyForm: Money has been updated:", money);
    }, [money]);

    return (
        <>
            <Stack direction="column" spacing={1} alignItems="center" margin="1rem">
                <Box sx={{ fontWeight: 'bold' }}>
                    <p>Cash $ {money}</p>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 'auto', margin: '1rem', gap: '1rem' }}>
                    <TextField
                        size="small"
                        label="Add money"
                        type="number"
                        {...register("money", {
                            required: "This field is required.",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Only numbers are allowed."
                            },
                            min: {
                                value: 100,
                                message: "The minimum value is 100."
                            },
                            max: {
                                value: 10000,
                                message: "The maximum value is 10,000."
                            }
                        })}
                        sx={estilosInput}
                        error={!!errors.money}
                        helperText={errors.money?.message}
                    />
                    <Button type="submit" variant="contained" color="secondary" disabled={!isValid}>
                        Save Money
                    </Button>
                </form>
            </Stack>
        </>
    )
}
