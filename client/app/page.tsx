import Footer from "@/components/layout/Footer";
import Hero from "@/components/pages/landing-page/Hero";
import NavigationBar from "@/components/layout/NavigationBar";
import Features from "@/components/pages/landing-page/Features";

export default function Home() {
  return (
    <div>
      <NavigationBar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
