import { Box, Button, Stack, TextField } from "@mui/material";
import { estilosInput } from "../../utils/homeFormStyles";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { passengerService } from "../../services/passenger.service";
import { AxiosError } from "axios";
import { msjContext } from "../viewLayout/viewLayout";

interface MoneyFormProps {
    money: number;
    func: (data: any) => void;
}

export const MoneyForm = ({ money, func }: MoneyFormProps) => {


    const { showToast } = useContext(msjContext)
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        mode: "onChange",
        defaultValues: {
            money: 0
        }
    });

    const onSubmit = async (data: { money: number }) => {
        if (!isValid) {
            console.log("Formulario con errores:", errors);
        } else {
            try {
                const response = await passengerService.addBalance(data.money);
                func({ money: money + Number(data.money) }); // Llama a func con el nuevo valor atributo : valor
                reset({ money: 0 }); // Resetea el formulario
                showToast(response);
            } catch (e: unknown) {
                showToast((e as AxiosError<unknown>).response!)
            };
        }
    }

    return (
        <>
            <Stack direction="column" spacing={1} alignItems="center" margin="1rem">
                <Box sx={{ fontWeight: 'bold' }}>
                    <p>Balance $ {money}</p>
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

