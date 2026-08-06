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
import { useLoginMutation } from "@/redux/slices/userSlice";
import { getRoleDashboardPath } from "@/lib/roleUtils";

export default function LoginPage() {
  const router = useRouter();
  const { toast, setToast } = useAuthToast();

  const [login, { isLoading: loginLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const resData = await login({ email, password }).unwrap();

      if (!resData.success) {
        setToast({
          message: resData.message || "Invalid credentials. Please try again.",
          variant: "error",
        });
        return;
      }

      setToast({ message: "Welcome back! Redirecting to dashboard...", variant: "success" });

      // Resolve user role from login payload (relational role assignments or user.role)
      const userRole =
        resData?.data?.user?.role ||
        resData?.data?.user?.roleAssignments?.[0]?.role?.roleName ||
        resData?.data?.user?.membership?.[0]?.membershipType ||
        "GENERAL_MEMBER";

      // Route directly to the corresponding role dashboard slot
      const targetPath = getRoleDashboardPath(userRole);
      router.push(targetPath);
    } catch (err: any) {
      setToast({
        message: err?.data?.message || err?.message || "Failed to log in. Please check your credentials.",
        variant: "error",
      });
    }
  }

  return (
    <AuthShell>
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Get Started
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
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="name@example.com"
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
            className="text-sm font-medium text-[#136139] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loginLoading}
          className="mt-2 h-10 justify-center gap-2 bg-[#136139] hover:bg-[#0f4d2d] text-white"
        >
          {loginLoading ? (
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
          className="font-medium text-[#136139] hover:underline"
        >
          Contact support
        </Link>
      </p>

      <AuthToast toast={toast} />
    </AuthShell>
  );
}
