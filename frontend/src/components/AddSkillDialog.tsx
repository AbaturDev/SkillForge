import {
  Dialog,
  Portal,
  Button,
  CloseButton,
  Input,
  Field,
  Stack,
  Textarea,
  Flex,
  Text,
} from "@chakra-ui/react";
import { toaster } from "./ui/toaster";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SkillsService } from "../services/skills";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
});

type FormData = z.infer<typeof schema>;

export const AddSkillDialog = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      SkillsService.createSkill({
        name: data.name,
        description: data.description,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toaster.create({
        description: "Sucessfully created skill",
        type: "success",
      });
      setOpen(false);
      reset();
    },
    onError: () => {
      toaster.create({
        description: "Failed to create the skill",
        type: "error",
      });
      setOpen(false);
      reset();
    },
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Dialog.Trigger asChild>
        <Button colorScheme={"teal"}>Add skill</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add new skill</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Body>
                <Stack gap="4">
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input
                      variant={"outline"}
                      placeholder="Skill name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <Text color={"red"}>{errors.name.message}</Text>
                    )}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Textarea
                      variant={"outline"}
                      {...register("description")}
                      placeholder="Skill description"
                    />
                    {errors.description && (
                      <Text color={"red"}>{errors.description.message}</Text>
                    )}
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Flex justify="space-between" w="100%">
                  <Dialog.ActionTrigger asChild>
                    <Button variant={"outline"}>Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button
                    type="submit"
                    variant={"solid"}
                    loading={isSubmitting}
                  >
                    Save
                  </Button>
                </Flex>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
