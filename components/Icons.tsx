import { forwardRef, Icon, IconProps } from "@chakra-ui/react";

export const SmallArrowUp = forwardRef<IconProps, "svg">((props, ref) => (
  <Icon
    ref={ref}
    color={"#2245C5"}
    w={"27px"}
    h={"27px"}
    viewBox={"0 0 27 27"}
    {...props}
  >
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 18V21H27V18H24V15H21V12H18V9H15V6H12V9H9V12H6V15H3V18H0Z"
        fill="currentColor"
      />
    </svg>
  </Icon>
));

export const ArrowUp = forwardRef<IconProps, "svg">((props, ref) => (
  <Icon ref={ref} color={"#2245C5"} {...props} viewBox={"0 0 69 69"}>
    <svg
      width="69"
      height="69"
      viewBox="0 0 69 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 52.5L0 49.5H3L3 46.5H6L6 43.5H9V40.5H12L12 37.5H15V34.5H18V31.5H21V28.5H24V25.5H27L27 22.5L30 22.5V19.5H33V16.5H36V19.5H39V22.5H42V25.5H45V28.5H48V31.5H51V34.5H54V37.5H57V40.5H60V43.5H63V46.5L66 46.5V49.5H69V52.5L0 52.5Z"
        fill="currentColor"
      />
    </svg>
  </Icon>
));
