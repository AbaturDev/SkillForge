import { HStack, Switch, Text } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

export const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch.Root
        onCheckedChange={toggleColorMode}
        checked={colorMode === "dark"}
        colorPalette="green"
      >
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label />
      </Switch.Root>
      <Text whiteSpace="nowrap">Dark Mode</Text>
    </HStack>
  );
};
