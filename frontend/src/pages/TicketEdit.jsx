import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Select, Heading, Button,Input,Textarea, VStack ,Container} from '@chakra-ui/react';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrIndicator from '../components/ErrIndicator';

export default function TicketEdit() {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [ticket, setTicket] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();


    // const [title, setTitle] = useState("")
    // const [desciption, setDescription] = useState("");
    // const [assignee, setAssignee] = useState("");
    // const [status, setStatus] = useState("")
    // const [priority, setPriority] = useState("")

    async function fetchAndUpdateData(id){
        setLoading(true);
       try {
           let res = await axios ({
               method: "get",
               url: `http://localhost:3000/tickets/${id}`
           })
   setLoading(false)
         setTicket(res.data)
       //   console.log(res.data)
       } catch (error) {
           setErr(true);
           setLoading(false);
           console.log(err)
           
       }
       }
       useEffect(()=>{
           fetchAndUpdateData(id)
       },[id])
   
       if (loading) {
           return (<LoadingIndicator />)
       }
   
       if (err) {
           return (<ErrIndicator />)
       }

      async function editTicketPage(){
          try {
            let updatedTicket = {
                title : ticket.title,
                description: ticket.description,
                assignee: ticket.assignee,
                status: ticket.status,
                priority: ticket.priority,
            }

            let res = await axios({
                   method: 'put',
                   url: `http://localhost:3000/tickets/${id}` ,
                   data: updatedTicket,
            })

            if(res.status===200){
                navigate('/tickets')
            }
          } catch (error) {
            console.log(error);
          } 
       }

    //    console.log(ticket)

    const { status, priority, assignee, title, description } = ticket;

    return (
        <>
           <Container>
        <VStack spacing={3}>
            <Heading>Create your ticket here -</Heading>
            <Input value={title} onChange={(e) => {setTicket({...ticket,title:e.target.value})}} placeholder='Enter your title here' size='md' />
            <Textarea value={description} onChange={(e) => {setTicket({...ticket,description:e.target.value})}} placeholder='Give your description here' />
            <Select value={assignee} onChange={(e) => {setTicket({...ticket,assignee:e.target.value})}} placeholder='Assignee'>
                <option value='sanju'>Sanju</option>
                <option value='massab'>Massab</option>
                <option value='banty'>Banty</option>
                <option value='yogendra'>Yogendra</option>
                <option value='rakesh'>Rakesh</option>
            </Select>
            <Select value={status} onChange={(e) => {setTicket({...ticket,status:e.target.value})}} placeholder='Status'>
                <option value='pending'>Pending</option>
                <option value='progress'>Progress</option>
                <option value='completed'>Completed</option>

            </Select>
            <Select value={priority} onChange={(e) => {setTicket({...ticket,priority:e.target.value})}} placeholder='Priority'>
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

            <Button onClick={editTicketPage} colorScheme='teal' variant='outline'>
                Edit Ticket
            </Button>
        </VStack>
    </Container>

        </>
    );
}
