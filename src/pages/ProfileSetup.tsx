import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Camera, UserRound } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const profileSchema = z.object({
  full_name: z.string().trim().min(1, "Full name is required.").max(100, "Full name is too long."),
  bio: z.string().max(200, "Bio must be 200 characters or fewer."),
});
type ProfileValues = z.infer<typeof profileSchema>;

export default function ProfileSetup() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name ?? (typeof user?.user_metadata.full_name === "string" ? user.user_metadata.full_name : ""),
      bio: profile?.bio ?? "",
    },
  });
  const bioValue = watch("bio");

  const onSubmit = async (values: ProfileValues) => {
    if (!user) {
      setErrorMessage("Your session has expired. Please sign in again.");
      return;
    }
    setErrorMessage(null);
    setLoading(true);
    try {
      const { error } = await supabase.from("users").update({
        full_name: values.full_name.trim(),
        bio: values.bio.trim() || null,
      }).eq("id", user.id);
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      navigate("/dashboard", { replace: true });
    } catch {
      setErrorMessage("Unable to save your profile right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-10 text-white">
      <section className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#101010] p-6 shadow-2xl sm:p-8" aria-labelledby="profile-setup-title">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF0000]"><UserRound aria-hidden="true" className="h-7 w-7 text-white" /></div>
          <h1 id="profile-setup-title" className="text-2xl font-bold">Set up your profile</h1>
          <p className="mt-2 text-sm text-white/60">Tell the community a little about yourself.</p>
        </div>
        {errorMessage && <p role="alert" className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{errorMessage}</p>}
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#1A1A1A]">
            {profile?.avatar_url
              ? <img src={profile.avatar_url} alt="Current profile avatar" className="h-full w-full object-cover" />
              : <Camera aria-hidden="true" className="h-7 w-7 text-white/50" />}
          </div>
          <span className="text-sm text-white/60">Avatar upload will be available soon</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <Input label="Full name" autoComplete="name" placeholder="Your full name" error={errors.full_name?.message} register={register("full_name")} />
          <div>
            <label htmlFor="bio" className="mb-2 block text-sm font-medium text-white/90">Bio (optional)</label>
            <textarea
              id="bio"
              rows={4}
              maxLength={200}
              placeholder="A few words about you…"
              aria-invalid={Boolean(errors.bio)}
              aria-describedby={errors.bio ? "bio-error bio-count" : "bio-count"}
              {...register("bio")}
              className={`block w-full resize-y rounded-xl border bg-[#1A1A1A] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/40 focus:ring-2 focus:ring-[#FF0000]/40 ${errors.bio ? "border-red-500 focus:border-red-500" : "border-white/15 focus:border-[#FF0000]"}`}
            />
            <div className="mt-1.5 flex items-start justify-between gap-3">
              {errors.bio ? <p id="bio-error" role="alert" className="text-sm text-red-400">{errors.bio.message}</p> : <span />}
              <span id="bio-count" className="shrink-0 text-xs text-white/45">{bioValue.length}/200</span>
            </div>
          </div>
          <Button type="submit" fullWidth size="lg" loading={loading}>Save and continue</Button>
          <Button type="button" variant="ghost" fullWidth onClick={() => navigate("/dashboard", { replace: true })}>Skip for now</Button>
        </form>
      </section>
    </main>
  );
}
