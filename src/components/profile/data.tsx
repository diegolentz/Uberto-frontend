import { Box, Divider } from "@mui/material";
import { use, useEffect, useState } from "react";
import { DriverProfile, driverProfileMock, UserProfile, userProfileMock } from "../../domain/profile";
// Removed unused import of useForm
import { MoneyForm } from "../profileForm/moneyForm";
import { ProfileForm } from "../profileForm/profileForm";

export const Data = () => {
    const [isDriver] = useState<boolean>(true);
    const [profile, setProfile] = useState<DriverProfile | UserProfile>(isDriver ? driverProfileMock : userProfileMock);

    const setChanges = (data: any) => {
        
        // console.log("mis datos nuevos", data);
        setProfile(data);

    }

    useEffect(() => {
        console.log("Profile updated:", profile);
    }, [profile]);

    return (
        <>
            <Box sx={{ padding: '2rem 1rem 3rem 1rem' }}>
                <ProfileForm entity={profile} rol={isDriver} func={setChanges} />
                <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />
                {!isDriver && 'money' in profile && (
                    <MoneyForm money={profile.money} func={setChanges} />
                )}
            </Box>
        </>
    );
}; 