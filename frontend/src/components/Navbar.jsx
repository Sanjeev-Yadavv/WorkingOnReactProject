import {Link as ReactRouterLink} from "react-router-dom"
import {Button, Link as ChakraLink, Flex} from '@chakra-ui/react'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContextProvider'


const links = [
    {
        to: '/',
        label: 'Home',
    },
    {
        to: '/about',
        label: 'About',
    },
    {
        to: '/contact',
        label: 'Contact',
    },
    {
        to: '/login',
        label: 'Login',
    },
    {
        to: '/tickets',
        label: 'Tickets',
    },
]

export default function Navbar(){
    const {authDetails} = useContext(AuthContext)
    const {isLoggedIn} = authDetails

    const {logout} = useContext(AuthContext)
    return <Flex
    justify='space-around'
    align='center'
    padding={4}
    background="green.100"
    >
    {
        links?.map((link) =>(
<ChakraLink as={ReactRouterLink} key={link.to} to={link.to}>{link.label}</ChakraLink>
        
    ))}

  { isLoggedIn ?  (<Button onClick={logout} variant='outline' colorScheme="teal" >LogOut</Button>) : null}
    </Flex>


}
   
