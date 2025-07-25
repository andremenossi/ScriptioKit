"use client"

import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import type React from "react"

interface InteractiveButtonProps extends ButtonProps {
  baseColor: string
  hoverColor: string
  children: React.ReactNode
}

export function InteractiveButton({
  baseColor,
  hoverColor,
  children,
  className,
  variant,
  style,
  ...props
}: InteractiveButtonProps) {
  return (
    <Button
      variant={variant}
      className={className}
      style={{
        borderColor: variant === "outline" ? baseColor : undefined,
        color: variant === "outline" ? baseColor : "white",
        backgroundColor: variant === "outline" ? "transparent" : baseColor,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (variant === "outline") {
          e.currentTarget.style.backgroundColor = hoverColor
          e.currentTarget.style.borderColor = hoverColor
          e.currentTarget.style.color = "white"
        } else {
          e.currentTarget.style.backgroundColor = hoverColor
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "outline") {
          e.currentTarget.style.backgroundColor = "transparent"
          e.currentTarget.style.borderColor = baseColor
          e.currentTarget.style.color = baseColor
        } else {
          e.currentTarget.style.backgroundColor = baseColor
        }
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
