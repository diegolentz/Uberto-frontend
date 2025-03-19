import { Box, Divider } from "@mui/material";
import { use, useEffect, useState } from "react";
import { DriverProfile, driverProfileMock, UserProfile, userProfileMock } from "../../domain/profile";
// Removed unused import of useForm
import { MoneyForm } from "../profileForm/moneyForm";
import { ProfileForm } from "../profileForm/profileForm";
import { FriendsComponent } from "../friends/friends";

export const Data = () => {
    const [isDriver] = useState<boolean>(false);
    const [profile, setProfile] = useState<DriverProfile | UserProfile>(isDriver ? driverProfileMock : userProfileMock);

    const setChanges = (data: any) => {
        setProfile({ ...profile, ...data });
    }

    useEffect(() => {
        console.log("Profile updated:", profile);
    }, [profile]);

    return (
        <>
            <Box sx={{ padding: '2rem 1rem 3rem 1rem'}}>
                <ProfileForm entity={profile} rol={isDriver} func={setChanges} />
                <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />
                {!isDriver && (
                    <>
                    <MoneyForm money={(profile as UserProfile).money} func={setChanges} />
                    <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />
                    <FriendsComponent/>
                    </>
                )}
            </Box>
        </>
    );
}; 