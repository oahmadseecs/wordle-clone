import { HStack, VStack, Button } from "@chakra-ui/react";
import { InputBox } from "../InputBox";
import { useState, useEffect } from 'react';

const InputRow = ({ setIsAttemptButtonDisabled, isAttemptButtonDisabled, handleAttempt, attempt, isGameOver, isGameUIDisabled }) => {
    const [wordValue, setWordValue] = useState("");
    const [boxesValues, setBoxesValues] = useState(["", "", "", "", ""])
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (wordValue.length == 5 && !isGameOver) {
            setIsAttemptButtonDisabled(false);
        }
    }, [wordValue]);

    useEffect(() => {
        console.log({ attempt })
    }, [attempt]);

    const handleBoxInput = (value, index) => {
        boxesValues[index] = value;
        setBoxesValues([...boxesValues]);
        setWordValue(boxesValues.join(""));
        if (value) {
            setCurrentIndex(currentIndex + 1);
        }

    }

    const handleAttemptButtonClick = () => {
        handleAttempt(wordValue);
    }

    return attempt.state === "current" ? <VStack>
        <HStack margin={1}>
            {
                boxesValues.map((value, i) => {
                    return <InputBox
                        key={i}
                        isFocusSet={currentIndex === i}
                        index={i}
                        value={value}
                        handleBoxInput={handleBoxInput}
                        setCurrentIndex={setCurrentIndex}
                        currentIndex={currentIndex}
                        isGameUIDisabled={isGameUIDisabled}
                    />
                })
            }
        </HStack>
        <Button
            variant={"solid"}
            colorScheme="green"
            size={"sm"}
            marginTop={"3"}
            disabled={isAttemptButtonDisabled}
            onClick={handleAttemptButtonClick}
        >
            Attempt
        </Button>
    </VStack>
        :
        <HStack>
            {
                boxesValues.map((value, i) => {
                    return <InputBox
                        key={i}
                        index={i}
                        value={value}
                        handleBoxInput={handleBoxInput}
                        setCurrentIndex={setCurrentIndex}
                        currentIndex={currentIndex}
                        result={attempt.results.find(result => result.letter == value.toLowerCase()).state}
                        isGameUIDisabled={isGameUIDisabled}
                    />
                })
            }
        </HStack>
}

export { InputRow };