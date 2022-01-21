import { Center, Link, Icon, Flex } from "@chakra-ui/react";
import React from "react";
import { DiGithubBadge } from "react-icons/di";
import { AiFillYoutube } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="fixed bottom-0 bg-gray-900 w-full py-4">
      <Center>
        <Flex
          textColor="white"
          fontWeight="bold"
          alignItems="center"
          gap="20px"
        >
          <Link
            href="https://github.com/jeevanantham123/web3.0-todo"
            isExternal
          >
            <Icon as={DiGithubBadge} color="white" w="30px" h="30px" mr="5px" />
            Source Code
          </Link>
          <Link href="https://youtu.be/Wn_Kb3MR_cU" isExternal>
            <Icon as={AiFillYoutube} color="red" w="30px" h="30px" mr="5px" />
            Thanks To
          </Link>
        </Flex>
      </Center>
    </div>
  );
}
