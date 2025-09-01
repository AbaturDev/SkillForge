import { Button, Dialog, HStack, Portal } from "@chakra-ui/react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Atention!</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              This operation cannot be undone. Are you sure you want to confirm?
            </Dialog.Body>
            <Dialog.Footer>
              <HStack justify="space-between" w="100%">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={onConfirm}>Confirm</Button>
              </HStack>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
