import { HStack } from "@chakra-ui/react";
import { InputBox } from "../InputBox";
import { useState, useRef, useEffect } from 'react';

const InputRow = () => {
    const [wordValue, setWordValue] = useState("");
    const [boxesValues, setBoxesValues] = useState(["", "", "", "", ""])
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        console.log({ currentIndex });
    }, [currentIndex]);

    const handleBoxInput = (value, index) => {
        boxesValues[index] = value;
        setBoxesValues([...boxesValues]);
        setWordValue(boxesValues.join());
        if (value) {
            setCurrentIndex(currentIndex + 1);
        }

    }

    return <HStack>
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