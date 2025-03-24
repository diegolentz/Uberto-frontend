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
    // const id = parseInt(sessionStorage.getItem('idUser')!);
    const id = 1;
    const isDriver = sessionStorage.getItem('isDriver') === 'true';
    const [profile, setProfile] = useState<DriverProfile | PassengerProfile>(isDriver ? driverProfile : passengerProfile);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setChanges = (data: any) => {
        setProfile({ ...profile, ...data });
    }


    const fetchForm = async () => {
        if (isDriver) {
            const response = await driverService.getProfile(id)
            setProfile(response);
        } else {
            const response = await passengerService.getProfile(id);
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
                <ProfileForm entity={profile} func={setChanges} id={id}/>
                <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />
                {!isDriver && (
                    <>
                        <MoneyForm money={(profile as PassengerProfile).money} id={id} func={setChanges} />
                        <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />
                        <FriendsComponent friends={(profile as PassengerProfile).friends} id={id} />
                    </>
                )}
            </Box>
        </>
    );
}; 