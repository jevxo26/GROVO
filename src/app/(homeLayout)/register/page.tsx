"use client";

import { ArrowRight, Loader2, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { AuthModeTabs } from "@/components/shared/auth-mode-tabs";
import { AuthShell } from "@/components/shared/auth-shell";
import { AuthToast, useAuthToast } from "@/components/shared/auth-toast";
import { PasswordField } from "@/components/shared/password-field";
import { PasswordStrengthMeter } from "@/components/shared/password-strength-meter";
import { SocialButtons } from "@/components/shared/social-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const { toast, setToast } = useAuthToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/dashboard",
    });

    setPending(false);

    if (error) {
      setToast({
        message:
          error.message ?? "Couldn't create your account. Please try again.",
        variant: "error",
      });
      return;
    }

    setToast({
      message: "Account created! Check your email.",
      variant: "success",
    });
    router.push("/dashboard");
  }

  return (
    <AuthShell>
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Get started
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to your account or create a new one
        </p>
      </div>

      <div className="mb-8">
        <AuthModeTabs />
      </div>

      <div className="mb-6">
        <SocialButtons />
      </div>

      <div className="mb-6 flex items-center gap-4 text-xs font-medium text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or continue with email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="h-10 pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="h-10 pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <PasswordField
            label="Password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
          />
          <PasswordStrengthMeter password={password} />
        </div>

        <label className="flex items-start gap-2.5">
          <Checkbox
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked === true)}
            required
            className="mt-0.5"
          />
          <span className="text-sm leading-relaxed font-medium text-muted-foreground">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <Button
          type="submit"
          disabled={pending}
          className="mt-2 h-10 justify-center gap-2"
        >
          {pending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Create your account
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Need help?{" "}
        <Link
          href="/support"
          className="font-medium text-primary hover:underline"
        >
          Contact support
        </Link>
      </p>

      <AuthToast toast={toast} />
    </AuthShell>
  );
}
