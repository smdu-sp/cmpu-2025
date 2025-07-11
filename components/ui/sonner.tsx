"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
        toast:
          'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        success:
          'group group-[.toaster]:bg-green-100 group-[.toaster]:text-green-800 group-[.toaster]:shadow-lg group-[.toaster]:border-none',
        error:
          'group group-[.toaster]:bg-red-100 group-[.toaster]:text-red-800 group-[.toaster]:shadow-lg group-[.toaster]:border-none',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
