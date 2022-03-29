import { Box, chakra, Container, Heading, Center, Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import Navlink from "../components/Navlink";

export default function LecturerPage() {
  const { currentUser } = useAuth()
  return (
      <Layout>
          <Box>
            <Heading>Lecturers page</Heading>
            <Center>
            <Stack spacing={4} direction='column' align='center'>
                <Button colorScheme='teal' size='lg' width="350px" variant ='outline'>
                <Navlink to='/doesnotexist' name='My Calendar'/>
                </Button>
                <Button colorScheme='teal' size='lg' width="350px" variant ='outline'>
                <Navlink to='/doesnotexist' name='Check Student Attendance'/>
                </Button>
                <Button colorScheme='teal' size='lg' width="350px" variant ='outline'>
                <Navlink to='/doesnotexist' name='Add Students/Guests to Class'/>
                </Button>
            </Stack>
            </Center>

          </Box>
      </Layout>
  );
}