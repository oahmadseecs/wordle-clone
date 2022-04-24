import { Container, Heading, Text } from "@chakra-ui/react"

const ErrorBox = ({ errorMessage }) => {
    return <Container textAlign={"center"}>
        <Heading size={"md"} color={"red"}>Error!</Heading>
        <Text color={"red"}>{errorMessage}</Text>
    </Container>
}

export { ErrorBox };