import { Box, Divider } from "@mui/material";
import { useContext, useEffect, useState } from "react";
// Removed unused import of useForm
import { AxiosError } from "axios";
import { DriverProfile } from "../../domain/driver";
import { passengerProfile, PassengerProfile } from "../../domain/passenger";
import { driverService } from "../../services/driver.service";
import { passengerService } from "../../services/passenger.service";
import { FriendsComponent } from "../friends/friends";
import { MoneyForm } from "../profileForm/moneyForm";
import { ProfileForm } from "../profileForm/profileForm";
import { msjContext } from "../viewLayout/viewLayout";

export const Data = () => {
    const id = parseInt(sessionStorage.getItem('userId')!);
    const isDriver = sessionStorage.getItem('role') === 'driver';
    const [profile, setProfile] = useState<DriverProfile | PassengerProfile>(isDriver ? {} as DriverProfile : {} as PassengerProfile);
    const { showToast } = useContext(msjContext)

    const setChanges = (data: any) => {
        setProfile({ ...profile, ...data });
    }
    const fetchForm = async () => {
        try {
            if (isDriver) {
                const response = await driverService.getProfile(id);
                // console.log(response);
                setProfile(response);
            } else {
                const response = await passengerService.getProfile(id);
                console.log(response);
                setProfile(response);
            }
        } catch (e: unknown) {
            showToast((e as AxiosError<unknown>).response!);
        }
    };



    useEffect(() => {
        fetchForm();
    }, []);


    return (
        <>
            <Box sx={{ padding: '2rem 1rem 3rem 1rem' }}>
                <ProfileForm entity={profile} func={setChanges} />
                <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />
                {!isDriver && (
                    <>
                        <MoneyForm money={(profile as PassengerProfile).money} id={id} func={setChanges} />
                        <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />
                        <FriendsComponent id={id} />
                    </>
                )}
            </Box>
        </>
    );
};

