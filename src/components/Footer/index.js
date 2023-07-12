import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

function Footer() {
  return (
    <Box bg="gray.900" display={"flex"} justifyContent={"space-between"} color="white" py={4}  mt={15} position={"fixed"} bottom={0} left={0} right={0} px={10}>
      <Text fontSize="sm" mb={2}>
        &copy; {new Date().getFullYear()} Bizim Shop All rights reserved
      </Text>
      <Text fontSize="sm" mb={2}>
        Development by Muhammed Apak
      </Text>
      <Text fontSize="sm">
        Source code available on{' '}
        <Link href="https://github.com/apak0/Bizim-Shop" color="blue.300" isExternal>
          GitHub
        </Link>
      </Text>
    </Box>
  );
}

export default Footer;