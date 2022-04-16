import { HStack } from "@chakra-ui/react";
import { InputBox } from "../InputBox";
import { useState, useRef, useEffect } from 'react';

const InputRow = ({ setIsAttemptButtonDisabled }) => {
    const [wordValue, setWordValue] = useState("");
    const [boxesValues, setBoxesValues] = useState(["", "", "", "", ""])
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (wordValue.length == 5) {
            setIsAttemptButtonDisabled(false);
        }
    }, [wordValue]);

    const handleBoxInput = (value, index) => {
        boxesValues[index] = value;
        setBoxesValues([...boxesValues]);
        setWordValue(boxesValues.join(""));
        if (value) {
            setCurrentIndex(currentIndex + 1);
        }

    }

    return <HStack margin={1}>
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
                />
            })
        }
    </HStack>
}

export { InputRow };