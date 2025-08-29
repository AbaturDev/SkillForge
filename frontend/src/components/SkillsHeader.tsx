import { Flex, Button, Text } from "@chakra-ui/react";

export const SkillsHeader = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center" mb={4}>
      <Text fontSize="5xl" fontWeight="bold">
        Skills List
      </Text>
      <Button colorScheme="teal">Add skill</Button>
    </Flex>
  );
};
