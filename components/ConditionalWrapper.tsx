import { Component, FC, PropsWithChildren } from "react";

export type ConditionalWrapperProps = {
  wrap: boolean;
  wrapper: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
};

export const ConditionalWrapper: FC<ConditionalWrapperProps> = ({
  wrap,
  wrapper,
  children,
}) => (wrap ? wrapper(children) : children);
