import { useContext } from "react";
import { GiFoxHead } from "react-icons/gi";
import "./App.css";
import {
  Flex,
  Center,
  Icon,
  Container,
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
    <>
      <Header />
      <Container className="bg-gray-200 min-w-full pt-5" minH="90vh">
        <Center className="text-black" flexDir="column" gap="20px" pb="80px">
          {currentAccount ? (
            <>
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
            </>
          ) : (
            <Flex>
              <button
                className="text-white font-semibold bg-black p-2 rounded-md mt-10 items-center"
                onClick={connectWallet}
              >
                <Icon
                  as={GiFoxHead}
                  w={{ base: "25px", md: "30px" }}
                  h={{ base: "25px", md: "30px" }}
                  color="white"
                  mr="5px"
                />
                Connect Wallet
              </button>
            </Flex>
          )}
        </Center>
      </Container>
      <Footer />
    </>
  );
}

export default App;
