import { Box, Flex } from "@chakra-ui/react";
import { TopBar } from "./components/TopBar";
import { SideBar } from "./components/SideBar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <Flex direction="column" height="100vh">
      <Box borderBottom="1px solid" borderBottomColor="gray.300">
        <TopBar />
      </Box>

      <Flex flex="1" padding={2}>
        <Box>
          <SideBar />
        </Box>

        <Box flex="1" padding={6}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};
