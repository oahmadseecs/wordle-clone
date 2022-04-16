import { Input, Flex } from "@chakra-ui/react";
import { useRef, useEffect, useState } from 'react';

function InputBox({ isFocusSet, index, value, handleBoxInput, setCurrentIndex, currentIndex }) {
  const inputRef = useRef();
  const [isDisabled, setIsDisabled] = useState(false);

  const setFocus = () => {
    inputRef.current.focus();
  }

  const handleInputChange = (keyValue) => {
    console.log({ value });
    console.log({ keyValue })
    setIsDisabled(true);
    const isLetter = keyValue >= "A" && keyValue <= "Z";
    const isBackSpace = ["BACKSPACE", "DELETE"].includes(keyValue);
    if (!isLetter && !isBackSpace) {
      setIsDisabled(false);
      return;
    }
    console.log({ isBackSpace })
    // if its a letter
    if (isLetter && !isBackSpace) {
      handleBoxInput(keyValue, index);
    }
    if (isBackSpace) {
      if (value) {
        handleBoxInput("", index);
      }
      else {
        if (currentIndex)
          setCurrentIndex(currentIndex - 1);
      }
    }
    setIsDisabled(false);
  }

  useEffect(() => {
    if (isFocusSet) {
      setFocus();
    }
  }, [isFocusSet])

  return (
    <Input
      width={"5ch"}
      borderRadius={10}
      background="white"
      ref={el => inputRef.current = el}
      disabled={isDisabled}
      value={value}
      onKeyDown={(e) => handleInputChange(e.key.toUpperCase())}
    />)
};
export { InputBox };
