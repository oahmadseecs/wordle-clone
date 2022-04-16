import { Box } from "@chakra-ui/react"

const Footer = ({ FinishButton }) => {
    return <Box
        position={"fixed"}
        left={"0"}
        right={"0"}
        bottom={"0"}
        height={"15%"}
        backgroundColor="transparent"
        display={"flex"}
        alignItems="flex-start"
        justifyContent={"flex-end"}
    >
        <FinishButton />
    </Box>
}

export { Footer };