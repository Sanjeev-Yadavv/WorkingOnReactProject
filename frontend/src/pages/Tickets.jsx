import {
    Box, Heading, Button, Flex, Container,
    SimpleGrid,Select,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingIndicator from '../components/LoadingIndicator'
import ErrIndicator from '../components/ErrIndicator'
import TicketCard from '../components/TicketCard'







export default function Tickets() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [tickets, setTickets] = useState([])
    const [err, setErr] = useState(false)
    const [sortValue,setSortValue] = useState("")
    const [statusValue, setStatusValue] = useState("")

    async function fetchAndUpdateData(sortValue, statusValue) {
        setLoading(true);
        try {
            let queryParams = {};
            
            if (statusValue) {
                queryParams.status = statusValue;
            }
    
            if (sortValue) {
                queryParams._sort = "priority";
                queryParams._order = sortValue;
            }
    
            let res = await axios({
                method: "get",
                url: `http://localhost:3000/tickets`,
                params: queryParams,
            });
            let data = res?.data;
            console.log(data);
            setLoading(false);
            setTickets(data);
        } catch (error) {
            setLoading(false);
            setErr(true);
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchAndUpdateData(sortValue, statusValue)
    }, [sortValue,statusValue])

    // console.log(loading, err)
    console.log(tickets)

    if (loading) {
        return (<LoadingIndicator />)
    }

    if (err) {
        return (<ErrIndicator />)
    }

    function handleClick() {
        navigate('/tickets/create')
    }

    return (
        <Container maxW="container.xl">

            <Flex direction="row-reverse">
                {/* <Heading>Tickets Page</Heading> */}

                <Button my={3} onClick={handleClick} colorScheme='teal' variant='outline'>
                    Create Tickets
                </Button>
            </Flex>
            <Flex my={3} justify='center'>
<Select value={sortValue} onChange={(e)=>{setSortValue(e.target.value)}} placeholder='Select by priority'>
  <option value='asc'>Low to High</option>
  <option value='desc'>High To Low</option>
  
</Select>
<Select value={statusValue} onChange={(e)=>{setStatusValue(e.target.value)}} placeholder='Select by Status'>
  <option value='pending'>as pending</option>
  <option value='progress'>as progress</option>
  <option value='completed'>as completed</option>
</Select>
</Flex>
            <SimpleGrid columns={{base: 1, md: 2, lg: 3,}} spacing={10}>
                {tickets?.map((ticket) => (
                    <TicketCard key={ticket.id}{...ticket} />
                ))}
            </SimpleGrid>

        </Container>
    )
}