import { Spinner, Table, Text } from "@chakra-ui/react";
import { useSkills } from "../hooks/useSkills";

export const Skills = () => {
  const { skills, error, isLoading } = useSkills({
    pageSize: 10,
    pageNumber: 1,
  });

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red">{error}</Text>;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Description</Table.ColumnHeader>
          <Table.ColumnHeader>Status</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Options</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {skills.map((skill) => (
          <Table.Row key={skill.id}>
            <Table.Cell>{skill.name}</Table.Cell>
            <Table.Cell>{skill.description}</Table.Cell>
            <Table.Cell>{skill.skillStatus}</Table.Cell>
            <Table.Cell textAlign="end">...</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
