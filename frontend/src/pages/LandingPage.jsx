import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SocialProofBar from "@/components/landing/SocialProofBar";
import PainPoints from "@/components/landing/PainPoints";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Gallery from "@/components/landing/Gallery";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import LeadForm from "@/components/landing/LeadForm";
import StickyMobileCTA from "@/components/landing/StickyMobileCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main data-testid="landing-page" className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <SocialProofBar />
      <PainPoints />
      <HowItWorks />
      <Features />
      <Gallery />
      <Pricing />
      <Testimonials />
      <FAQ />
      <LeadForm />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
