import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  register?: UseFormRegisterReturn;
  containerClassName?: string;
}

export default function Input({
  label,
  error,
  register,
  id,
  name,
  type = "text",
  className = "",
  containerClassName = "",
  ...props
}: InputProps) {
  const inputId = id ?? name ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={`w-full ${containerClassName}`}>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-white/90">
        {label}
      </label>
      <input
        {...register}
        {...props}
        id={inputId}
        name={register?.name ?? name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={`block w-full rounded-xl border bg-[#1A1A1A] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/40 focus:ring-2 focus:ring-[#FF0000]/40 disabled:cursor-not-allowed disabled:opacity-60 ${error ? "border-red-500 focus:border-red-500" : "border-white/15 focus:border-[#FF0000]"} ${className}`}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
