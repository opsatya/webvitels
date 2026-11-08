"use client";

import { cn } from "cn";
import { Check, CircleAlert, Mail } from "lucide-react";
import { useId, useRef, useState } from "react";

import { WhatsAppIcon } from "@/components/brand/social-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  composeEnquiry,
  type EnquiryErrors,
  type EnquiryInput,
  projectTypes,
  validateEnquiry,
} from "@/lib/enquiry";

/**
 * Front-end enquiry flow. There is no backend yet, so a valid enquiry is
 * handed off to WhatsApp or email with every field pre-filled.
 * To add a backend, POST `input` to an API route before showing "ready".
 */
type Status = { kind: "idle" } | { kind: "ready"; name: string; whatsappUrl: string; mailUrl: string };

const fieldClass =
  "h-12 rounded-md border-input bg-transparent px-4 text-base md:text-[0.9375rem] focus-visible:border-foreground focus-visible:ring-0 aria-invalid:border-destructive aria-invalid:ring-0";

export function EnquiryForm({ className }: { className?: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [type, setType] = useState("");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const input: EnquiryInput = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      type,
    };
    const found = validateEnquiry(input);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus({ kind: "ready", name: input.name.trim().split(" ")[0], ...composeEnquiry(input) });
  }

  if (status.kind === "ready") {
    return (
      <div role="status" className={cn("flex flex-col gap-6", className)}>
        <span className="grid size-12 place-items-center rounded-full bg-pass text-ink">
          <Check className="size-6" />
        </span>
        <div className="flex flex-col gap-3">
          <p className="font-display text-3xl font-semibold tracking-tight">Ready to send, {status.name}.</p>
          <p className="max-w-md text-muted-foreground">
            Pick how you want to send it. Your details are already filled in.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={status.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" /> Send on WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={status.mailUrl}>
              <Mail /> Send by email
            </a>
          </Button>
        </div>
        <Button variant="link" className="self-start" onClick={() => setStatus({ kind: "idle" })}>
          Edit details
        </Button>
      </div>
    );
  }

  const err = (k: keyof EnquiryInput) => (errors[k] ? `${uid}-${k}-error` : undefined);
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className={cn("flex flex-col gap-7", className)}>
      <fieldset aria-describedby={err("type")} className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-medium">What do you want to build?</legend>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((t) => {
            const checked = type === t.id;
            return (
              <label
                key={t.id}
                className={cn(
                  "inline-flex h-11 cursor-pointer items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
                  checked ? "border-primary bg-primary text-primary-foreground" : "border-input hover:border-foreground",
                )}
              >
                <input
                  type="radio"
                  name="type"
                  value={t.id}
                  checked={checked}
                  onChange={() => {
                    setType(t.id);
                    setErrors((e) => ({ ...e, type: undefined }));
                  }}
                  className="sr-only"
                />
                {checked && <Check aria-hidden className="size-4" />}
                {t.label}
              </label>
            );
          })}
        </div>
        {errors.type && <FieldError id={err("type")!}>{errors.type}</FieldError>}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Name" error={errors.name} errorId={err("name")} className="sm:col-span-2">
          <Input id={`${uid}-name`} name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={err("name")} className={fieldClass} />
        </Field>
        <Field id={`${uid}-email`} label="Email" error={errors.email} errorId={err("email")}>
          <Input id={`${uid}-email`} name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={err("email")} className={fieldClass} />
        </Field>
        <Field id={`${uid}-phone`} label="Phone" optional error={errors.phone} errorId={err("phone")}>
          <Input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={err("phone")} className={fieldClass} />
        </Field>
        <Field id={`${uid}-message`} label="Tell us about it" error={errors.message} errorId={err("message")} className="sm:col-span-2">
          <Textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            maxLength={2000}
            placeholder="What it should do, who it is for, and any deadline"
            aria-invalid={!!errors.message}
            aria-describedby={err("message")}
            className="min-h-32 rounded-md border-input bg-transparent px-4 py-3 text-base focus-visible:border-foreground focus-visible:ring-0 aria-invalid:border-destructive md:text-[0.9375rem]"
          />
        </Field>
      </div>

      {hasErrors && (
        <p role="alert" className="flex items-center gap-2 text-sm text-destructive">
          <CircleAlert className="size-4 shrink-0" /> Fix the highlighted fields to continue.
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" className="sm:min-w-52">
          Prepare my enquiry
        </Button>
        <p className="text-sm text-muted-foreground">We only use these details to reply to you.</p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  errorId,
  className,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  errorId?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </Label>
      {children}
      {error && errorId && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="text-sm text-destructive">
      {children}
    </p>
  );
}
