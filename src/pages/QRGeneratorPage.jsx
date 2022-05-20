import React, {useState} from 'react'
import { Admin, Resource } from 'react-admin';
import { doc, setDoc } from "firebase/firestore"; 
import { db, auth, dataProvider } from '../utils/init-firebase'
import { useHistory } from 'react-router-dom'
import { Button, Input, Container, Heading, Box, Center, Text, Table, Tr, Tbody, Td, TableContainer, Select } from '@chakra-ui/react'
import { Layout } from '../components/Layout'
import { QRList } from '../utils/adminList';
import { QRLayout } from '../utils/adminLayout'

function QRgenerator() {

    const user = auth.currentUser
    const history = useHistory();
    const [number, setNumber] = useState("");
    const [faculty, setFaculty] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        var md5 = require('md5');
        const timestamp = Date.now();
        const id = md5(timestamp).substring(0, 13)
        setDoc(doc(db, "qrcodes", id), {
            number: number,
            faculty: faculty,
            uid: user.uid.toString(),
            view: "https://accesscontrol-1802c.web.app/qrcode/"+id,
            link: "https://accesscontrol-1802c.web.app/scan/"+id,
        });
        history.push('/qrcode/'+id)
      }
    
    return (
      <Box>
        <form onSubmit={handleSubmit}>
<Layout>
      <Heading>Generate QR Code</Heading>
      <Center>
        <Container>
          <Box boxShadow='base' mt={5} w='100%' p={4} borderWidth='1px' borderRadius='lg'>
            <Center><Heading fontSize='3xl'>QR information</Heading></Center>
            <TableContainer>
              <Table size='sm'>
                <Tbody>
                <Tr>
                  <Td><Text fontSize={20} as='i'>Classroom number</Text></Td>
                  <Td><Input type='number' required value={number} onChange={e => setNumber(e.target.value)}/></Td>
                </Tr>
                <Tr>
                  <Td><Text fontSize={20} as='i'>Faculty number</Text></Td>
                  <Td><Select placeholder="Select faculty" onChange={e => setFaculty(e.target.value)}>
                        <option value="IX">IX</option>
                        <option value="X">X</option>
                        <option value="XI">XI</option>
                      </Select></Td>
                </Tr>
                </Tbody>  
             </Table>
            </TableContainer>     
          </Box>
          <Center>
            <Button colorScheme='pink' size='lg' width="200px" variant ='outline' mt={5} type='submit'>Create</Button>
          </Center>
        </Container>
      </Center>
</Layout>
        </form>
        <Admin layout={QRLayout} dataProvider={dataProvider} >
        <Resource name="qrcodes" list={QRList} />
        </Admin>
      </Box>
    );
  }
  
  export default QRgenerator;