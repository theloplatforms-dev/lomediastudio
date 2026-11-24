import type { Metadata } from "next";
import { Suspense } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import MissionVision from "./components/MissionVision";
import Get from "./components/get";
import Testimonials from "./components/testimonials";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Each below-the-fold section sits in its own Suspense boundary. The HTML is still fully
// server-rendered (good for SEO), but React hydrates each section as a separate task,
// so the browser can paint the hero (the LCP element) before all of the JavaScript has run.
export default function Home() {
  return (
    <main className="bg-black text-gray-900">
      <Suspense>
        <Hero />
      </Suspense>
      <Suspense>
        <MissionVision />
      </Suspense>
      <Suspense>
        <Services />
      </Suspense>
      <Suspense>
        <Get />
      </Suspense>
      <Suspense>
        <Testimonials />
      </Suspense>
    </main>
  );
}
