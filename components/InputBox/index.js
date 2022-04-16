import { Input, Flex } from "@chakra-ui/react";
import { useRef, useEffect, useState } from 'react';

function InputBox({ isFocusSet, index, value, handleBoxInput, setCurrentIndex, currentIndex }) {
  const inputRef = useRef();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (isFocusSet) {
      setFocus();
    }
  }, [isFocusSet])

  const setFocus = () => {
    inputRef.current.focus();
  }

  // handle key press while this box is in focus
  const handleInputChange = (keyValue) => {
    setIsDisabled(true);
    const isLetter = keyValue.length === 1 && keyValue >= "A" && keyValue <= "Z";
    const isBackSpace = ["BACKSPACE", "DELETE"].includes(keyValue);
    if ((!isLetter && !isBackSpace) || currentIndex === 5) {
      setIsDisabled(false);
      return;
    }
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

  // handle manually focus on box with mouse click
  const handleFocus = () => {
    setCurrentIndex(index);
  }

  return (
    <Input
      width={"3rem"}
      borderRadius={10}
      background="white"
      ref={el => inputRef.current = el}
      disabled={isDisabled}
      value={value}
      onKeyDown={(e) => handleInputChange(e.key.toUpperCase())}
      onFocus={handleFocus}
      onChange={() => { }}
      padding={"0 auto"}
    />)
};
export { InputBox };
