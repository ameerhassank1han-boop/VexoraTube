import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});
type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }: ForgotPasswordValues) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      setSuccessMessage("Check your email for reset link");
    } catch {
      setErrorMessage("Unable to send a reset link right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-10 text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101010] p-6 shadow-2xl sm:p-8" aria-labelledby="forgot-title">
        <Link to="/" className="mb-8 flex items-center justify-center gap-3" aria-label="VexoraTube home">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF0000]"><span aria-hidden="true" className="text-2xl font-black text-black">V</span></span>
          <span className="text-2xl font-extrabold tracking-tight">VexoraTube</span>
        </Link>
        <h1 id="forgot-title" className="text-center text-2xl font-bold">Reset your password</h1>
        <p className="mb-6 mt-2 text-center text-sm text-white/60">Enter the email linked to your account and we&apos;ll send you a reset link.</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {errorMessage && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{errorMessage}</p>}
          {successMessage && <p role="status" className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-300">{successMessage}</p>}
          <Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email?.message} register={register("email")} />
          <Button type="submit" fullWidth size="lg" loading={loading}>Send reset link</Button>
        </form>
        <p className="mt-6 text-center text-sm"><Link to="/login" className="font-semibold text-white underline decoration-[#FF0000] underline-offset-4 hover:text-red-300">Back to login</Link></p>
      </section>
    </main>
  );
}
