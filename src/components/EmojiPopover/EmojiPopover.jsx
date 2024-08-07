import { useState, useRef, useEffect } from "react";
import {
  Box,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useColorMode,
} from "@chakra-ui/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import {
  emojiPickerButtonNew,
  emojiPickerSinglePost,
} from "../../styles/GlobalStyles";
import { BsEmojiSunglasses } from "../../utils/Icons";

export const EmojiPopover = ({
  commentValue,
  setCommentValue,
  inputRef,
  singlePost,
  bottom,
}) => {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef();

  const handleEmojiSelect = (emoji) => {
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    const newValue =
      commentValue.substring(0, start) +
      emoji.native +
      commentValue.substring(end);

    setCommentValue(newValue);

    setTimeout(() => {
      input.setSelectionRange(
        start + emoji.native.length,
        start + emoji.native.length
      );
      input.focus();
    }, 0);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Box
          as={BsEmojiSunglasses}
          {...emojiPickerButtonNew}
          sx={singlePost && emojiPickerSinglePost}
          title="Emoji"
          onClick={() => setIsOpen(!isOpen)}
        />
      </PopoverTrigger>
      {isOpen && (
        <PopoverContent
          ref={popoverRef}
          bottom={!bottom && "27rem"}
          bg={"transparent"}
        >
          <PopoverBody p={0}>
            <Picker
              data={data}
              onEmojiSelect={(emoji) => {
                handleEmojiSelect(emoji);
                setIsOpen(true);
              }}
              theme={colorMode}
              title="Pick an Emoji"
              emoji=""
            />
          </PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  );
};
