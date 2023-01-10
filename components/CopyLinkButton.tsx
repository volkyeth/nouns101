import { FC, useEffect } from "react";
import { Link, useBoolean, useClipboard } from "@chakra-ui/react";
import { PixelTooltip } from "./PixelTooltip";
import Image from "next/image";
import linkImg from "../assets/link.svg";
import { useIsMobile } from "../hooks/mobile";

export type CopyLinkButtonProps = {
  link: string;
};

export const CopyLinkButton: FC<CopyLinkButtonProps> = ({ link }) => {
  useEffect(() => {
    setValue(window.location.origin + link);
  }, []);
  const { onCopy, setValue } = useClipboard(link);
  const [copied, { on: copiedOn, off: copiedOff }] = useBoolean(false);
  const isMobile = useIsMobile();

  return (
    <PixelTooltip
      label={copied ? "Link copied!" : "Copy link"}
      isOpen={isMobile ? copied : undefined}
      closeOnClick={false}
      closeDelay={copied ? 1000 : undefined}
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
