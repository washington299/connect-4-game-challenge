import { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Heading,
  Stack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Show,
  Button,
} from '@chakra-ui/react';
import { useSetRecoilState } from "recoil";

import { playersInfoState } from "state";

const PlayersInfoModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [player1Info, setPlayer1Info] = useState({ name: '', color: '' });
  const [player2Info, setPlayer2Info] = useState({ name: '', color: '' });
  const [hasError, setHasError] = useState(false);

  const setPlayersInfo = useSetRecoilState(playersInfoState);
  const { onClose } = useDisclosure();

  // for some reason chakra ui is not able to put margin on some elements, so it was needed to add these consts.
  const dividerMarginX = { margin: "0 40px" };
  const dividerMarginY = { margin: "20px 0" };
  const removeMargin = { margin: 0 };

  const handlePlayer1Fields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer1Info(previous => ({ ...previous, [e.target.name]: e.target.value }));
  };

  const handlePlayer2Fields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer2Info(previous => ({ ...previous, [e.target.name]: e.target.value }));
  };

  const handleClick = () => {
    if (!player1Info.name || !player1Info.color || !player2Info.name || !player2Info.color) {
      setHasError(true);
      return;
    }
    
    // add # before color string.
    const player1Payload = { ...player1Info, color: `#${player1Info.color}` };
    const player2Payload = { ...player2Info, color: `#${player2Info.color}` };

    setPlayersInfo({ "1": player1Payload, "2": player2Payload });
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <Modal isOpen={isModalOpen} onClose={onClose} isCentered scrollBehavior="inside" size="5xl">
      <ModalOverlay />

      <ModalContent>
        <ModalBody py={8}>
          <Heading as="h1" textAlign="center">Players Info</Heading>

          <Stack
            w="full"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            mt={12}
          >
            <VStack w="full">
              <Heading as="h2" fontSize="2xl">Player 1</Heading>
              
              <VStack spacing={8} w="full">
                <FormControl isRequired>
                  <FormLabel htmlFor='player1_name' mb={0}>Name</FormLabel>
                  <Input
                    id='player1_name'
                    name="name"
                    type='text'
                    placeholder="Type a name"
                    value={player1Info.name}
                    onChange={handlePlayer1Fields}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor='player1_color' mb={0}>Color(Hex)</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray" children="#" />
                    <Input
                      id='player1_color'
                      name="color"
                      type='text'
                      placeholder="Type a hexadecimal"
                      value={player1Info.color}
                      onChange={handlePlayer1Fields}
                      maxLength={6}
                    />
                  </InputGroup>
                </FormControl>
              </VStack>
            </VStack>

            <Show above="md">
              <Text fontSize="3xl" style={dividerMarginX}>X</Text>
            </Show>

            <Show below="md">
              <Text fontSize="3xl" style={dividerMarginY}>X</Text>
            </Show>

            <VStack w="full" style={removeMargin}>
              <Heading as="h2" fontSize="2xl">Player 2</Heading>
              
              <VStack spacing={8} w="full">
                <FormControl isRequired>
                  <FormLabel htmlFor='player2_name' mb={0}>Name</FormLabel>
                  <Input
                    id='player2_name'
                    name="name"
                    type='text'
                    placeholder="Type a name"
                    value={player2Info.name}
                    onChange={handlePlayer2Fields}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor='player2_color' mb={0}>Color(Hex)</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray" children="#" />
                    <Input
                      id='player2_color'
                      name="color"
                      type='text'
                      placeholder="Type a hexadecimal"
                      value={player2Info.color}
                      onChange={handlePlayer2Fields}
                      maxLength={6}
                    />
                  </InputGroup>
                </FormControl>
              </VStack>
            </VStack>
          </Stack>

          {hasError && (
            <Text color="red" textAlign="center" mt={4}>All fields are required!!</Text>
          )}

          <VStack mt={8}>
            <Button w={{ base: 'full', md: 200 }} colorScheme="green" onClick={handleClick}>
              Start
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlayersInfoModal;