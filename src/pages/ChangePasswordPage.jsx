import {
    Button,
    chakra,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useToast,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
    useDisclosure,
  } from '@chakra-ui/react'
  import React, { useState } from 'react'
  import { Card } from '../components/Card'
  import { Layout } from '../components/Layout'
  import { useHistory, useLocation } from 'react-router-dom'
  import { useAuth } from '../contexts/AuthContext'
  import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth'
  
  export default function ChangePasswordPage() {
    const { currentUser } = useAuth()
    const history = useHistory()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [header, setHeader] = useState('')
    const [body, setBody] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    function redirect(){
      onClose()
      history.push("/profile")
    }
    return (
      <Layout>
        <Heading textAlign='center' my={12}>
          Information
        </Heading>
        <Card maxW='md' mx='auto' mt={4}>
          <chakra.form
            onSubmit={async e => {
              e.preventDefault()
              try {
                if(newPassword == newPasswordConfirm) {
                  const credential = EmailAuthProvider.credential(
                    currentUser.email,
                    oldPassword
                   );
                  reauthenticateWithCredential(currentUser, credential).then(() => {
                    updatePassword(currentUser, newPassword).then(() => {
                      setHeader("Password")
                      setBody("Password was changed succesfully")
                      document.getElementById("btn").click()
                    }, (error) => {
                      setHeader("Password")
                      setBody("Password change was not succesful, because new password is too short")
                      document.getElementById("btn").click()
                    });
                  }).catch((error) => {
                    setHeader("Password")
                    setBody("Password change was not succesful, because old password is wrong")
                    document.getElementById("btn").click()
                  });
                }
              } catch (error) {
                console.log(error)
              }
            }}
          >
          <Button id="btn" onClick={onOpen}hidden>Test Modal</Button>
          <Modal isOpen={isOpen} onClose={redirect}>
            <ModalOverlay />
              <ModalContent>
                <ModalHeader>{header}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{body}</ModalBody>
              <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={redirect}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
            <Stack spacing='6'>
              <FormControl id='oldPassword'>
                <FormLabel>Old Password</FormLabel>
                <Input
                  type='password'
                  autoComplete='password'
                  required
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id='NewPassword'>
                <FormLabel>New Password</FormLabel>
                <Input
                  type='password'
                  autoComplete='password'
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id='NewPasswordConfirm'>
                <FormLabel>Confirm New password</FormLabel>
                <Input
                  type='password'
                  autoComplete='password'
                  required
                  value={newPasswordConfirm}
                  onChange={e => setNewPasswordConfirm(e.target.value)}
                />
              </FormControl>
              <Button type='submit' colorScheme='pink' size='lg' fontSize='md'>
                Change Password
              </Button>
            </Stack>
          </chakra.form>
        </Card>
      </Layout>
    )
  }