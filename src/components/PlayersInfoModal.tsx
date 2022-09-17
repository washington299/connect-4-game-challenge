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
  Text,
  Show,
  Button,
  Select,
} from '@chakra-ui/react';
import { useSetRecoilState } from "recoil";

import { playersInfoState } from "state";

import { colorsList } from 'const';

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

  const handleClick = () => {
    if (!player1Info.name || !player1Info.color || !player2Info.name || !player2Info.color) {
      setHasError(true);
      return;
    }

    setPlayersInfo({ "1": player1Info, "2": player2Info });
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
                    onChange={(e) => setPlayer1Info(previous => ({ ...previous, name: e.target.value }))}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor='player1_color' mb={0}>Color</FormLabel>
                  <Select
                    id="player1_color"
                    placeholder='Choose a color'
                    name="color"
                    onChange={(e) => setPlayer1Info((previous) => ({ ...previous, color: e.target.value }))}
                  >
                    {colorsList.map(({ label, value }) => (
                      <option key={label} value={value}>{label}</option>
                    ))}
                  </Select>
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
                    onChange={(e) => setPlayer2Info(previous => ({ ...previous, name: e.target.value }))}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor='player2_color' mb={0}>Color(Hex)</FormLabel>
                  <Select
                    id="player2_color"
                    placeholder='Choose a color'
                    name="color"
                    onChange={(e) => setPlayer2Info((previous) => ({ ...previous, color: e.target.value }))}
                  >
                    {colorsList.map(({ label, value }) => (
                      <option key={label} value={value}>{label}</option>
                    ))}
                  </Select>
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