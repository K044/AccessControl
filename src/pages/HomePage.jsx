import {Grid, GridItem, Heading,} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import {Layout} from '../components/Layout'
import Navlink from "../components/Navlink";
import {useAuth} from "../contexts/AuthContext";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../utils/init-firebase";

export default function Homepage() {
    const {logout, currentUser } = useAuth()
    const [role, setRole] = useState(0);
/*    console.log(currentUser.getIdTokenResult().then((test=>{console.log(test)}))*/
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
            <Heading>Home page</Heading>
            {currentUser && (
                <Grid gap={6}>
                    {role === 1 && (
                        <GridItem w='100%' h='10' align='center'>
                            <Navlink  to='/student' name='Student page'/>
                        </GridItem>
                    )}
                    {role === 2 && (
                        <GridItem w='100%' h='10' align='center'>
                            <Navlink  to='/lecturer' name='Lecturer page'/>
                        </GridItem>
                    )}
                    {role === 3 && (
                        <GridItem w='100%' h='10' align='center'>
                            <Navlink  to='/admin' name='Admin panel'/>
                        </GridItem>
                    )}


                    <GridItem w='100%' h='10' align='center'>
                        <Navlink to='/qrscanner' name='QR scanner'/>
                    </GridItem>
                    <GridItem w='100%' h='10' align='center'>
                        <Navlink to='/qrgenerator' name='QR generator'/>
                    </GridItem>
                </Grid>
            )}+
        </Layout>
    )
}