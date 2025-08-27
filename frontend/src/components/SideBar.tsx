import { Heading, Link, List, ListItem } from "@chakra-ui/react";

export const SideBar = () => {
  const pathMap: Record<string, string> = {
    "Home Page": "/",
    "Skills Page": "/skills",
  };

  return (
    <>
      <Heading fontSize="2xl" fontWeight="bold" marginBottom={3}>
        Navigation Bar
      </Heading>
      <List.Root spaceY={1}>
        {Object.entries(pathMap).map(([name, path]) => (
          <ListItem
            key={name}
            display="flex"
            padding={3}
            borderRadius="md"
            boxShadow="sm"
            _hover={{ bg: "gray.400", transform: "scale(1.02)" }}
            transition="all 0.2s"
          >
            <Link href={path}>{name}</Link>
          </ListItem>
        ))}
      </List.Root>
    </>
  );
};
