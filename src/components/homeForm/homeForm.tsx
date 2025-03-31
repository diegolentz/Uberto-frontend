import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormDriver, } from "../../domain/driver";
import { FormPassenger } from "../../domain/passenger";
import { estilosInput } from "./homeFormStyles";


type HomeFormProps = {
    fetchData: (info: FormDriver | FormPassenger) => void;
};

export type FormValues = {
    name: string;
    origin: string;
    destination: string;
    date: Date;
    passengers: number;
};

export const HomeForm = ({ fetchData }: HomeFormProps) => {
    const isDriver = sessionStorage.getItem("isDriver") === "true"

    const form = useForm<FormValues>({
        defaultValues: {
            name: "",
            origin: "",
            destination: "",
            date: new Date(),
            passengers: 1,
        },
        mode: "onChange"
    });

    const { register, handleSubmit, formState, setValue } = form;
    const { errors } = formState;

    const onsubmit = () => {
        if (isDriver) {
            const data = new FormDriver(
                form.getValues().name,
                form.getValues().origin,
                form.getValues().destination,
                form.getValues().passengers,

            );
            fetchData(data)

        } else {
            const data = new FormPassenger(
                form.getValues().origin,
                form.getValues().destination,
                form.getValues().date,
                form.getValues().passengers,
            );
            console.log(data.date)
            fetchData(data)
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
                        {...register("name", {
                            required: "name is required",
                            pattern: {
                                value: /^[A-Za-z\s]{3,30}$/,
                                message:
                                    "Name must only contain letters 3 - 25 characters",
                            },
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                )}
                <TextField
                    size="small"
                    label="Origin"
                    type="text"
                    sx={estilosInput}
                    {...register("origin", {
                        required: "Origin is required",
                        pattern: {
                            value: /^[A-Za-z0-9.\s]{3,}$/,
                            message: "Destination must only contain letters, numbers, and periods with a minimum of 3 characters",
                        },
                    })}
                    error={!!errors.origin}
                    helperText={errors.origin?.message}
                />

                <TextField
                    size="small"
                    label="Destination"
                    type="text"
                    sx={estilosInput}
                    {...register("destination", {
                        required: "destination is required",
                        pattern: {
                            value: /^[A-Za-z0-9.\s]{3,}$/,
                            message: "Destination must only contain letters, numbers, and periods with a minimum of 3 characters",
                        },
                    })}
                    error={!!errors.destination}
                    helperText={errors.destination?.message}
                />

                {!isDriver && (
                    <TextField
                        size="small"
                        label="Date"
                        type="datetime-local"
                        sx={estilosInput}
                        slotProps={{
                            inputLabel: { shrink: true },
                            htmlInput: {
                                max: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().slice(0, 16),
                                min: new Date(new Date().setMonth(new Date().getMonth())).toISOString().slice(0, 16)
                            }
                        }}

                        {...register("date", {
                            required: "Date is required",
                            validate: (value) => {
                                const selectedDate = new Date(value);
                                const currentDate = new Date();
                                const maxDate = new Date();
                                maxDate.setMonth(maxDate.getMonth() + 3);

                                const year = selectedDate.getFullYear();
                                if (year < 1000 || year > 9999) {

                                    return "Year must be 4 digits";

                                }
                                if (selectedDate < currentDate) {
                                    return "Date cannot be earlier than today";
                                }
                                if (selectedDate > maxDate) {
                                    return "Date cannot be more than 3 months from today";
                                }
                            },
                        })}

                        error={!!errors.date}
                        helperText={errors.date?.message}
                    />
                )}

                <TextField size="small"
                    label="Number of passengers"
                    sx={estilosInput}
                    select

                    error={!!errors.passengers}
                    helperText={errors.passengers?.message}
                    defaultValue={form.getValues().passengers}
                >
                    {[1, 2, 3, 4].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ background: "#a737fc" }}

                >
                    Filter
                </Button>
            </Stack>
        </form>
    );
}
