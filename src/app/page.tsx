import { Section } from "@/common/ui/Section";
import { AudioHistorySection } from "@/features/tts/components/AudioHistorySection";
import { TTSForm } from "@/features/tts/components/TTSForm";

export default function HomePage() {
  return (
    <main className="text-lg leading-relaxed space-y-10 px-4 pb-10 max-w-3xl mx-auto">
      <Section title="Texto a voz">
        <TTSForm />
      </Section>

      <AudioHistorySection />
    </main>
  );
}
