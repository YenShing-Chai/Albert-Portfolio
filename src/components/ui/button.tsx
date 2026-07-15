import { type ComponentProps } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-foreground text-background hover:opacity-88",
        accent: "bg-accent text-white hover:bg-accent-strong",
        outline:
          "border border-border-strong text-foreground hover:border-foreground hover:bg-surface-2/60",
        ghost: "text-muted hover:text-foreground",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[0.95rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type BaseProps = VariantProps<typeof buttonVariants> & { className?: string };

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & BaseProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  href,
  external,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> &
  BaseProps & { href: string; external?: boolean }) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...(props as ComponentProps<"a">)}
      />
    );
  }
  return <Link href={href} className={classes} {...props} />;
}

export { buttonVariants };
