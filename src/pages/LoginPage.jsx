import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useToast,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Logout } from 'react-admin'
import { FaGoogle } from 'react-icons/fa'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Card } from '../components/Card'
import DividerWithText from '../components/DividerWithText'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { db, auth } from '../utils/init-firebase'
import useMounted from '../hooks/useMounted'

export default function LoginPage() {
  const history = useHistory()
  const { login, logout, getUserInfo } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  // const mounted = useRef(false)
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // useEffect(() => {
  //   mounted.current = true
  //   return () => {
  //     mounted.current = false
  //   }
  // }, [])

  const mounted = useMounted()

  function handleRedirectToOrBack() {
    // console.log(location?.state)
    history.replace(location.state?.from ?? '/')
    // if (location.state) {
    //   history.replace(location.state?.from)
    // } else {
    //   history.replace('/profile')
    // }
  }

  return (
    <Layout>
      <Heading textAlign='center' my={12}>
        Login
      </Heading>
      <Card maxW='md' mx='auto' mt={4}>
        <chakra.form
          onSubmit={async e => {
            e.preventDefault()
            if (!email || !password) {
              toast({
                description: 'Credentials not valid.',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              return
            }
            // your login logic here
            setIsSubmitting(true)
            await login(email, password)
              .then(res => {
                handleRedirectToOrBack()
              })
              .catch(error => {
                console.log(error.message)
                toast({
                  description: error.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
              })
              .finally(() => {
                mounted.current && setIsSubmitting(false)
              })
              const a = await getUserInfo()
                if(a.role == 0){
                  toast({
                    description: "User " + a.name + " does not have a role, wait for an admin!",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
                  await logout().then(res => {
                    history.push("/login")
                    onOpen()
                  })
                  // history.push("/random")
                  
                  // reikia kazkaip kad grazintu į login page o ne i home page ir aktyvuotu modal su onOpen()
              }
          }}
        >
           <Button onClick={onOpen}>Test Modal</Button>
           <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
              <ModalContent>
                <ModalHeader>Access Denied</ModalHeader>
              <ModalCloseButton />
              <ModalBody>Wait for an admin for approval</ModalBody>
              <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Stack spacing='6'>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                name='email'
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                name='password'
                type='password'
                autoComplete='password'
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            {/* <PasswordField /> */}
            <Button
              type='submit'
              colorScheme='pink'
              size='lg'
              fontSize='md'
              isLoading={isSubmitting}
            >
              Sign in
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent='space-between' my={4}>
          <Button variant='link'>
            <Link to='/forgot-password'>Forgot password?</Link>
          </Button>
          <Button variant='link' onClick={() => history.push('/register')}>
            Register
          </Button>
        </HStack>
      </Card>
    </Layout>
  )
}