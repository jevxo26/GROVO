"use client";

import { ArrowRight, Loader2, Mail, User, KeyRound } from "lucide-react";
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

export default function RegisterPage() {
  const router = useRouter();
  const { toast, setToast } = useAuthToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [pending, setPending] = useState(false);

  // OTP Verification States
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpPending, setOtpPending] = useState(false);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setPending(true);

    // Split name into first and last name
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "Member";
    const lastName = nameParts.slice(1).join(" ") || "Member";

    try {
      const response = await fetch("/api/v1/user/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const resData = await response.json();
      setPending(false);

      if (!response.ok || !resData.success) {
        setToast({
          message: resData.message || "Could not register. Please try again.",
          variant: "error",
        });
        return;
      }

      setToast({
        message: "Registration successful! Verification OTP sent.",
        variant: "success",
      });
      
      // Enter OTP verification mode
      setOtpMode(true);
    } catch (err) {
      setPending(false);
      setToast({
        message: "Failed to connect to the server. Please try again.",
        variant: "error",
      });
    }
  }

  async function handleVerifyOtp(e: FormEvent) {
    e.preventDefault();
    setOtpPending(true);

    try {
      const response = await fetch("/api/v1/user/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: otpCode,
        }),
      });

      const resData = await response.json();
      setOtpPending(false);

      if (!response.ok || !resData.success) {
        setToast({
          message: resData.message || "Invalid or expired OTP code.",
          variant: "error",
        });
        return;
      }

      setToast({
        message: "Account verified successfully! Redirecting...",
        variant: "success",
      });

      // Auto-login step (we can directly call backend login or just mock redirect)
      const loginResponse = await fetch("/api/v1/user/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const loginResData = await loginResponse.json();

      if (loginResponse.ok && loginResData.success) {
        localStorage.setItem("token", loginResData.data.token);
        localStorage.setItem("user", JSON.stringify(loginResData.data.user));
      }

      // Route based on role or name keyword
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
      setOtpPending(false);
      setToast({
        message: "OTP verification failed. Please try again.",
        variant: "error",
      });
    }
  }

  return (
    <AuthShell>
      {!otpMode ? (
        <>
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Create an account
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Join the foundation to start contributing
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

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
        </>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Verify your Account
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We have sent a verification code to your email. Enter OTP below (Hint: Use default code <strong className="text-teal-600">123456</strong>)
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="otp">Enter 6-Digit OTP</Label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="otp"
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  required
                  placeholder="123456"
                  className="h-10 pl-9 text-center font-bold tracking-widest text-lg"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={otpPending}
              className="mt-4 h-10 justify-center gap-2"
            >
              {otpPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  Verify OTP & Activate
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>

            <button
              type="button"
              onClick={() => setOtpMode(false)}
              className="text-xs text-muted-foreground hover:text-foreground underline text-center mt-2"
            >
              Back to Registration
            </button>
          </form>
        </div>
      )}

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
