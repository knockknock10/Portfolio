"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { readDurationToken, readMotionNumber, useSpringToken } from "./motionTokens";

type MagneticButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onDrag" | "onDragStart" | "onDragEnd"> & {
  children: ReactNode;
  className?: string;
};

export function MagneticButton({
  children,
  className,
  disabled = false,
  onPointerMove,
  onPointerLeave,
  ...props
}: MagneticButtonProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [supportsMagnet, setSupportsMagnet] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const spring = useSpringToken("snappy");
  const noMotionDuration = readDurationToken("--duration-none");

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setSupportsMagnet(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  function handlePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    onPointerMove?.(event);
    if (!supportsMagnet || prefersReducedMotion || disabled || event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const maxOffset = readMotionNumber("--magnetic-max-offset");
    const attraction = (value: number) => Math.max(-maxOffset, Math.min(maxOffset, value * 0.12));

    setOffset({
      x: attraction(event.clientX - (bounds.left + bounds.width / 2)),
      y: attraction(event.clientY - (bounds.top + bounds.height / 2)),
    });
  }

  function handlePointerLeave(event: ReactPointerEvent<HTMLButtonElement>) {
    onPointerLeave?.(event);
    setOffset({ x: 0, y: 0 });
  }

  return (
    <motion.button
      {...props}
      type={props.type || "button"}
      disabled={disabled}
      className={["magnetic-button", className].filter(Boolean).join(" ")}
      animate={supportsMagnet && !prefersReducedMotion ? offset : { x: 0, y: 0 }}
      transition={prefersReducedMotion ? { duration: noMotionDuration } : spring || { duration: noMotionDuration }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span className="magnetic-button__label">{children}</span>
    </motion.button>
  );
}