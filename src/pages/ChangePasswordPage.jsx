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
                // https://medium.com/@ericmorgan1/change-user-email-password-in-firebase-and-react-native-d0abc8d21618#:~:text=Changing%20the%20current%20user%27s%20email,newPassword)%20on%20the%20user%20object.
              } catch (error) {
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