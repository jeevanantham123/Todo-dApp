import { useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Box,
  Center,
  Container,
  Heading,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  Button,
  List,
  ListIcon,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { TaskContext } from "./Context/appContext";

function App() {
  const {
    currentUser,
    connectWallet,
    todo,
    handleChange,
    sendTransaction,
    Tasks,
    isLoading,
  } = useContext(TaskContext);
  useEffect(() => {
    if (!currentUser) connectWallet();
  }, []);
  return (
    <Container className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... min-h-screen min-w-full">
      <Center className="text-black rounded-md" flexDir="column" gap="20px">
        <Text className="text-[45px] font-semibold">Todo Dapp</Text>
        <InputGroup size="md" w={{ base: "full", md: "500px" }}>
          <Input
            value={todo}
            onChange={handleChange}
            placeholder="Enter your task here"
            bg="white"
          />
          <InputRightElement width="4.5rem">
            {isLoading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="sm"
              />
            ) : (
              <Button
                h="1.75rem"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  sendTransaction();
                }}
                colorScheme="green"
                fontWeight="semibold"
              >
                Add
              </Button>
            )}
          </InputRightElement>
        </InputGroup>
        <List spacing={3}>
          {Tasks?.map((task, i) => {
            return (
              <ListItem key={i} display="flex" alignItems="center">
                <ListIcon as={CheckCircleIcon} color="white" />
                <Text fontSize="20px">{task}</Text>
              </ListItem>
            );
          })}
        </List>
      </Center>
    </Container>
  );
}

export default App;
