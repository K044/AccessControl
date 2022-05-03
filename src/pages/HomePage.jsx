import {Grid, GridItem, Heading,} from '@chakra-ui/react'
import React from 'react'
import {Layout} from '../components/Layout'
import Navlink from "../components/Navlink";
import {useAuth} from "../contexts/AuthContext";

export default function Homepage() {
    const {logout, currentUser, userRole } = useAuth()
/*    console.log(currentUser.getIdTokenResult().then((test=>{console.log(test)}))*/
    return (
        <Layout>
            <Heading>Home page</Heading> <br></br>
            {currentUser && (
                <Grid gap={6}>
                    {userRole === 1 && (
                        <GridItem w='100%' h='10' align='center'>
                            <Navlink  to='/student' name='Student page' colorScheme='teal' size='lg' width="350px" variant ='outline'/>
                        </GridItem>
                    )}
                    {userRole === 2 && (
                        <GridItem w='100%' h='10' align='center'>
                            <Navlink  to='/lecturer' name='Lecturer page' colorScheme='teal' size='lg' width="350px" variant ='outline'/>
                        </GridItem>
                    )}
                    {userRole === 3 && (
                        <GridItem w='100%' h='10' align='center'>
                            <Navlink  to='/admin' name='Admin panel' colorScheme='teal' size='lg' width="350px" variant ='outline'/>
                        </GridItem>
                    )}


                    <GridItem w='100%' h='10' align='center'>
                        <Navlink to='/qrscanner' name='QR scanner' colorScheme='teal' size='lg' width="350px" variant ='outline'/>
                    </GridItem>
                    <GridItem w='100%' h='10' align='center'>
                        <Navlink to='/qrgenerator' name='QR generator' colorScheme='teal' size='lg' width="350px" variant ='outline'/>
                    </GridItem>
                </Grid>
            )}
        </Layout>
    )
}