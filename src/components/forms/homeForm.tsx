import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormDriver } from "../../domain/driver";
import { FormPassenger } from "../../domain/passenger";
import { estilosInput } from "../../utils/homeFormStyles";

type HomeFormProps = {
    fetchData: (info: FormDriver | FormPassenger) => void;
    stateInit: FormValues;
};

export type FormValues = {
    name: string;
    origin: string;
    destination: string;
    date: string; // Debe ser string para el formato ISO
    numberPassengers: number; // Cambiar a `numberPassengers` para consistencia

    
};

export const HomeForm = ({ fetchData, stateInit }: HomeFormProps) => {
    const isDriver = localStorage.getItem("isDriver") === "true";

    const form = useForm<FormValues>({
        defaultValues: stateInit, // Inicialización
        mode: "all",
    });

    const { register, handleSubmit, formState, setValue, reset } = form;
    const { errors } = formState;

    // Usar useEffect para actualizar el formulario cuando stateInit cambie
    useEffect(() => {
        reset(stateInit); // Actualiza los valores del formulario
    }, [stateInit, reset]);

    const onsubmit = () => {
        if (isDriver) {
            const data = new FormDriver(
                form.getValues().name,
                form.getValues().origin,
                form.getValues().destination,
                form.getValues().numberPassengers // Usar `numberPassengers`
            );
            fetchData(data);
        } else {
            const data = new FormPassenger(
                form.getValues().origin,
                form.getValues().destination,
                form.getValues().date,
                form.getValues().numberPassengers // Usar `numberPassengers`
            );
            fetchData(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(onsubmit)} noValidate>
            <Stack spacing={2} width={"90vw"} margin={"1rem"}>
                {isDriver && (
                    <TextField
                        size="small"
                        label="Name"
                        type="text"
                        sx={estilosInput}
                        InputLabelProps={{ shrink: true }}
                        {...register("name", {
                            required: "Name is required",
                            pattern: {
                                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{3,30}$/,
                                message: "Name must only contain letters, 3-30 characters",
                            },
                        })}
                        value={form.watch("name")}
                        onChange={(e) => setValue("name", e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                )}
                <TextField
                    size="small"
                    label="Origin"
                    type="text"
                    sx={estilosInput}
                    InputLabelProps={{ shrink: true }}
                    {...register("origin", {
                        required: "Origin is required",
                        pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9\s.]{3,30}$/,
                            message:
                                "Origin must only contain letters, spaces, and periods, 3-30 characters",
                        },
                    })}
                    value={form.watch("origin")}
                    onChange={(e) => setValue("origin", e.target.value)}
                    error={!!errors.origin}
                    helperText={errors.origin?.message}
                />
                <TextField
                    size="small"
                    label="Destination"
                    type="text"
                    sx={estilosInput}
                    InputLabelProps={{ shrink: true }}
                    {...register("destination", {
                        required: "Destination is required",
                        pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9\s.]{3,30}$/,
                            message:
                                "Destination must only contain letters, numbers, spaces, and periods, 3-30 characters",
                        },
                    })}
                    value={form.watch("destination")}
                    onChange={(e) => setValue("destination", e.target.value)}
                    error={!!errors.destination}
                    helperText={errors.destination?.message}
                />
                {!isDriver && (
                    <TextField
                        size="small"
                        label="Date"
                        type="datetime-local"
                        sx={estilosInput}
                        InputLabelProps={{ shrink: true }}
                        {...register("date", {
                            required: "Date is required",
                            validate: (value) => {
                                const selectedDate = new Date(value);
                                const currentDate = new Date();
                                const maxDate = new Date();
                                maxDate.setMonth(maxDate.getMonth() + 3);

                                if (selectedDate < currentDate) {
                                    return "Date cannot be earlier than today";
                                }
                                if (selectedDate > maxDate) {
                                    return "Date cannot be more than 3 months from today";
                                }
                            },
                        })}
                        value={form.watch("date")}
                        onChange={(e) => setValue("date", e.target.value)}
                        error={!!errors.date}
                        helperText={errors.date?.message}
                    />
                )}
                <TextField
                    size="small"
                    label="Number of passengers"
                    sx={estilosInput}
                    select
                    {...register("numberPassengers", { required: "Select the number of passengers" })} // Usar `numberPassengers`
                    value={form.watch("numberPassengers") || ""} // Asegura que se observe el valor desde React Hook Form
                    onChange={(e) => setValue("numberPassengers", Number(e.target.value))} // Actualiza el estado
                    error={!!errors.numberPassengers}
                    helperText={errors.numberPassengers?.message}
                >
                    {[1, 2, 3, 4].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button type="submit" variant="contained" sx={{ background: "#a737fc" }}>
                    Filter
                </Button>
            </Stack>
        </form>
    );
};