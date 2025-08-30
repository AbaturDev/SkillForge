import { Flex, Text } from "@chakra-ui/react";
import { AddSkillDialog } from "./AddSkillDialog";

export const SkillsHeader = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center" mb={4}>
      <Text fontSize="5xl" fontWeight="bold">
        Skills List
      </Text>
      <AddSkillDialog />
    </Flex>
  );
};
