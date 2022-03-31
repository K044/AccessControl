import { Button, Grid, GridItem,chakra, Container, Heading } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import Navlink from '../components/Navlink'

export default function Profilepage() {
  const { currentUser } = useAuth()
  
  return (
      <Layout>
      <Heading>Profile page</Heading>
      <div>User: {currentUser.email}</div>
      <div>User role: eee {currentUser.role}</div>
      <Button colorScheme='pink' size='lg' width="200px" variant ='outline'>
          <Navlink  to='/reset-password' name='Change Password'/>
      </Button>
 </Layout>
  )
}