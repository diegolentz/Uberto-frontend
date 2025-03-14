import { DevTool } from "@hookform/devtools"
import { Stack, TextField, Button } from "@mui/material"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { msjContext } from "../viewLayout/viewLayout";

type FormValues = {
    name: string;
    origin: string;
    destination: string;
    date: string;
    passengers: number;
}


export const HomeForm = ({ type }: { type: Boolean }) => {
    const [isDriver, setIsDriver] = useState<Boolean>(type)
    // const {showToast} = useContext(msjContext)

    const form = useForm<FormValues>({
        defaultValues: {
            name: '',
            origin: '',
            destination: '',
            date: '',
            passengers: 0
        }
    })
    const { register, handleSubmit, formState, control } = form
    const { errors } = formState


    const onsubmit = (data: FormValues) => {
        console.log(data)
        // showToast({status:200, data:'Success'})
    };



    return (
        <>
            <form onSubmit={handleSubmit(onsubmit)} noValidate>
                <Stack spacing={2} width={'90vw'} margin={'1rem'}>
                    {isDriver && <TextField
                        size="small"
                        label='Name'
                        type="text"
                        {...register("name", { required: "name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    }
                    <TextField
                        size="small"
                        label='Origin'
                        type="origin"
                        {...register("origin", { required: "origin is required" })}
                        error={!!errors.origin}
                        helperText={errors.origin?.message}
                    />

                    <TextField
                        size="small"
                        label='Destination'
                        type="text"
                        {...register("destination", { required: "destination is required" })}
                        error={!!errors.destination}
                        helperText={errors.destination?.message}
                    />

                    {!isDriver && (
                        <TextField
                            size="small"
                            label="Date"
                            type="date"
                            slotProps={{ inputLabel: { shrink: true } }}
                            {...register("date", { required: "Date is required" })}
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

                    <Button type="submit" variant="contained" color="primary">Filter</Button>
                </Stack>
            </form>
            <DevTool control={control} />

        </>

    )


}

function useContext(msjContext: any): { showToast: any; } {
    throw new Error("Function not implemented.");
}
