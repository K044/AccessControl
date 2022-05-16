import {Grid, Heading, Center, Stack, Button} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import {Layout} from '../components/Layout'
import Navlink from "../components/Navlink";
import {useAuth} from "../contexts/AuthContext";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../utils/init-firebase";

export default function StudentPage() {
    const {logout, currentUser } = useAuth()
    const [role, setRole] = useState(0);
    console.log('currentUser')
    console.log(currentUser)
    useEffect(async () => {
        if (currentUser) {
            const docRef = doc(db, "users", currentUser.uid.toString());
            const docSnap = await getDoc(docRef);
            setRole(docSnap.data().role || 0);
        }
    }, [currentUser]);
    return (
        <Layout>
            <Heading>Students page</Heading><br></br>
            {currentUser && (
                <Grid gap={6}>
                    {role === 1 && (
                        <>
                            <Center>
                            <Stack spacing={6} direction='column' align='center'>
                            <Button colorScheme='teal' size='lg' width="350px" variant ='outline'>
                            <Navlink to='/calendar' name='My Calendar'/>
                            </Button>
                            <Button colorScheme='teal' size='lg' width="350px" variant ='outline'>
                            <Navlink to='/doesnotexist' name='Check My Attendance'/>
                            </Button>
                            </Stack>
                            </Center>
                        </>

                        )}

                </Grid>
            )}
        </Layout>
    )
}