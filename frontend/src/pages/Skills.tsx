import { Table } from "@chakra-ui/react";
import { SkillsService } from "../services/skills";
import { useEffect, useState } from "react";
import type { Skill } from "../models/skills";

const d = await SkillsService.getSkillsList({ pageSize: 10, pageNumber: 1 });
console.log(d);

export const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const data = await SkillsService.getSkillsList({
        pageSize: 10,
        pageNumber: 1,
      });
      setSkills(data.items);
    };

    fetchSkills();
  }, []);

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
