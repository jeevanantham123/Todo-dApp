import { Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { DiCssdeck } from "react-icons/di";
import { FaUserSecret } from "react-icons/fa";

import { TaskContext } from "../Context/appContext";

export default function Header() {
  const { currentAccount } = useContext(TaskContext);
  return (
    <HStack
      p="10px"
      position="sticky"
      top="0px"
      zIndex="999"
      className="bg-gray-200"
      borderBottom="1px solid"
      borderColor="gray.300"
      justifyContent={"space-between"}
      boxShadow="md"
    >
      <Flex className="items-center">
        <Icon as={DiCssdeck} w="40px" h="40px" />
        <Text className="text-[20px] md:text-[30px] font-semibold">
          Todo Dapp
        </Text>
      </Flex>
      {currentAccount && (
        <Flex className="items-center font-medium gap-2">
          <Icon
            as={FaUserSecret}
            w={{ base: "20px", md: "30px" }}
            h={{ base: "20px", md: "30px" }}
          />
          {currentAccount.slice(0, 5) + "...." + currentAccount.slice(35)}
        </Flex>
      )}
    </HStack>
  );
}
