"use client";

import { ArrowRight, Loader2, Mail, User, KeyRound, Phone, ShieldCheck } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSignUpMutation, useVerifyOtpMutation } from "@/redux/slices/userSlice";
import { getRoleDashboardPath } from "@/lib/roleUtils";

const membershipRoleOptions = [
  { value: "GENERAL_MEMBER", label: "General Member" },
  { value: "VOLUNTEER", label: "Volunteer" },
  { value: "INDIVIDUAL_DONOR", label: "Individual Donor" },
  { value: "CORPORATE_DONOR", label: "Corporate Donor" },
  { value: "STAFF", label: "Staff Member" },
  { value: "EXECUTIVE_MEMBER", label: "Executive Member" },
  { value: "COORDINATOR", label: "Regional Coordinator" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { toast, setToast } = useAuthToast();

  const [signUp, { isLoading: signUpLoading }] = useSignUpMutation();
  const [verifyOtp, { isLoading: otpLoading }] = useVerifyOtpMutation();

  // Form Field States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("GENERAL_MEMBER");
  const [agreed, setAgreed] = useState(false);

  // OTP Verification Mode
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [registeredRole, setRegisteredRole] = useState("GENERAL_MEMBER");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (!agreed) {
      setToast({
        message: "Please accept the Terms of Service & Privacy Policy to proceed.",
        variant: "error",
      });
      return;
    }

    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "Member";
    const lastName = nameParts.slice(1).join(" ") || "";

    try {
      const resData = await signUp({
        firstName,
        lastName,
        email,
        phone,
        password,
        role,
      }).unwrap();

      if (!resData.success) {
        setToast({
          message: resData.message || "Registration failed. Please try again.",
          variant: "error",
        });
        return;
      }

      setRegisteredRole(role);
      setToast({
        message: "Account created successfully! Verification OTP sent to your email.",
        variant: "success",
      });

      // Switch to Step 2: OTP Verification
      setOtpMode(true);
    } catch (err: any) {
      setToast({
        message: err?.data?.message || err?.message || "Failed to register account. Please check your data.",
        variant: "error",
      });
    }
  }

  async function handleVerifyOtp(e: FormEvent) {
    e.preventDefault();

    try {
      const resData = await verifyOtp({
        email,
        otp: otpCode,
      }).unwrap();

      if (!resData.success) {
        setToast({
          message: resData.message || "Invalid or expired OTP code.",
          variant: "error",
        });
        return;
      }

      setToast({
        message: "Account verified & activated successfully! Redirecting to dashboard...",
        variant: "success",
      });

      // Redirect user to their dynamic dashboard slot
      const userRole = resData?.data?.user?.role || registeredRole;
      const targetPath = getRoleDashboardPath(userRole);
      router.push(targetPath);
    } catch (err: any) {
      setToast({
        message: err?.data?.message || err?.message || "OTP verification failed. Please try again.",
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
              Create an Account
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Join Ashray Foundation to start contributing and making an impact
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
            or fill basic information
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="e.g. Abdur Rahman"
                  className="h-10 pl-9"
                />
              </div>
            </div>

            {/* Email Address */}
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

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+8801700000000"
                  className="h-10 pl-9"
                />
              </div>
            </div>

            {/* Membership Type / Role Select */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="role">Select Membership Type / Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Choose Role" />
                </SelectTrigger>
                <SelectContent>
                  {membershipRoleOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <PasswordField
                label="Password"
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
              />
              <PasswordStrengthMeter password={password} />
            </div>

            {/* Terms Agreement */}
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
              disabled={signUpLoading}
              className="mt-2 h-10 justify-center gap-2 bg-[#136139] hover:bg-[#0f4d2d] text-white"
            >
              {signUpLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  Register & Send Verification Code
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>
        </>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="mb-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#EAF5EF] text-[#136139] flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Verify Account via OTP
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We sent a 6-digit verification code to <strong className="text-foreground">{email}</strong>.
            </p>
            <p className="text-xs text-[#136139] mt-2 bg-[#EAF5EF] p-2 rounded-md font-medium">
              Default Development Code: <strong>123456</strong>
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
                  className="h-12 pl-9 text-center font-bold tracking-widest text-xl border-[#136139]/30 focus:border-[#136139]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={otpLoading}
              className="mt-2 h-10 justify-center gap-2 bg-[#136139] hover:bg-[#0f4d2d] text-white"
            >
              {otpLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  Verify OTP & Proceed to Dashboard
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>

            <button
              type="button"
              onClick={() => setOtpMode(false)}
              className="text-xs text-muted-foreground hover:text-foreground underline text-center mt-2"
            >
              Back to Registration Form
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
