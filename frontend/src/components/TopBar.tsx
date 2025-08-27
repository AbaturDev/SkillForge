import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { ColorModeSwitch } from "./ColorModeSwitch";

export const TopBar = () => {
  return (
    <HStack justifyContent="space-between" paddingX={2}>
      <Image src={logo} boxSize="55px" />
      <ColorModeSwitch />
    </HStack>
  );
};
