import { Box, Button, Divider, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { DriverProfile, driverProfileMock, UserProfile, userProfileMock } from "../../domain/profile"
import { estilosInput } from "../homeForm/homeFormStyles"
import { brandModelStyle } from "../card-viajes/cardDriverStyle"

export const Data = () => {
    const [isDriver, setIsDriver] = useState<Boolean>(true)

    const [profile, setProfile] = useState<DriverProfile | UserProfile>(
        isDriver ? driverProfileMock : userProfileMock
    );
    const [addMoney, setAddMoney] = useState<number>(0.0)

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Validar un campo individualmente
    const validateField = (name: string, value: string) => {
        let error = "";

        if (name === "name" || name === "lastname" || name === "brand") {
            if (!value.trim()) {
                error = "Este campo es obligatorio.";
            } else if (!/^[A-Za-z\s]+$/.test(value)) {
                error = "Solo se permiten letras.";
            } else if (value.length < 3 || value.length > 15) {
                error = "Debe tener entre 3 y 15 caracteres.";
            }
        } else if (name === "price" && isDriver) {
            if (!value || Number(value) <= 0) {
                error = "Debe ser un número positivo.";
            }
        } else if (name === "phone" && !isDriver) {
            if (!/^\d{10}$/.test(value)) {
                error = "Debe tener 10 dígitos numéricos.";
            }
        } else if (name === "domain" && isDriver) {
            if (!value.trim()) {
                error = "Este campo es obligatorio.";
            } else if (!/^[A-Za-z0-9\s]+$/.test(value)) {
                error = "Solo se permiten letras y números.";
            } else if (value.length < 6 || value.length > 7) {
                error = "Debe tener entre 6 y 7 caracteres.";
            }
        } else if (name === "model" && isDriver) {
            if (!value || Number(value) < 1990 || Number(value) > 2025) {
                error = "Debe estar entre 1990 y 2025.";
            }
        }

        return error;
    };

    // Validar todo el formulario antes de enviar
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        for (const [key, value] of Object.entries(profile)) {
            const error = validateField(key, String(value));
            if (error) {
                newErrors[key] = error;
            }
        }

        setErrors(newErrors);
        return Object.length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        // Realizar la validación del formulario
        e.preventDefault();
        if (!validateForm()) {
            console.log("El formulario contiene errores.", errors);
            // return;
        }else{
            // Si el formulario es válido, puedes realizar la acción de enviar el formulario
            console.log("Formulario válido:", profile);

        }
        
    };
    
    // Manejar cambios y validaciones
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);

        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: name === "price" || name === "phone" ? Number(value) : value,
        }));

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };


    return (
        <>
            <Box sx={{ margin: '1rem 1rem 4rem 1rem' }}>
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', justifyContent: 'center', height: 'auto', margin: '1rem ' }}>
                    <Stack spacing={2} width={'80vw'} >

                        <TextField
                            size="small"
                            label="Name"
                            type="text"
                            name="name"
                            sx={estilosInput}
                            value={profile.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            size="small"
                            label="Last Name"
                            type="text"
                            name="lastname"
                            sx={estilosInput}
                            value={profile.lastname}
                            onChange={handleChange}
                            error={!!errors.lastname}
                            helperText={errors.lastname}
                        />
                        {isDriver ? (
                            <>
                                <TextField
                                    size="small"
                                    label="Base price"
                                    type="number"
                                    name="price"
                                    sx={estilosInput}
                                    value={isDriver && 'price' in profile ? profile.price : ''}
                                    onChange={handleChange}
                                    error={!!errors.price}
                                    helperText={errors.price}
                                />

                                <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />
                                <p>Automovilista Premiun</p>
                                <TextField
                                    size="small"
                                    label="Domain"
                                    type="text"
                                    name="domain"
                                    sx={estilosInput}
                                    value={isDriver && 'price' in profile ? profile.domain : ''}
                                    onChange={handleChange}
                                    error={!!errors.domain}
                                    helperText={errors.domain}
                                />
                                <TextField
                                    size="small"
                                    label="Brand"
                                    type="text"
                                    name="brand"
                                    sx={estilosInput}
                                    value={isDriver && 'price' in profile ? profile.brand : ''}
                                    onChange={handleChange}
                                    error={!!errors.brand}
                                    helperText={errors.brand}
                                />
                                <TextField
                                    size="small"
                                    label="Model"
                                    type="number"
                                    name="model"
                                    sx={estilosInput}
                                    value={isDriver && 'price' in profile ? profile.model : ''}
                                    onChange={handleChange}
                                    error={!!errors.model}
                                    helperText={errors.model}
                                />
                            </>

                        ) : (
                            <>
                                <TextField
                                    size="small"
                                    label="Phone"
                                    type="number"
                                    name="phone"
                                    sx={estilosInput}
                                    value={'phone' in profile ? profile.phone : ''}
                                    onChange={handleChange}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                />

                            </>
                        )}

                        <Button type="submit" variant="contained" color="secondary">Save</Button>


                    </Stack>
                </form>

                {!isDriver && (
                    <>
                        <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />

                        <Stack direction="column" spacing={1} alignItems="center" margin="1rem">
                            <Box sx={{ fontWeight: 'bold' }}>
                                <p>Cash $
                                    {'money' in profile ? profile.money : 0} </p>
                            </Box>

                            <form noValidate style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 'auto', margin: '1rem', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
                                <TextField
                                    size="small"
                                    label="Add money"
                                    type="number"
                                    sx={estilosInput}
                                    value={addMoney === 0 ? '' : addMoney}
                                    onChange={(e) => setAddMoney(Number(e.target.value))}
                                />
                                <Button type="submit" variant="contained" color="secondary">Save Money</Button>
                            </form>
                        </Stack>


                    </>
                )}
            </Box>
        </>
    )
}