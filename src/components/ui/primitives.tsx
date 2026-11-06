import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ *
 * Primitive'y UI. Jeden zestaw tokenów dla całej witryny pSEO.
 * Zmiana wyglądu CTA w jednym miejscu = zmiana na 500 stronach.
 * ------------------------------------------------------------------ */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("container-page", className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  as: Tag = "section",
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  as?: "section" | "div" | "article";
}) {
  return (
    <Tag id={id} className={cn("py-12 sm:py-16", className)}>
      <Container>{children}</Container>
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  children,
  className,
}: {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold tracking-wide text-brand-600 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold text-brand-950 sm:text-3xl">{children}</h2>
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-500 text-white shadow-card hover:bg-accent-600 focus-visible:bg-accent-600",
  secondary:
    "bg-brand-900 text-white hover:bg-brand-800",
  ghost:
    "border border-brand-200 bg-white text-brand-900 hover:border-brand-400 hover:bg-brand-50",
};

const baseButton =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={cn(baseButton, buttonStyles[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn(baseButton, buttonStyles[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "positive" | "warning" | "brand";
  className?: string;
}) {
  const tones = {
    neutral: "bg-brand-50 text-brand-700 ring-brand-100",
    positive: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    warning: "bg-amber-50 text-amber-800 ring-amber-100",
    brand: "bg-brand-900 text-white ring-brand-900",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-100 bg-white p-6 shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
