import {
  Button,
  Flex,
  IconButton,
  Spinner,
  Table,
  Text,
} from "@chakra-ui/react";
import { useSkillsList } from "../hooks/useSkillsList";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { mapSkillStatus } from "../models/skills";

export const SkillsTable = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data, error, isLoading } = useSkillsList({
    pageSize,
    pageNumber,
  });

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red">{error.message}</Text>;
  if (!data) return <Text color="red">Failed to fetch skills</Text>;

  const { items: skills, totalPages } = data;

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Details</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {skills.map((skill) => (
            <Table.Row key={skill.id}>
              <Table.Cell>{skill.name}</Table.Cell>
              <Table.Cell>{skill.description}</Table.Cell>
              <Table.Cell>{mapSkillStatus(skill.skillStatus)}</Table.Cell>
              <Table.Cell textAlign="end">
                <IconButton
                  as={"button"}
                  aria-label="details"
                  rounded={"full"}
                  variant={"ghost"}
                  onClick={() => navigate(`/skills/${skill.id}`)}
                >
                  <FaArrowAltCircleRight />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Flex justify="center" gap={4} mt={4} align={"center"}>
        <Button
          onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          disabled={pageNumber === 1}
        >
          Previous
        </Button>
        <Text>
          Page {pageNumber} of {totalPages}
        </Text>
        <Button
          onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
          disabled={pageNumber === totalPages}
        >
          Next
        </Button>
      </Flex>
    </>
  );
};
