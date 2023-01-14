import { FC, useEffect } from "react";
import { useAccordionItemState } from "@chakra-ui/react";

export const AutoExpander: FC<{ expand: boolean }> = ({ expand }) => {
  const { onOpen, onClose, isOpen } = useAccordionItemState();
  useEffect(() => {
    expand ? onOpen() : onClose();
  }, [expand, isOpen]);
  return <></>;
};
