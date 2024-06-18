import {Card, CardHeader, CardBody,Stack,StackDivider,Text,Box,Heading,Button,CardFooter} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'


 export default function TicketCard({id,title,status,priority}){
    const navigate = useNavigate()

    function handleClick(){

navigate(`/tickets/view/${id}`)
    }

    return (
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
    </Stack>
  </CardBody>
  <CardFooter>
      <Button onClick={handleClick} variant='outline' colorScheme='teal'>
        View Ticket
      </Button>
    </CardFooter>
</Card>
    )
}
