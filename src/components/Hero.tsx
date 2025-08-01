import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div 
          className="absolute inset-0 bg-dot-pattern"
          style={{
            backgroundSize: '20px 20px',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20" />
      </div>

      {/* Availability Notice */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-border rounded-full px-4 py-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Available now, only 3 spots left</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-foreground mb-6 tracking-tight">
            nc<span className="text-primary">AGENTS</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-primary" />
            <p className="text-xl md:text-2xl text-muted-foreground">
              Home of intelligent agents
            </p>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button variant="outline" size="xl" className="group">
            Read Docs
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="hero" size="xl" className="group">
            Launch App
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Trust Banner */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-8">
            Trusted by developers across the AI ecosystem.
          </p>
        </div>
      </div>

    </section>
  );
};

export default Hero;