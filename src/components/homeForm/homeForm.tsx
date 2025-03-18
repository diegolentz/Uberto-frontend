import { DevTool } from "@hookform/devtools";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Travel } from "../../domain/travel";

type FormValues = {
    filter: any;
    name: string;
    origin: string;
    destination: string;
    date: string;
    passengers: number;
}


export const HomeForm = ({ type,travel }: { type: Boolean ,travel : (travel: Travel)=> void }) => {
    const [isDriver, setIsDriver] = useState<Boolean>(type)
    // const {showToast} = useContext(msjContext)

    
    const form = useForm<FormValues>({
        defaultValues: {
            name: '',
            origin: '',
            destination: '',
            date: '',
            passengers: 0
        },
        mode: 'onChange'
    })
    const { register, handleSubmit, formState, control } = form
    const { errors } = formState

    const onsubmit = () => {
        console.log(form.getValues())
        const viaje = new Travel(
            form.getValues().name,
            form.getValues().name,
            form.getValues().origin,
            form.getValues().destination,
            form.getValues().passengers,
            new Date(form.getValues().date),
            50,
            5000
        )
        travel(viaje)
        // showToast({status:200, data:'Success'})
    };

    

    return (
        <>
            <form onSubmit={handleSubmit(onsubmit)} noValidate>
                <Stack spacing={2} width={'90vw'} margin={'1rem'}>
                    
                    {isDriver && 
                    <TextField
                        size="small"
                        label='Name'
                        type="text"
                        {...register("name", { 
                            required: "name is required",
                            pattern: {
                                value: /^[A-Za-z\s]{3,25}$/,
                                message: "Name must only contain letters 3 - 25 characters"
                            }
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    }
                    <TextField
                        size="small"
                        label='Origin'
                        type="text"
                        {...register("origin", { required: "origin is required", 
                            pattern: {
                                value: /^[A-Za-z0-9\s]{10,25}$/,
                                message: "Origin must only contain letters and numbers 10-25 characters"
                            }
                        })}
                        error={!!errors.origin}
                        helperText={errors.origin?.message}
                        />

                    <TextField
                        size="small"
                        label='Destination'
                        type="text"
                        {...register("destination", { required: "destination is required",
                            pattern: {
                                value: /^[A-Za-z0-9\s]{10,25}$/,
                                message: "Origin must only contain letters and numbers 10-25 characters"
                            }
                         })}
                        error={!!errors.destination}
                        helperText={errors.destination?.message}
                    />

                    {!isDriver && (
                        <TextField
                            size="small"
                            label="Date"
                            type="date"
                            slotProps={{ inputLabel: { shrink: true } }}
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
                                    return true;
                                }
                            })}
                            error={!!errors.date}
                            helperText={errors.date?.message}
                            
                        />
                    )}
                    <TextField
                        size="small"
                        label='Number of passengers'
                        type="number" {...register("passengers", {
                            required: "Number of passengers is required",
                            min: { value: 1, message: "Must be greater than 0" }
                        })}
                        error={!!errors.passengers}
                        helperText={errors.passengers?.message}
                    />
                        <Button type="submit" variant="contained" sx={{background: '#a737fc'}}>Filter</Button>
                </Stack>
            </form>
            <DevTool control={control} />

        </>

    )


}
