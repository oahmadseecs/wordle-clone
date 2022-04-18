import { Box } from "@chakra-ui/react"

const Footer = ({ Button }) => {
    return <Box
        position={"fixed"}
        left={"0"}
        right={"0"}
        bottom={"0"}
        height={"15%"}
        backgroundColor="transparent"
        display={"flex"}
        alignItems="flex-start"
        justifyContent={"center"}
    >
        <Button />
    </Box>
}

export { Footer };