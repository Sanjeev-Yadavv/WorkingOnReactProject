import
 {Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
}
 from '@chakra-ui/react'

export default function ErrIndicator() {
    return (
        <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Data is not get properly</AlertTitle>
            <AlertDescription>Somethin went wrong with your website</AlertDescription>
        </Alert>
    )
}