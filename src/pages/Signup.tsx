import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const signupSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required.").max(100, "Full name is too long."),
  username: z.string().min(3, "Username must be at least 3 characters.").max(20, "Username must be 20 characters or fewer.").regex(/^[a-z0-9_]+$/, "Use lowercase letters, numbers, and underscores only."),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters.").regex(/[A-Za-z]/, "Password must include a letter.").regex(/[0-9]/, "Password must include a number."),
  confirmPassword: z.string().min(1, "Please confirm your password."),
}).refine((values) => values.password === values.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
});
type SignupValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", username: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async ({ fullName, username, email, password }: SignupValues) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const result = await signUp(email, password, username, fullName);
      if (result.error) {
        setErrorMessage(result.error.message);
        return;
      }
      setSuccessMessage("Account created. Continuing to profile setup…");
      navigate("/profile-setup", { replace: true });
    } catch {
      setErrorMessage("Unable to create your account right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-10 text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101010] p-6 shadow-2xl sm:p-8" aria-labelledby="signup-title">
        <Link to="/" className="mb-7 flex items-center justify-center gap-3" aria-label="VexoraTube home">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF0000]"><Play aria-hidden="true" className="h-6 w-6 fill-black text-black" /></span>
          <span className="text-2xl font-extrabold tracking-tight">VexoraTube</span>
        </Link>
        <div className="mb-6 text-center">
          <h1 id="signup-title" className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-white/60">Join the VexoraTube community.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {errorMessage && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{errorMessage}</p>}
          {successMessage && <p role="status" className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-300">{successMessage}</p>}
          <Input label="Full name" autoComplete="name" placeholder="Your full name" error={errors.fullName?.message} register={register("fullName")} />
          <Input label="Username" autoComplete="username" placeholder="your_username" error={errors.username?.message} register={register("username")} />
          <Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email?.message} register={register("email")} />
          <Input label="Password" type="password" autoComplete="new-password" placeholder="At least 8 characters, with a number" error={errors.password?.message} register={register("password")} />
          <Input label="Confirm password" type="password" autoComplete="new-password" placeholder="Re-enter your password" error={errors.confirmPassword?.message} register={register("confirmPassword")} />
          <Button type="submit" fullWidth size="lg" loading={loading}>Create account</Button>
        </form>
        <p className="mt-6 text-center text-sm text-white/60">Already have an account? <Link to="/login" className="font-semibold text-white underline decoration-[#FF0000] underline-offset-4 hover:text-red-300">Log in</Link></p>
      </section>
    </main>
  );
}
