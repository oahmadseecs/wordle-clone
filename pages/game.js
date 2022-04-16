import { Flex, Button } from "@chakra-ui/react";
import { InputRow } from "../components/InputRow";
import { useState } from "react";
import { Footer } from "../components/Footer";

const Game = () => {
    // attempt can have three values: 'current', 'done', 'pending'
    const [attempts, setAttempts] = useState(['current', 'pending', 'pending', 'pending', 'pending', 'pending']);
    const [isAttemptButtonDisabled, setIsAttemptButtonDisabled] = useState(true);

    const handleAttempt = () => {
        const currentAttemptIndex = attempts.findIndex((attempt => attempt === 'current'));
        attempts[currentAttemptIndex] = 'done';
        if (currentAttemptIndex < attempts.length) {
            attempts[currentAttemptIndex + 1] = 'current';
            setIsAttemptButtonDisabled(true);
        }
        setAttempts([...attempts]);

    }

    const FinishButton = () => <Button margin={25} colorScheme="red">Finish Game</Button>

    return <>
        <Flex
            marginTop={"10%"}
            width={"100%"}
            justifyContent="center"
            alignItems={"center"}
            flexDirection="column"
            padding={"0 30%"}
        >
            {
                attempts.map((attemptRow, index) => {
                    if (attemptRow === "current" || attemptRow === "done") {
                        return <InputRow
                            status={attemptRow}
                            key={index}
                            setIsAttemptButtonDisabled={setIsAttemptButtonDisabled}
                        />
                    }
                })
            }

            <Button
                variant={"solid"}
                colorScheme="green"
                size={"sm"}
                marginTop={"3"}
                disabled={isAttemptButtonDisabled}
                onClick={handleAttempt}
            >
                Attempt
            </Button>
        </Flex >

        <Footer FinishButton={FinishButton} />
    </>
}

export default Game;