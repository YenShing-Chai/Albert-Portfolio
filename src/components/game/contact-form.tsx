"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema, type ContactInput } from "@/lib/validators";

const field =
  "w-full rounded-md border border-[#e0cfa8] bg-[#fffdf6] px-3 py-2 text-sm text-[#4a3b28] placeholder:text-[#b0a184] focus:border-[#b98a5a] focus:outline-none focus:ring-2 focus:ring-[#e6cf9e]";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setSent(true);
        reset();
        toast.success("Message sent — I'll be in touch soon!");
      } else {
        toast.error(json.error || "Something went wrong. Please email directly.");
      }
    } catch {
      toast.error("Network error. Please email directly.");
    }
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-[#e0cfa8] bg-[#fffdf6] p-4 text-center">
        <p className="text-2xl">📬</p>
        <p className="mt-2 text-sm font-medium text-[#4a3b28]">
          Thanks! Your message is on its way.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 text-xs text-[#8a6d3b] underline underline-offset-2"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        {...register("website")}
      />

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <input
            {...register("name")}
            placeholder="Name *"
            aria-label="Name"
            className={field}
          />
          {errors.name && (
            <p className="mt-1 text-[11px] text-[#c0553f]">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email *"
            aria-label="Email"
            className={field}
          />
          {errors.email && (
            <p className="mt-1 text-[11px] text-[#c0553f]">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <input
          {...register("company")}
          placeholder="Company"
          aria-label="Company"
          className={field}
        />
        <input
          {...register("role")}
          placeholder="Role / opportunity"
          aria-label="Role or opportunity"
          className={field}
        />
      </div>

      <div>
        <textarea
          {...register("message")}
          placeholder="Your message *"
          aria-label="Message"
          rows={3}
          className={`${field} resize-none`}
        />
        {errors.message && (
          <p className="mt-1 text-[11px] text-[#c0553f]">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-[#3b2f22] py-2.5 text-sm font-semibold text-[#f7ecd6] transition-colors hover:bg-[#4a3b28] disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
