import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
type LoginValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const result = await signIn(values.email, values.password);
      if (result.error) {
        setErrorMessage(result.error.message);
        return;
      }
      const state = location.state as { from?: { pathname?: string } } | null;
      const redirectTo = new URLSearchParams(location.search).get("redirect") ??
        state?.from?.pathname ?? "/";
      navigate(redirectTo.startsWith("/") && !redirectTo.startsWith("//") ? redirectTo : "/", { replace: true });
    } catch {
      setErrorMessage("Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSignIn = async () => {
    setErrorMessage(null);
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.error) setErrorMessage(result.error.message);
    } catch {
      setErrorMessage("Google sign-in could not be started. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-10 text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101010] p-6 shadow-2xl sm:p-8" aria-labelledby="login-title">
        <Link to="/" className="mb-8 flex items-center justify-center gap-3" aria-label="VexoraTube home">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF0000]">
            <Play aria-hidden="true" className="h-6 w-6 fill-black text-black" />
          </span>
          <span className="text-2xl font-extrabold tracking-tight">VexoraTube</span>
        </Link>
        <div className="mb-6 text-center">
          <h1 id="login-title" className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-white/60">Sign in to continue to your account.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {errorMessage && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{errorMessage}</p>}
          <Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email?.message} register={register("email")} />
          <div className="space-y-2">
            <Input label="Password" type="password" autoComplete="current-password" placeholder="Enter your password" error={errors.password?.message} register={register("password")} />
            <div className="text-right"><Link to="/forgot-password" className="text-sm text-white/65 underline-offset-4 hover:text-white hover:underline">Forgot password?</Link></div>
          </div>
          <Button type="submit" fullWidth size="lg" loading={loading}>Sign in</Button>
        </form>
        <div className="my-5 flex items-center gap-3 text-xs text-white/40"><span className="h-px flex-1 bg-white/10" />OR<span className="h-px flex-1 bg-white/10" /></div>
        <Button type="button" variant="secondary" fullWidth size="lg" loading={googleLoading} onClick={() => void onGoogleSignIn()}>
          <span aria-hidden="true" className="font-bold">G</span> Continue with Google
        </Button>
        <p className="mt-6 text-center text-sm text-white/60">Don&apos;t have an account? <Link to="/signup" className="font-semibold text-white underline decoration-[#FF0000] underline-offset-4 hover:text-red-300">Sign up</Link></p>
      </section>
    </main>
  );
}
