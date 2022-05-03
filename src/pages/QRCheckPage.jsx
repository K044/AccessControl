import React, {useState} from 'react'
import { Navbar } from '../components/Navbar'
import {Fab, TextField, TextareaAutosize, Grid} from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../utils/init-firebase'
import { Button, GridItem,chakra, Container, Heading, Box, Center, Text, Table, Th, Tr, Tbody, Td, TableContainer } from '@chakra-ui/react'
import { Layout } from '../components/Layout'

function QRCheckPage() {
    const { id } = useParams();
    const [number, setNumber] = useState('')
    const [faculty, setFaculty] = useState('')
    const getData = async () => {
        const docRef = doc(db, "qrcodes", id);
        const docSnap = await getDoc(docRef);
        setNumber(docSnap.data().number);
        setFaculty(docSnap.data().faculty);
    }
    getData()
    
    return (
      <Layout>
            <Heading>Scanned QR</Heading>
            <Center>
              <Container>
                <Box boxShadow='base' mt={5} w='100%' p={4} borderWidth='1px' borderRadius='lg'>
                  <Center><Heading fontSize='3xl'>Details</Heading></Center>
                  <TableContainer>
                    <Table size='sm'>
                      <Tbody>
                      <Tr>
                        <Td><Text fontSize={20} as='i'>Classroom number</Text></Td>
                        <Td>{number}</Td>
                      </Tr>
                      <Tr>
                        <Td><Text fontSize={20} as='i'>Faculty number</Text></Td>
                        <Td>{faculty}</Td>
                      </Tr>
                      </Tbody>  
                   </Table>
                  </TableContainer>     
                </Box>
              </Container>
            </Center>
      </Layout>
          );
        }
  
  export default QRCheckPage;