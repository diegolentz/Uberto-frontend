import { Box, Divider } from "@mui/material";
import { useContext, useEffect, useState } from "react";
// Removed unused import of useForm
import { AxiosError } from "axios";
import { DriverProfile } from "../../domain/driver";
import { PassengerProfile } from "../../domain/passenger";
import { driverService } from "../../services/driver.service";
import { passengerService } from "../../services/passenger.service";
import { FriendsComponent } from "../../components/friends/friends";
import { MoneyForm } from "../../components/forms/moneyForm";
import { ProfileForm } from "../../components/forms/profileForm";
import { msjContext } from "../../components/viewLayout/viewLayout";

export const Data = () => {
    const isDriver = localStorage.getItem('isDriver') === 'true';
    const [profile, setProfile] = useState<DriverProfile | PassengerProfile>(isDriver ? {} as DriverProfile : {} as PassengerProfile);
    const { showToast } = useContext(msjContext)

    const setChanges = (data: any) => {
        setProfile({ ...profile, ...data });
    }
    const fetchForm = async () => {
        try {
            const response = isDriver 
                ? await driverService.getProfile() 
                : await passengerService.getProfile();
            setProfile(response);
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
                        <MoneyForm money={(profile as PassengerProfile).money} func={setChanges} />
                        <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />
                        <FriendsComponent/>
                    </>
                )}
            </Box>
        </>
    );
};

