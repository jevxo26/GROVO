import { ModeToggle } from "@/components/ui/modeToggle";

export default function Home() {
  return (
    <div className="justify-center items-center p-20">
      <h1>
        Hi Developer Make sure you to add all the components with the help of
        claud ai.
      </h1>
      <h1>Also make sure to add dark theme color to every components. </h1>
      <h1>
        So that if the theme is changed it looks good. Also only work on
        dashboard not in the homepage.
      </h1>
      <h1>
        Also Create any folder on (dashboardLayout)/dashboard folder. Not on
        dashboardLayout(This is very important).
      </h1>
      <ModeToggle />
    </div>
  );
}
