import {Grid, GridItem, Heading,} from '@chakra-ui/react'
import React from 'react'
import {Layout} from '../components/Layout'
import Navlink from "../components/Navlink";
import {useAuth} from "../contexts/AuthContext";

export default function Homepage() {
    const {logout, currentUser, userRole } = useAuth()
    return (
        <Layout>
            <Heading>Home page</Heading> <br></br>
            {currentUser && (
                <Grid gap={6}>
                    {userRole === 1 && (
                        <GridItem w='100%' h='10' align='center'>
                            <Navlink  to='/student' name='Student Panel' colorScheme='teal' size='lg' width="350px" variant ='outline'/>
                        </GridItem>
                    )}
                    {userRole === 2 && (
                        <GridItem w='100%' h='10' align='center'>
                            <Navlink  to='/lecturer' name='Lecturer Panel' colorScheme='teal' size='lg' width="350px" variant ='outline'/>
                        </GridItem>
                    )}
                    {userRole === 3 && (
                        <GridItem w='100%' h='10' align='center'>
                            <Navlink  to='/admin' name='Admin panel' colorScheme='teal' size='lg' width="350px" variant ='outline'/>
                        </GridItem>
                    )}


                    <GridItem w='100%' h='10' align='center'>
                        <Navlink to='/qrscanner' name='QR Scanner' colorScheme='teal' size='lg' width="350px" variant ='outline'/>
                    </GridItem>
                    <GridItem w='100%' h='10' align='center'>
                        <Navlink to='/qrgenerator' name='QR Generator' colorScheme='teal' size='lg' width="350px" variant ='outline'/>
                    </GridItem>
                </Grid>
            )}
        </Layout>
    )
}