import { VStack, Input, HStack, Text, Heading } from "@chakra-ui/react"

export const Help = () => {
    return <VStack padding={10}>
        <Heading size={"sm"} textAlign="center">Key</Heading>
        <HStack alignItems={"center"} justifyContent="flex-start" width={"100%"}>
            <Input
                width={"4rem"}
                borderRadius={10}
                background="white"
                disabled={true}
                onChange={() => { }}
                textAlign="center"
                _disabled={{
                    border: "4px solid black"
                }}
            />
            <Text>The letter doesn't exist in the word</Text>
        </HStack>

        <HStack alignItems={"center"} justifyContent="flex-start" width={"100%"}>
            <Input
                width={"4rem"}
                borderRadius={10}
                background="white"
                disabled={true}
                onChange={() => { }}
                textAlign="center"
                _disabled={{
                    border: "4px solid yellow"
                }}
            />
            <Text flex={1}>The letter does exist in the word</Text>
        </HStack>

        <HStack alignItems={"center"} justifyContent="flex-start" width={"100%"}>
            <Input
                width={"4rem"}
                borderRadius={10}
                background="white"
                disabled={true}
                onChange={() => { }}
                textAlign="center"
                _disabled={{
                    border: "4px solid green"
                }}
            />
            <Text>The letter exists in the same position</Text>
        </HStack>
    </VStack>
}