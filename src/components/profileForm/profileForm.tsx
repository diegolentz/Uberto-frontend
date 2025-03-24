import { Button, Divider, Stack, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { estilosInput } from "../homeForm/homeFormStyles";
import { DriverProfile } from "../../domain/driver";
import { PassengerProfile } from "../../domain/passenger";
import { passengerService } from "../../services/passenger.service";
import { msjContext } from "../viewLayout/viewLayout";
import { AxiosError } from "axios";

interface ProfileFormProps {
    id: number;
    entity: DriverProfile | PassengerProfile;
    func: (data: unknown) => void;
}


export const ProfileForm = ({ entity, func, id }: ProfileFormProps) => {
    const isDriver = sessionStorage.getItem('isDriver') === 'true';
    const [profile, setProfile] = useState<DriverProfile | PassengerProfile>(entity);
    const { showToast } = useContext(msjContext)
    const setChanges = (data: unknown) => {
        func(data);

    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "onChange", // Para validar en cada cambio
        defaultValues: isDriver ? {
            firstname: (profile as DriverProfile).firstname,
            lastname: (profile as DriverProfile).lastname,
            price: (profile as DriverProfile).price,
            domain: (profile as DriverProfile).domain,
            brand: (profile as DriverProfile).brand,
            model: (profile as DriverProfile).model,
        } : {
            firstname: (profile as PassengerProfile).firstname,
            lastname: (profile as PassengerProfile).lastname,
            cellphone: (profile as PassengerProfile).phone,
        }
    });

    const onSubmit = async (data: any) => {
        if (!isValid) {
            console.log("Formulario con errores:", errors);
        }
        try {
            const response = await passengerService.updateProfile(id, data)
            showToast(response)
            setChanges(data)
        } catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!)
        };
    }


    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', justifyContent: 'center', height: 'auto', margin: '1rem ' }}>
                <Stack spacing={2} width={'80vw'}>
                    <TextField
                        size="small"
                        label="Name"
                        type="text"
                        {...register("firstname", {
                            required: "Este campo es obligatorio.",
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Solo se permiten letras.",
                            },
                            minLength: { value: 3, message: "Debe tener al menos 3 caracteres." },
                            maxLength: { value: 15, message: "Debe tener como máximo 15 caracteres." }
                        })}
                        sx={estilosInput}
                        error={!!errors.firstname}
                        helperText={typeof errors.firstname?.message === "string" ? errors.firstname.message : ""}
                    />
                    <TextField
                        size="small"
                        label="Last Name"
                        type="text"
                        {...register("lastname", {
                            required: "Este campo es obligatorio.",
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Solo se permiten letras.",
                            },
                            minLength: { value: 3, message: "Debe tener al menos 3 caracteres." },
                            maxLength: { value: 15, message: "Debe tener como máximo 15 caracteres." }
                        })}
                        sx={estilosInput}
                        error={!!errors.lastname}
                        helperText={typeof errors.lastname?.message === "string" ? errors.lastname.message : ""}
                    />
                    {isDriver ? (
                        <>
                            <TextField
                                size="small"
                                label="Base price"
                                type="number"
                                {...register("price", {
                                    required: "Este campo es obligatorio.",
                                    valueAsNumber: true,
                                    validate: value => Number.isInteger(value) || "Debe ser un número entero.",
                                    min: { value: 100, message: "Debe ser un número entero positivo y mayor a 100." }
                                })}
                                sx={estilosInput}
                                error={!!errors.price}
                                helperText={typeof errors.price?.message === "string" ? errors.price.message : ""}
                            />
                            <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />
                            <p>Automovilista Premium</p>
                            <TextField
                                size="small"
                                label="Domain"
                                type="text"
                                {...register("domain", {
                                    required: "Este campo es obligatorio.",
                                    pattern: {
                                        value: /^[A-Za-z0-9\s]+$/,
                                        message: "Solo se permiten letras y números.",
                                    },
                                    minLength: { value: 6, message: "Debe tener al menos 6 caracteres." },
                                    maxLength: { value: 7, message: "Debe tener como máximo 7 caracteres." }
                                })}
                                sx={estilosInput}
                                error={!!errors.domain}
                                helperText={typeof errors.domain?.message === "string" ? errors.domain.message : ""}
                            />
                            <TextField
                                size="small"
                                label="Brand"
                                type="text"
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
                                helperText={typeof errors.brand?.message === "string" ? errors.brand.message : undefined}
                            />
                            <TextField
                                size="small"
                                label="Model"
                                type="number"
                                {...register("model", {
                                    required: "Este campo es obligatorio.",
                                    valueAsNumber: true,
                                    validate: value => Number.isInteger(value) || "Debe ser un número entero.",
                                    min: { value: 1990, message: "Debe estar entre 1990 y 2025." },
                                    max: { value: 2025, message: "Debe estar entre 1990 y 2025." }
                                })}
                                sx={estilosInput}
                                error={!!errors.model}
                                helperText={typeof errors.model?.message === "string" ? errors.model.message : undefined}
                            />
                        </>
                    ) : (
                        <>
                            <TextField
                                size="small"
                                label="Phone"
                                type="number"
                                {...register("cellphone", {
                                    required: "Este campo es obligatorio.",
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Debe tener 10 dígitos numéricos."
                                    }
                                })}
                                sx={estilosInput}
                                error={!!errors.cellphone}
                                helperText={typeof errors.cellphone?.message === "string" ? errors.cellphone.message : undefined}
                            />
                        </>
                    )}

                    <Button type="submit" variant="contained" color="secondary" disabled={!isValid}>
                        Save
                    </Button>
                </Stack>
            </form>

        </>
    )

}