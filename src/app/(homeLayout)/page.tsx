import { HeadingText } from "@/components/common/headingText/headingText";
import { ModeToggle } from "@/components/ui/modeToggle";
import ReduxTest from "@/redux/ReduxTest";

export default function Home() {
  return (
    <div className="justify-center items-center p-20">
      <section className="py-12">
        <HeadingText
          badge="📊 OUR IMPACT IN NUMBERS"
          title="Making a Difference,"
          highlight="One Life at a Time"
          description="Every number represents a story of hope, a life touched, and a community transformed."
        />
      </section>

      <ModeToggle />
      <ReduxTest></ReduxTest>
    </div>
  );
}
