import { Box, Heading, Input, Button, VStack, Container } from "@chakra-ui/react"
import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContextProvider'
import { Navigate } from 'react-router-dom'



export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")

    const {
        login,
        authDetails: { isLoggedIn },
    } = useContext(AuthContext)

    async function handleClick() {
        try {
            let res = await axios({
                method: 'post',
                url: 'https://reqres.in/api/login',
                data: {
                    email,
                    password,
                },
            })
            login(res?.data?.token)
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoggedIn) {
        return <Navigate to='/' />
    }

    return <Container>
        <VStack spacing='4'>
            <Heading as="h1" size="xl">
                Login Page
            </Heading>
            <Input
                placeholder='Enter your email'
                type="email"
                size='md'
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
            />
            <Input
                placeholder='Enter your password'
                type="text"
                size='md'
                value={password}
                onChange={(e) => { setpassword(e.target.value) }}
            />
            <Button onClick={handleClick} variant='outline' colorScheme="teal">
                LogIn
            </Button>
        </VStack>
    </Container>
}