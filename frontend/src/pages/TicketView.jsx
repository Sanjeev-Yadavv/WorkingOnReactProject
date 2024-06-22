import { useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {HStack,Card, CardHeader, CardBody,Stack,StackDivider,Text,Box,Heading,Button,CardFooter, VStack} from '@chakra-ui/react'
import LoadingIndicator from '../components/LoadingIndicator'
import ErrIndicator from '../components/ErrIndicator'

export default  function TicketView(){
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [ticket, setTicket] = useState({})
    const navigate = useNavigate()
    const {id} = useParams()

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

   async function handleDelete(){
         
    try {
      let res = await axios({
        method: "delete",
        url: `http://localhost:3000/tickets/${id}`
      })

      if(res.status===200){
        navigate('/tickets')
      }
    } catch (error) {
      
    }
    }

    function handleEdit () {
        navigate(`/tickets/edit/${id}`)
    }

    const { status, priority, assignee, title,description} = ticket
    return<>
     <Card>
  <CardHeader>
    <Heading size='md'>{title}</Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
   
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Status
        </Heading>
        <Text pt='2' fontSize='sm'>
         {status}
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Priority
        </Heading>
        <Text pt='2' fontSize='sm'>
          {priority}
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Description
        </Heading>
        <Text pt='2' fontSize='sm'>
          {description}
        </Text>
      </Box>
     
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Assignee
        </Heading>
        <Text pt='2' fontSize='sm'>
          {assignee}
        </Text>
      </Box>
    </Stack>
  </CardBody>
  <CardFooter>
    <HStack  spacing={3}>
    <Button onClick={handleEdit} variant='outline' colorScheme='teal'>
        Edit Ticket
      </Button>

      <Button onClick={handleDelete} variant='outline' colorScheme='teal'>
        Delete Ticket
      </Button>
    </HStack>
    </CardFooter>
</Card>
    </>
}