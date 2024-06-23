import { Heading, Container, VStack, Select, Textarea, Input, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import LoadingIndicator from '../components/LoadingIndicator'
import ErrIndicator from '../components/ErrIndicator'
import {useNavigate} from 'react-router-dom'

export default function TicketCreate() {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [title, setTitle] = useState("")
    const [desciption, setDescription] = useState("");
    const [assignee, setAssignee] = useState("");
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")
const navigate = useNavigate()

   async function handleClick() {
    setLoading(true);
        try {
          let res = await axios ({
            method : "post",
            url : "http://localhost:3200/tickets",
            data : {
                title : title,
                desciption: desciption,
                assignee: assignee,
                status: status,
                priority: priority,
            },
          })  

        
        //   console.log(res)
          setLoading(false)
        } catch (error) {
            setLoading(false);
            setErr(true)
        }
    }

    useEffect (()=>{
        handleClick()
    },[]);

    if(loading){
        return <LoadingIndicator/>
    }
    if (err){
        return <ErrIndicator/>
    }


    return <Container>
        <VStack spacing={3}>
            <Heading>Create your ticket here -</Heading>
            <Input value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder='Enter your title here' size='md' />
            <Textarea value={desciption} onChange={(e) => {setDescription(e.target.value)}} placeholder='Give your description here' />
            <Select value={assignee} onChange={(e) => {setAssignee(e.target.value)}} placeholder='Assignee'>
                <option value='sanju'>Sanju</option>
                <option value='massab'>Massab</option>
                <option value='banty'>Banty</option>
                <option value='yogendra'>Yogendra</option>
                <option value='rakesh'>Rakesh</option>
            </Select>
            <Select value={status} onChange={(e) => {setStatus (e.target.value)}} placeholder='Status'>
                <option value='pending'>Pending</option>
                <option value='progress'>Progress</option>
                <option value='completed'>Completed</option>

            </Select>
            <Select value={priority} onChange={(e) => {setPriority(e.target.value)}} placeholder='Priority'>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
            </Select>

            <Button onClick={handleClick} colorScheme='teal' variant='outline'>
                Create Ticket
            </Button>
        </VStack>
    </Container>
}