"use client";

import { createElement, useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";
import { registerGlassLayer } from "./glassRegistry";

export type GlassTint = "light" | "dark" | "accent";
export type GlassElevation = 1 | 2 | 3;

type GlassOwnProps = {
  blur?: number;
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
  blur,
  tint = "dark",
  elevation = 1,
  as,
  className,
  children,
  style,
  ...props
}: GlassProps<T>) {
  const elementRef = useRef<Element | null>(null);
  const [blurActive, setBlurActive] = useState(false);
  const Component = as || "div";
  const mergedStyle = {
    ...style,
    "--glass-blur": typeof blur === "number" ? blur + "px" : "var(--elevation-" + elevation + "-blur)",
  } as CSSProperties;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    return registerGlassLayer(element, setBlurActive);
  }, []);

  return createElement(
    Component,
    {
      ...props,
      ref: elementRef,
      className: ["glass-surface", className].filter(Boolean).join(" "),
      style: mergedStyle,
      "data-tint": tint,
      "data-elevation": String(elevation),
      "data-blur-active": blurActive ? "true" : "false",
    },
    children,
  );
}