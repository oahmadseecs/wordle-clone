import { Flex, Button, Heading, VStack, Container, Text } from "@chakra-ui/react";
import { InputRow } from "../components/InputRow";
import { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { start_game } from "../api/start_game";
import { FatalError, guess } from "../api/guess";
import { Help } from "../components/InputRow/Help";
import { ErrorBox } from "../components/ErrorBox";
import { finish_game } from "../api/finish_game";
import { useRouter } from "next/router";

const attemptsObject = [
    {
        value: "",
        state: "current",
        results: null,
        isError: false,
        errorMessage: ""
    },
    {
        value: "",
        state: "pending",
        results: null,
        isError: false,
        errorMessage: ""
    },
    {
        value: "",
        state: "pending",
        results: null,
        isError: false,
        errorMessage: ""
    },
    {
        value: "",
        state: "pending",
        results: null,
        isError: false,
        errorMessage: ""
    },
    {
        value: "",
        state: "pending",
        results: null,
        isError: false,
        errorMessage: ""
    },
    {
        value: "",
        state: "pending",
        results: null,
        isError: false,
        errorMessage: ""
    },
]

const Game = () => {
    // attempt can have three values: 'current', 'done', 'pending'
    const router = useRouter();
    const [attempts, setAttempts] = useState(attemptsObject);
    const [isAttemptButtonDisabled, setIsAttemptButtonDisabled] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentAttemptIndex, setCurrentAttemptIndex] = useState(0)
    const [gameCredentials, setGameCredentials] = useState({
        wordID: null,
        gameId: null,
        gameKey: null
    })
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameOverMessage, setGameOverMessage] = useState("");
    const [isGameUIDisabled, setIsGameUIDisabled] = useState(false);

    useEffect(() => {
        (async () => {
            const { id, key, wordID, isError, errorMessage } = await start_game();
            if (isError) {
                setIsError(true);
                setErrorMessage("Error starting game: " + errorMessage);
                return;
            }
            setGameCredentials({
                wordID: wordID,
                gameId: id,
                gameKey: key,
            })
            setIsGameUIDisabled(false);
            setIsError(false);
            setErrorMessage("");
        })();
    }, []);



    const checkAnswer = (result) => {
        return result.every(result => result.state == 2);
    }

    const handleSuccess = () => {
        setIsGameOver(true);
        setGameOverMessage("Congratulations! You have successfully guessed the correct word!");
        setIsAttemptButtonDisabled(true);
    }

    const handleAttempt = async (wordValue) => {
        const { results, isError, error } = await guess({ gameId: gameCredentials.gameId, key: gameCredentials.gameKey, value: wordValue.toLowerCase() });
        if (isError) {
            if (error instanceof FatalError) {
                attempts[currentAttemptIndex].isError = true;
                attempts[currentAttemptIndex].errorMessage = error.message;
                setIsGameUIDisabled(true);
                setIsGameOver(true);
                setIsError(true);
                setErrorMessage(error.message);
            }
            else {
                setIsError(true);
                setErrorMessage(error.message);
            }
            return;
        }
        setIsError(false);
        setErrorMessage("");

        if (checkAnswer(results)) {
            handleSuccess();
            return;
        }

        const attemptsCopy = [...attempts];

        const currentAttemptObject = {
            state: "done",
            results: results,
            isError: false,
            errorMessage: "",
            value: wordValue
        }
        attemptsCopy[currentAttemptIndex] = currentAttemptObject;


        if (currentAttemptIndex < attempts.length) {
            attemptsCopy[currentAttemptIndex + 1].state = "current";
            setCurrentAttemptIndex(currentAttemptIndex + 1);
        }
        setAttempts(attemptsCopy);
        setIsAttemptButtonDisabled(true);

    }

    const handleGameFinish = async () => {
        const { answer, isError, errorMessage } = await finish_game({ gameId: gameCredentials.gameId, gameKey: gameCredentials.gameKey })
        if (isError) {
            setIsError(true);
            setErrorMessage(errorMessage);
            return;
        }
        setIsGameOver(true)
        setGameOverMessage(`The correct answer for this wordle was ${answer}. Please try again, you can do it this time.`);
    }

    const FinishButton = () => <Button margin={25} colorScheme="red" onClick={handleGameFinish}>Finish Game</Button>
    const RestartButton = () => <Button margin={25} colorScheme="gray" onClick={() => router.reload()}>Restart Game</Button>


    // TODO: Add proper error handling
    // TODO: Refactor for network calls -> use axios
    // TODO: Add environment variables
    // TODO: Thorough QA

    return <>
        <Container marginTop={"4%"}>
            <Heading textAlign={"center"}>Welcome to Wordle-Clone</Heading>
            <Text textAlign="center">
                Please guess the correct word, you have a total of 6 attempts to guess the word correctly. <b>Remember, only valid words are accepted.</b>
            </Text>
        </Container>
        {
            isError && <ErrorBox errorMessage={errorMessage}></ErrorBox>
        }
        <Flex
            width={"100%"}
            flexDirection="row"
        >
            {!isGameUIDisabled && <Flex flex="1" justify={"center"} alignItems="center">
                <VStack>
                    <Heading size="lg">{isGameOver ? "SCORE" : "ATTEMPT"}</Heading>
                    <Heading size="xl">{currentAttemptIndex + 1} / {attempts.length}</Heading>
                </VStack>
            </Flex>}
            <Flex flex="1" flexDirection={"column"} justifyContent="center" alignItems={"center"}>
                {isGameOver && <Text marginBottom={10} color={"green"}>
                    {gameOverMessage}
                </Text>}
                {
                    attempts.map((attempt, index) => {
                        if (attempt.state === "current" || attempt.state === "done") {
                            return <InputRow
                                attempt={attempt}
                                key={index}
                                setIsAttemptButtonDisabled={setIsAttemptButtonDisabled}
                                isAttemptButtonDisabled={isAttemptButtonDisabled}
                                handleAttempt={handleAttempt}
                                isGameOver={isGameOver}
                                isGameUIDisabled={isGameUIDisabled}
                            />
                        }
                    })
                }
            </Flex>
            {!isGameUIDisabled && <Flex flex="1">
                <Help></Help>
            </Flex>}
        </Flex >

        <Footer Button={!isGameOver ? FinishButton : RestartButton} />
    </>
}

export default Game;