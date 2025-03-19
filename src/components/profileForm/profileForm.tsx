import { Box, Button, Divider, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DriverProfile, UserProfile } from "../../domain/profile";
import { estilosInput } from "../homeForm/homeFormStyles";

interface ProfileFormProps {
    entity: DriverProfile | UserProfile;
    rol: boolean;
    func: (data: any) => void;
}


export const ProfileForm = ({ entity, rol, func }: ProfileFormProps) => {
    const [isDriver, setIsDriver] = useState<Boolean>(rol);
    const [profile, setProfile] = useState<DriverProfile | UserProfile>(entity);

    const setChanges = (data: any) => {
        func(data);
    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "onChange", // Para validar en cada cambio
        defaultValues: isDriver ? {
            name: (profile as DriverProfile).name,
            lastname: (profile as DriverProfile).lastname,
            price: (profile as DriverProfile).price,
            domain: (profile as DriverProfile).domain,
            brand: (profile as DriverProfile).brand,
            model: (profile as DriverProfile).model,
        } : {
            name: (profile as UserProfile).name,
            lastname: (profile as UserProfile).lastname,
            phone: (profile as UserProfile).phone,
        }
    });


    const onSubmit = (data: any) => {
        if (!isValid) {
            console.log("Formulario con errores:", errors);
        }
        // setProfile(data);
        setChanges(data);
    };


    return (
        <>

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', justifyContent: 'center', height: 'auto', margin: '1rem ' }}>
                    <Stack spacing={2} width={'80vw'}>
                        <TextField
                            size="small"
                            label="Name"
                            type="text"
                            {...register("name", {
                                required: "Este campo es obligatorio.",
                                pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: "Solo se permiten letras.",
                                },
                                minLength: { value: 3, message: "Debe tener al menos 3 caracteres." },
                                maxLength: { value: 15, message: "Debe tener como máximo 15 caracteres." }
                            })}
                            sx={estilosInput}
                            error={!!errors.name}
                            helperText={typeof errors.name?.message === "string" ? errors.name.message : ""}
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
                                    {...register("phone", {
                                        required: "Este campo es obligatorio.",
                                        pattern: {
                                            value: /^\d{10}$/,
                                            message: "Debe tener 10 dígitos numéricos."
                                        }
                                    })}
                                    sx={estilosInput}
                                    error={!!errors.phone}
                                    helperText={typeof errors.phone?.message === "string" ? errors.phone.message : undefined}
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