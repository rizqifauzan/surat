"use client";

import React from "react";

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block mb-3">
      <span className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        "w-full rounded border border-slate-300 px-2 py-1.5 text-sm focus:border-slate-500 focus:outline-none " +
        (props.className || "")
      }
    />
  );
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={
        "w-full rounded border border-slate-300 px-2 py-1.5 text-sm focus:border-slate-500 focus:outline-none " +
        (props.className || "")
      }
    />
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}) {
  const styles: Record<string, string> = {
    primary: "bg-slate-800 text-white hover:bg-slate-700",
    secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",
    danger: "bg-red-600 text-white hover:bg-red-500",
    ghost: "text-slate-600 hover:bg-slate-100",
  };
  return (
    <button
      {...props}
      className={`rounded px-3 py-1.5 text-sm font-medium transition disabled:opacity-50 ${styles[variant]} ${className}`}
    />
  );
}

// Editor untuk array of string (mis. agenda).
export function StringList({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={item}
            placeholder={placeholder}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
          />
          <Button
            variant="ghost"
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            ✕
          </Button>
        </div>
      ))}
      <Button
        variant="secondary"
        type="button"
        onClick={() => onChange([...items, ""])}
      >
        + Tambah
      </Button>
    </div>
  );
}
