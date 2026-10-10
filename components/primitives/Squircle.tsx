import { createElement } from "react";
import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";

type SquircleOwnProps = {
  radius?: number | string;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

export type SquircleProps<T extends ElementType = "div"> = SquircleOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof SquircleOwnProps | "as">;

export function Squircle<T extends ElementType = "div">({
  radius,
  as,
  className,
  children,
  style,
  ...props
}: SquircleProps<T>) {
  const Component = as || "div";
  const radiusValue = typeof radius === "number" ? radius + "px" : radius || "var(--radius-squircle)";
  const mergedStyle = {
    ...style,
    "--squircle-radius": radiusValue,
  } as CSSProperties;

  return createElement(
    Component,
    {
      ...props,
      className: ["squircle-surface", className].filter(Boolean).join(" "),
      style: mergedStyle,
    },
    children,
  );
}