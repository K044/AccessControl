import {Grid, GridItem, Heading,} from '@chakra-ui/react'
import React from 'react'
import {Layout} from '../components/Layout'
import Navlink from "../components/Navlink";
import {useAuth} from "../contexts/AuthContext";

export default function Homepage() {
    const {logout, currentUser } = useAuth()

    return (
        <Layout>
            <Heading>Home page</Heading>
            {currentUser && (
                <Grid gap={6}>
                    <GridItem w='100%' h='10' align='center'>
                        <Navlink  to='/admin' name='Admin panel'/>
                    </GridItem>
                    <GridItem w='100%' h='10' align='center'>
                        <Navlink to='/qrscanner' name='QR scanner'/>
                    </GridItem>
                    <GridItem w='100%' h='10' align='center'>
                        <Navlink to='/qrgenerator' name='QR generator'/>
                    </GridItem>
                    <GridItem w='100%' h='10' align='center'>
                        <Navlink
                            to='/logout'
                            name='Logout'
                            onClick={async e => {
                                e.preventDefault()
                                await logout()
                            }}
                        />
                    </GridItem>
                </Grid>
            )}
        </Layout>
    )
}