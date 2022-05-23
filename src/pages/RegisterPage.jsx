import {
    Button,
    Center,
    chakra,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useToast,
  } from '@chakra-ui/react'
  import React, { useEffect, useRef, useState } from 'react'
  import { FaGoogle } from 'react-icons/fa'
  import { useHistory } from 'react-router-dom'
  import { Card } from '../components/Card'
  import DividerWithText from '../components/DividerWithText'
  import { Layout } from '../components/Layout'
  import { useAuth } from '../contexts/AuthContext'
  import { db, auth } from '../utils/init-firebase'
  import { doc, setDoc } from "firebase/firestore"; 
  
  export default function Registerpage() {
    const history = useHistory()
    const { register, logout } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const toast = useToast()
    const mounted = useRef(false)
  
    useEffect(() => {
      mounted.current = true
      return () => {
        mounted.current = false
      }
    }, [])
   
      const [txt, setTxt] = useState('');
     
      const onInputChangeL = e => {
        const { value } = e.target;
        console.log('Input value: ', value);
     
        const re = /^[A-Za-z]+$/;
        if (value === "" || re.test(value)) {
          setLastname(value);
        }
      }
      const onInputChangeN = e => {
        const { value } = e.target;
        console.log('Input value: ', value);
     
        const re = /^[A-Za-z]+$/;
        if (value === "" || re.test(value)) {
          setName(value);
        }
      }
    
    
  
    return (
      <Layout>
        <Heading textAlign='center' my={12}>
          Register
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
              // your register logic here
              setIsSubmitting(true)
              await register(email, password)
                .then(res => {})
                .catch(error => {
                  console.log(error.message)
                  if(error.message === "Firebase: Error (auth/email-already-in-use).")
                    error.message = "Email is already in use"
                  else if(error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).")
                    error.message = "Password should be at least 6 characters"
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
                var user = auth.currentUser
                await setDoc(doc(db, "users", user.uid.toString()), {
                  id: user.uid.toString(),
                  name: name.toString(),
                  lastname: lastname.toString(),
                  email: email.toString(),
                  role: 0
                });
                await logout().then(res => {
                  history.push("/login")
                  document.getElementById("btn").click()
                })
                
            }}
          >
            <Stack spacing='6'>
            <FormControl id='name'>
                <FormLabel>First Name</FormLabel>
                <Input
                  name='name'
                  type='name'
                  autoComplete='name'
                  required
                  value={name}
                  onChange={onInputChangeN}
                />
              </FormControl>
              <FormControl id='lastname'>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name='lastname'
                  type='lastname'
                  autoComplete='lastname'
                  required
                  value={lastname}
                  onChange={onInputChangeL} 
                />
              </FormControl>
              <FormControl id='email'>
                <FormLabel>Email Address</FormLabel>
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
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
              <Button
                type='submit'
                colorScheme='pink'
                size='lg'
                fontSize='md'
                isLoading={isSubmitting}
              >
                Sign up
              </Button>
            </Stack>
          </chakra.form>
          <Center my={4}>
            <Button variant='link' onClick={() => history.push('/login')}>
              Login
            </Button>
          </Center>
        </Card>
      </Layout>
    )
  }