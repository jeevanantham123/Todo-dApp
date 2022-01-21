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
  Divider,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { TaskContext } from "./Context/appContext";
import Header from "./Components/header";
import Footer from "./Components/Footer";

function App() {
  const {
    currentAccount,
    connectWallet,
    todo,
    handleChange,
    sendTransaction,
    Tasks,
    isLoading,
  } = useContext(TaskContext);

  return (
    <Container className="bg-gray-200 min-h-screen min-w-full" p="0px">
      <Header />
      <Center className="text-black" flexDir="column" gap="20px" pb="30px">
        <InputGroup size="md" w={{ base: "90vw", md: "500px" }}>
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
                <ListIcon as={CheckCircleIcon} color="green" />
                <Text fontSize="20px" fontWeight="medium">
                  {task}
                </Text>
              </ListItem>
            );
          })}
        </List>
      </Center>
      <Footer />
    </Container>
  );
}

export default App;
