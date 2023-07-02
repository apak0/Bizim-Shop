import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

function AdminHome() {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      p={2}
      bg={"#8d8d8d"}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={"3xl"}
        as="b"
        color={"orange.300"}
      >
        <Text>Admin Page</Text>
      </Box>
    </Flex>
  );
}

export default AdminHome;
