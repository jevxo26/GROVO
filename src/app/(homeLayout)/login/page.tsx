"use client";

import { ArrowRight, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { AuthModeTabs } from "@/components/shared/auth-mode-tabs";
import { AuthShell } from "@/components/shared/auth-shell";
import { AuthToast, useAuthToast } from "@/components/shared/auth-toast";
import { PasswordField } from "@/components/shared/password-field";
import { SocialButtons } from "@/components/shared/social-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const { toast, setToast } = useAuthToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);

    try {
      const response = await fetch("/api/v1/user/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const resData = await response.json();
      setPending(false);

      if (!response.ok || !resData.success) {
        setToast({
          message: resData.message || "Invalid credentials. Please try again.",
          variant: "error",
        });
        return;
      }

      // Store local credentials
      localStorage.setItem("token", resData.data.token);
      localStorage.setItem("user", JSON.stringify(resData.data.user));

      setToast({ message: "Welcome back! Redirecting...", variant: "success" });

      // Determine dashboard based on email signature or role
      const lowerEmail = email.toLowerCase();
      if (lowerEmail.includes("admin")) {
        router.push("/dashboard/admin");
      } else if (lowerEmail.includes("staff") || lowerEmail.includes("staf")) {
        router.push("/dashboard/staf");
      } else if (lowerEmail.includes("volunteer")) {
        router.push("/dashboard/volunteer");
      } else if (lowerEmail.includes("corporate")) {
        router.push("/dashboard/corporate");
      } else if (lowerEmail.includes("executive")) {
        router.push("/dashboard/executivemember");
      } else {
        router.push("/dashboard/member");
      }
    } catch (err) {
      setPending(false);
      setToast({
        message: "Failed to connect to the server. Please check your connection.",
        variant: "error",
      });
    }
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

        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2.5">
            <Checkbox
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <span className="text-sm font-medium text-muted-foreground">
              Remember me
            </span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="mt-2 h-10 justify-center gap-2"
        >
          {pending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Sign in to Grovo
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
