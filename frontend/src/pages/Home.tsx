import { Text, Image, Center, VStack, Box } from "@chakra-ui/react";
import skill from "../assets/skill.webp";

export const Home = () => {
  return (
    <Center paddingY={3}>
      <Box display="flex">
        <VStack padding={5}>
          <Text fontSize="3xl" fontWeight="bold">
            Welcome to the Skill Forge!
          </Text>
          <Image src={skill} boxSize={500} padding={4} objectFit="contain" />
          <Text fontSize="sm" padding={10}>
            This is just a proof of concept demo project 🚀
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};
