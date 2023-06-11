import { Avatar, Box, Button, Flex, Textarea } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

export const Home = () => {

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const fileInputRef = useRef();

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);
  };
  const handleAddPhotoClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Flex>
      <Box p={4}>
        <Flex align="center" mb={4}>
          <Avatar size="md" name="Your Name" src="your-profile-picture-url" />
          <Textarea
            ml={4}
            flex="1"
            placeholder="What's on your mind?"
            size="lg"
            resize="none"
            borderRadius="md"
            focusBorderColor="teal.400"
          />
        </Flex>

        
        <Flex justify="flex-end">
        <label htmlFor="photo-upload">
          <Button /*leftIcon={<AiOutlinePicture />}*/ colorScheme="teal" size="sm" onClick={handleAddPhotoClick}>
            Add Photo
          </Button>
          </label>
          <Button ml={2} colorScheme="teal" size="sm">
            Post
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
        </Flex>
        {selectedPhoto && (
          <Box mt={4}>
            <img src={URL.createObjectURL(selectedPhoto)} alt="Selected" width="200" />
          </Box>
        )}
      </Box>
    </Flex>
  )
}


