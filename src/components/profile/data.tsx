import { Box, Button, Divider, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { DriverProfile, driverProfileMock, UserProfile, userProfileMock } from "../../domain/profile"
import { estilosInput } from "../homeForm/homeFormStyles"

export const Data = () => {
    const [isDriver, setIsDriver] = useState<Boolean>(true)
    //hago un mock para que llene los campos, hay qe usar el hook de arriba

    const [profile, setProfile] = useState<DriverProfile | UserProfile>(
        isDriver ? driverProfileMock : userProfileMock
    );
    const [addMoney, setAddMoney] = useState<number>(0.0)


    return (
        <>
            <Box sx={{ margin: '1rem 1rem 4rem 1rem' }}>
                <form noValidate style={{ display: 'flex', justifyContent: 'center', height: 'auto', margin: '1rem ' }}>
                    <Stack spacing={2} width={'80vw'} >

                        <TextField
                            size="small"
                            label="Name"
                            type="text"
                            sx={estilosInput}
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                        <TextField
                            size="small"
                            label="Last Name"
                            type="text"
                            sx={estilosInput}
                            value={profile.lastname}
                            onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
                        />
                        {isDriver ? (
                            <>
                                <TextField
                                    size="small"
                                    label="Base price"
                                    type="number"
                                    sx={estilosInput}
                                    value={isDriver && 'price' in profile ? profile.price : ''}
                                    onChange={(e) => setProfile({ ...profile, price: Number(e.target.value) })}
                                />

                                <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />
                                <p>Automovilista Premiun</p>
                                <TextField
                                    size="small"
                                    label="Domain"
                                    type="text"
                                    sx={estilosInput}
                                    value={isDriver && 'price' in profile ? profile.domain : ''}
                                    onChange={(e) => setProfile({ ...profile, domain: e.target.value })}
                                />
                                <TextField
                                    size="small"
                                    label="Brand"
                                    type="text"
                                    sx={estilosInput}
                                    value={isDriver && 'price' in profile ? profile.brand : ''}
                                    onChange={(e) => setProfile({ ...profile, brand: e.target.value })}
                                />
                                <TextField
                                    size="small"
                                    label="Model"
                                    type="number"
                                    sx={estilosInput}
                                    value={isDriver && 'price' in profile ? profile.model : ''}
                                    onChange={(e) => setProfile({ ...profile, model: Number(e.target.value) })}
                                />
                            </>

                        ) : (
                            <>
                                <TextField
                                    size="small"
                                    label="Phone"
                                    type="number"
                                    sx={estilosInput}
                                    value={'phone' in profile ? profile.phone : ''}
                                    onChange={(e) => setProfile({ ...profile, phone: Number(e.target.value) })}
                                />

                            </>
                        )}

                        <Button type="submit" variant="contained" color="secondary">Save</Button>


                    </Stack>
                </form>

                {!isDriver && (
                    <>
                        <Divider aria-hidden="true" sx={{ borderColor: '#a737fc' }} />

                        <Stack direction="column" spacing={1} alignItems="center" margin="1rem">
                            <Box sx={{ fontWeight: 'bold' }}>
                                <p>Cash $
                                    {profile.money} </p>
                            </Box>

                            <form noValidate style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 'auto', margin: '1rem', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
                                <TextField
                                    size="small"
                                    label="Add money"
                                    type="number"
                                    sx={estilosInput}
                                    value={addMoney === 0 ? '' : addMoney}
                                    onChange={(e) => setAddMoney(Number(e.target.value))}
                                />
                                <Button type="submit" variant="contained" color="secondary">Save Money</Button>
                            </form>
                        </Stack>

                    
                    </>
                )}
            </Box>
        </>
    )
}