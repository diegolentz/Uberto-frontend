import { Button, Divider, Stack, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { estilosInput } from "../homeForm/homeFormStyles";
import { DriverProfile } from "../../domain/driver";
import { PassengerProfile } from "../../domain/passenger";
import { msjContext } from "../viewLayout/viewLayout";
import { AxiosError } from "axios";
import { driverService } from "../../services/driver.service";
import { passengerService } from "../../services/passenger.service";

interface ProfileFormProps {
    entity: DriverProfile | PassengerProfile;
    func: (data: unknown) => void;
}

export const ProfileForm = ({ entity, func }: ProfileFormProps) => {
    const isDriver = sessionStorage.getItem('role') === 'driver';
    const { showToast } = useContext(msjContext);
    const [form, setForm] = useState<DriverProfile | PassengerProfile | null>(entity);

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        mode: "all",
        defaultValues: entity,
    });

    const onSubmit = async (data: any) => {
        if (!isValid) {
            console.log("Formulario con errores:", errors);
        }
        try {
            if (isDriver) {
                const response = await driverService.updateProfile({ ...data });
                console.log(response);
                showToast(response);
            } else {
                const response = await passengerService.updateProfile({ ...data });
                console.log("entre nomas" + response);
                showToast(response);
            }
            func(data);
        } catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!);
        }
    };

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', justifyContent: 'center', height: 'auto', margin: '1rem ' }}
        >
            <Stack spacing={2} width={'80vw'}>
                <TextField
                    size="small"
                    label="Name"
                    type="text"
                    defaultValue={entity.firstName}
                    {...register("firstName", {
                        required: "Este campo es obligatorio.",
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Solo se permiten letras.",
                        },
                        minLength: { value: 3, message: "Debe tener al menos 3 caracteres." },
                        maxLength: { value: 15, message: "Debe tener como máximo 15 caracteres." }
                    })}
                    sx={estilosInput}
                    error={!!errors.firstName}
                    slotProps={{ inputLabel: { shrink: true } }}
                    helperText={typeof errors.firstName?.message === "string" ? errors.firstName.message : ""}
                />
                <TextField
                    size="small"
                    label="Last Name"
                    type="text"
                    defaultValue={entity.lastName}
                    {...register("lastName", {
                        required: "Este campo es obligatorio.",
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Solo se permiten letras.",
                        },
                        minLength: { value: 3, message: "Debe tener al menos 3 caracteres." },
                        maxLength: { value: 15, message: "Debe tener como máximo 15 caracteres." }
                    })}
                    sx={estilosInput}
                    error={!!errors.lastName}
                    slotProps={{ inputLabel: { shrink: true } }}
                    helperText={typeof errors.lastName?.message === "string" ? errors.lastName.message : ""}
                />
                {isDriver ? (
                    <>
                        <TextField
                            size="small"
                            label="Base price"
                            type="number"
                            defaultValue={(entity as DriverProfile).price}
                            {...register("price", {
                                required: "Este campo es obligatorio.",
                                valueAsNumber: true,
                                validate: value => Number.isInteger(value) || "Debe ser un número entero.",
                                min: { value: 100, message: "Debe ser un número entero positivo y mayor a 100." }
                            })}
                            sx={estilosInput}
                            error={!!errors.price}
                            slotProps={{ inputLabel: { shrink: true } }}
                            helperText={typeof errors.price?.message === "string" ? errors.price.message : ""}
                        />
                        <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />
                        <p>Automovilista Premium</p>
                        <TextField
                            size="small"
                            label="Domain"
                            type="text"
                            defaultValue={(entity as DriverProfile).serial}
                            {...register("serial", {
                                required: "Este campo es obligatorio.",
                                pattern: {
                                    value: /^[A-Za-z0-9\s]+$/,
                                    message: "Solo se permiten letras y números.",
                                },
                                minLength: { value: 6, message: "Debe tener al menos 6 caracteres." },
                                maxLength: { value: 7, message: "Debe tener como máximo 7 caracteres." }
                            })}
                            sx={estilosInput}
                            error={!!errors.serial}
                            slotProps={{ inputLabel: { shrink: true } }}
                            helperText={typeof errors.serial?.message === "string" ? errors.serial.message : ""}
                        />
                        <TextField
                            size="small"
                            label="Brand"
                            type="text"
                            defaultValue={(entity as DriverProfile).brand}
                            {...register("brand", {
                                required: "Este campo es obligatorio.",
                                pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: "Solo se permiten letras.",
                                },
                                minLength: { value: 3, message: "Debe tener al menos 3 caracteres." },
                                maxLength: { value: 15, message: "Debe tener como máximo 15 caracteres." }
                            })}
                            sx={estilosInput}
                            error={!!errors.brand}
                            slotProps={{ inputLabel: { shrink: true } }}
                            helperText={typeof errors.brand?.message === "string" ? errors.brand.message : ""}
                        />
                        <TextField
                            size="small"
                            label="Model"
                            type="number"
                            defaultValue={(entity as DriverProfile).model}
                            {...register("model", {
                                required: "Este campo es obligatorio.",
                                valueAsNumber: true,
                                validate: value => Number.isInteger(value) || "Debe ser un número entero.",
                                min: { value: 1990, message: "Debe estar entre 1990 y 2025." },
                                max: { value: 2025, message: "Debe estar entre 1990 y 2025." }
                            })}
                            sx={estilosInput}
                            error={!!errors.model}
                            slotProps={{ inputLabel: { shrink: true } }}
                            helperText={typeof errors.model?.message === "string" ? errors.model.message : ""}
                        />
                    </>
                ) : (
                    <TextField
                        size="small"
                        label="Phone"
                        type="number"
                        defaultValue={(entity as PassengerProfile).phone}
                        {...register("cellphone", {
                            required: "Este campo es obligatorio.",
                            pattern: {
                                value: /^\d{10}$/,
                                message: "Debe tener 10 dígitos numéricos."
                            }
                        })}
                        sx={estilosInput}
                        error={!!errors.cellphone}
                        slotProps={{ inputLabel: { shrink: true } }}
                        helperText={typeof errors.cellphone?.message === "string" ? errors.cellphone.message : ""}
                    />
                )}
                <Button type="submit" variant="contained" color="secondary" disabled={!isValid}>
                    Save
                </Button>
            </Stack>
        </form>
    );
};
