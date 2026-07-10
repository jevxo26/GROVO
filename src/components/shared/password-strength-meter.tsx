import { cn } from "@/lib/utils"

const levels = [
  { label: "Enter at least 8 characters", className: "bg-border" },
  { label: "Weak — add more characters", className: "bg-destructive" },
  { label: "Fair — add a number", className: "bg-chart-3" },
  { label: "Good — add a special character", className: "bg-chart-2" },
  { label: "Strong password", className: "bg-primary" },
]

function scoreOf(password: string) {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9!@#$%^&*]/.test(password)) score++
  return score
}

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null

  const score = scoreOf(password)
  const { label, className } = levels[score]

  return (
    <div className="animate-in fade-in slide-in-from-top-1 flex flex-col gap-1.5 duration-200">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((bar) => (
          <div
            key={bar}
            className={cn(
              "h-1 flex-1 rounded-full bg-border transition-colors",
              bar < score && className
            )}
          />
        ))}
      </div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  )
}
