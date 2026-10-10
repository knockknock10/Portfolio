import { createElement } from "react";
import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";

export type GlassTint = "light" | "dark" | "accent";
export type GlassElevation = 1 | 2 | 3;

type GlassOwnProps = {
  tint?: GlassTint;
  elevation?: GlassElevation;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

export type GlassProps<T extends ElementType = "div"> = GlassOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof GlassOwnProps | "as">;

export function Glass<T extends ElementType = "div">({
  tint = "dark",
  elevation = 1,
  as,
  className,
  children,
  style,
  ...props
}: GlassProps<T>) {
  const Component = as || "div";

  return createElement(
    Component,
    {
      ...props,
      className: ["glass-surface", className].filter(Boolean).join(" "),
      style,
      "data-tint": tint,
      "data-elevation": String(elevation),
    },
    children,
  );
}
