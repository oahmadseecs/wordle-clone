import { Button, Flex, Heading, Link, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("I fire once");
  }, [])
  return (
    <Flex width={"100%"} marginTop={"10%"} flexDirection="column" justifyContent={"center"} alignItems="center">
      <VStack spacing={5}>
        <Heading size='4xl'>Wordle-Clone</Heading>
        <Heading size='md'>A Project by</Heading>
        <Heading size="xl">
          <Link href="https://github.com/oahmadseecs" target={"_blank"} _focus={{
            outline: "none"
          }}>Owais Ahmad</Link>
        </Heading>

        {/* Button to start game */}
        <Button _hover={{
          backgroundColor: "black",
          color: "white"
        }}>Start Game</Button>

      </VStack>
    </Flex>
    // TODO: Credit the API that you use here
  )
}
