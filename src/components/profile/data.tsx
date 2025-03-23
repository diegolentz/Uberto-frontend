import { Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
// Removed unused import of useForm
import { MoneyForm } from "../profileForm/moneyForm";
import { ProfileForm } from "../profileForm/profileForm";
import { FriendsComponent } from "../friends/friends";
import { driverProfile, DriverProfile } from "../../domain/driver";
import { passengerProfile, PassengerProfile } from "../../domain/passenger";
import { driverService } from "../../services/driver.service";
import { passengerService } from "../../services/passenger.service";

export const Data = () => {
    const id = parseInt(sessionStorage.getItem('idUser')!);
    const isDriver = sessionStorage.getItem('isDriver') === 'true';
    const [profile, setProfile] = useState<DriverProfile | PassengerProfile>(isDriver ? driverProfile : passengerProfile);

    const setChanges = (data: any) => {
        setProfile({ ...profile, ...data });
    }

    //TODO: getProfile tiene harcodeado el id 1, esto hay que cambiarlo una vez funcione el login

    const fetchForm = async () => {
        if (isDriver) {
            const response = await driverService.getProfile(1)
            setProfile(response);
        } else {
            const response = await passengerService.getProfile(1);
            setProfile(response);
        };
        // Profile will be logged in the useEffect below
    }

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
                        <MoneyForm money={(profile as PassengerProfile).money} func={setChanges} />
                        <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />
                        <FriendsComponent friends={(profile as PassengerProfile).friends} />
                    </>
                )}
            </Box>
        </>
    );
}; 