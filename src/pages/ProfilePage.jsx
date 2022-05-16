import { Button, Grid, GridItem,chakra, Container, Heading, Box, Center, Text, Table, Th, Tr, Tbody, Td, TableContainer } from '@chakra-ui/react'
import {React} from 'react'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import Navlink from '../components/Navlink'
import { updateProfile } from 'firebase/auth'
import { useState, useEffect } from 'react'

export default function Profilepage() {
  const { currentUser, getUserInfo } = useAuth()
  const [email, setEmail] = useState()
  const [name, setName] = useState()
  const [lastname, setLastName] = useState()
  const [role, setRole] = useState()
  useEffect (async() => {
    const a = await getUserInfo()
    setName(a.name)
    setEmail(a.email)
    setLastName(a.lastname)
    let temp = "Unassigned"
    switch(a.role){
      case 1:
        temp = "Student"
        break
      case 2:
        temp = "Lecturer"
        break
      case 3:
        temp = "Admin"
    }
    setRole(temp)
  })
  return (
      <Layout>
      <Heading>Profile page</Heading>
      <Center>
        <Container>
          <Box boxShadow='base' mt={5} w='100%' p={4} borderWidth='1px' borderRadius='lg'>
            <Center><Heading fontSize='3xl'>User profile information</Heading></Center>
            <TableContainer>
              <Table size='sm'>
                <Tbody>
                <Tr>
                  <Td><Text fontSize={20} as='i'>Role</Text></Td>
                  <Td>{role}</Td>
                </Tr>
                <Tr>
                  <Td><Text fontSize={20} as='i'>Name</Text></Td>
                  <Td>{name + " " + lastname}</Td>
                </Tr>
                <Tr>
                  <Td><Text fontSize={20} as='i'>Email</Text></Td>
                  <Td>{email}</Td>
                </Tr>
                </Tbody>  
             </Table>
            </TableContainer>     
          </Box>
          <Center>
            <Navlink  colorScheme='pink' size='lg' width="200px" variant ='outline' mt={5} to='/change-password' name='Change Password'/>
          </Center>
        </Container>
      </Center>
 </Layout>
  )
}