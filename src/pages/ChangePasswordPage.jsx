import {
    Button,
    chakra,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useToast,
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
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
    const toast = useToast()
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
                      console.log("password updated")
                    }, (error) => {
                      console.log("change password failed")
                    });
                    history.push("/profile")
                  }).catch((error) => {
                    console.log(error)
                    //cia reiktu modal idet kad wrong password
                  });
                }
              } catch (error) {
                console.log(error)
              }
            }}
          >
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