import { FC, useEffect } from "react";
import { IconButton, Link, useBoolean, useClipboard } from "@chakra-ui/react";
import { PixelTooltip } from "./PixelTooltip";
import Image from "next/image";
import linkImg from "../assets/link.svg";

export type CopyLinkButtonProps = {
  link: string;
};

export const CopyLinkButton: FC<CopyLinkButtonProps> = ({ link }) => {
  useEffect(() => {
    setValue(window.location.origin + link);
  }, []);
  const { onCopy, setValue } = useClipboard(link);
  const [copied, { on: copiedOn, off: copiedOff }] = useBoolean(false);

  return (
    <PixelTooltip
      label={copied ? "Copied to clipboard!" : "Copy definition url"}
      closeOnClick={false}
    >
      <Link
        aria-label={"copy definition"}
        onClick={() => {
          onCopy();
          copiedOn();
          setTimeout(() => copiedOff(), 2000);
        }}
      >
        <Image src={linkImg} alt={"copy definition"} />
      </Link>
    </PixelTooltip>
  );
};
