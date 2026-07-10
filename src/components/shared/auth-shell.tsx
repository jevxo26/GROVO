import type { ReactNode } from "react"
import { Rocket, ShieldCheck, Sparkles } from "lucide-react"

import { Card } from "@/components/ui/card"

const features = [
  { icon: ShieldCheck, label: "Your data, encrypted end to end" },
  { icon: Sparkles, label: "Built for fast-moving teams" },
]

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background p-4 sm:p-6 lg:p-10">
      {/* Ambient background, built from theme tokens only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_20%_20%,color-mix(in_oklch,var(--primary),transparent_92%),transparent),radial-gradient(ellipse_50%_60%_at_85%_80%,color-mix(in_oklch,var(--primary),transparent_94%),transparent)]"
      />

      <Card className="w-full max-w-[1100px] animate-in fade-in zoom-in-95 flex-row gap-0 overflow-hidden p-0 duration-500 max-lg:flex-col">
        {/* Left — brand panel */}
        <div className="relative flex flex-col justify-between gap-10 overflow-hidden bg-muted/40 p-8 sm:p-10 lg:w-[42%] lg:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.25]"
          />

          <div className="relative z-10 flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Rocket className="size-4.5" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Grovo
            </span>
          </div>

          <div className="relative z-10 flex-1 py-6 lg:py-0">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-primary uppercase">
              Welcome
            </p>
            <h1 className="text-3xl leading-[1.15] font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              Where your team&apos;s best work grows
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Grovo keeps your projects, people, and progress in one place — so
              nothing gets lost between the plan and the work.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/50 px-4 py-3 backdrop-blur-sm"
                >
                  <Icon className="size-4 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 rounded-2xl border border-border/60 bg-background/50 p-4 backdrop-blur-sm">
            <p className="text-sm font-medium text-foreground">
              Free while Grovo is in beta
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              No credit card required to get started.
            </p>
          </div>
        </div>

        {/* Right — form panel */}
        <div className="flex flex-1 items-center justify-center bg-card p-8 sm:p-10 lg:p-14">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </Card>
    </div>
  )
}
