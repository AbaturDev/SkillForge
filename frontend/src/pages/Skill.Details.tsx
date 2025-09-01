import {
  Flex,
  Spinner,
  Text,
  Card,
  Badge,
  Stack,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useSkill } from "../hooks/useSkill";
import { mapSkillStatus } from "../models/skills";
import { FaCalendarTimes } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SkillsService } from "../services/skills";
import { toaster } from "../components/ui/toaster";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useState } from "react";

export const SkillDetails = () => {
  let { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const deleteSkillMutation = useMutation<void, Error, string>({
    mutationFn: (id: string) => SkillsService.deleteSkill(id),
    onSuccess: () => {
      navigate("/skills");
      toaster.create({
        description: "Successfully deleted skill",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        description: "Failed to delete the skill",
        type: "error",
      });
    },
  });

  const endSkillMutation = useMutation<void, Error, string>({
    mutationFn: (id: string) => SkillsService.endSkill(id),
    onSuccess: (_, id: string) => {
      queryClient.invalidateQueries({ queryKey: [`skills/${id}`] });
      toaster.create({
        description: "Sucessfully ended skill",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        description: "Failed to ended the skill",
        type: "error",
      });
    },
  });

  const { data, error, isLoading } = useSkill(id ?? "");

  if (!id) return <Text color="red">Invalid skill id</Text>;
  if (isLoading) return <Spinner size={"xl"} />;
  if (error) return <Text color={"red"}>{error.message}</Text>;
  if (!data) return <Text color="red">Failed to fetch skills</Text>;

  const mapBadgeColor: Record<number, string> = {
    0: "green",
    1: "yellow",
  };

  const formatDate = (date?: string) =>
    date ? new Date(date).toUTCString() : "-";

  const onDeleteConfirm = () => {
    deleteSkillMutation.mutate(data.id);
    setIsDeleteOpen(false);
  };

  const onEndConfirm = () => {
    endSkillMutation.mutate(data.id);
    setIsEndOpen(false);
  };

  return (
    <>
      <Flex gap="4" justify="center">
        <VStack>
          <Card.Root size="lg" w="full" maxW="lg">
            <Card.Header justifyContent="center" textAlign="center">
              <Flex w="full" align="center" justify="space-between">
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  flex="1"
                  textAlign="center"
                >
                  {data?.name}
                </Text>
              </Flex>
            </Card.Header>

            <Card.Body>
              <Text color="fg.muted" mb={4}>
                {data.description}
              </Text>
              <Stack gap={2}>
                <Text>Started at: {formatDate(data.createdAt)}</Text>
                {data.endedAt && (
                  <Text>Finished at: {formatDate(data.endedAt)}</Text>
                )}
              </Stack>
            </Card.Body>

            <Card.Footer justifyContent="space-between">
              <Badge colorPalette={mapBadgeColor[data.skillStatus]}>
                {mapSkillStatus(data.skillStatus)}
              </Badge>
              <Text fontSize="sm" color="gray.500" fontStyle="italic">
                Last update: {formatDate(data.updatedAt)}
              </Text>
            </Card.Footer>
          </Card.Root>
          <HStack justifyContent={"space-between"} w="full">
            <Button colorPalette={"red"} onClick={() => setIsDeleteOpen(true)}>
              <MdDeleteForever /> Delete
            </Button>
            <Button
              colorPalette={"blue"}
              disabled={data.skillStatus === 1}
              onClick={() => setIsEndOpen(true)}
            >
              <FaCalendarTimes />
              End
            </Button>
          </HStack>
        </VStack>
      </Flex>
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={onDeleteConfirm}
      />
      <ConfirmDialog
        isOpen={isEndOpen}
        onClose={() => setIsEndOpen(false)}
        onConfirm={onEndConfirm}
      />
    </>
  );
};
