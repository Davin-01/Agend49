import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Brain, Zap, Users, Shield } from "lucide-react";
import heroBackground from "@/assets/hero-ai-bg.jpg";
import teamCollaboration from "@/assets/team-collaboration.jpg";
import walletInterface from "@/assets/wallet-interface.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img 
          src={heroBackground} 
          alt="AI Technology Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div 
          className="absolute inset-0 bg-dot-pattern animate-float"
          style={{ backgroundSize: '20px 20px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20" />
      </div>

      {/* Availability Notice */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-border rounded-full px-6 py-3 animate-fade-in">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Available now, only 3 spots left</span>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Hero Content */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 tracking-tight animate-fade-in">
                nc<span className="text-primary">AGENTS</span>
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                <p className="text-xl md:text-2xl text-muted-foreground">
                  Home of intelligent agents
                </p>
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Build, deploy, and manage sophisticated AI agents with advanced memory, 
                multi-agent collaboration, and seamless blockchain integration.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-lg">
                  <Brain className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground">Smart Memory</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-lg">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground">Multi-Agent</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-lg">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground">Fast Deploy</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-lg">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground">Secure Web3</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <Button variant="outline" size="xl" className="group w-full sm:w-auto">
                Read Docs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                Launch App
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="space-y-6">
            <Card className="group hover:shadow-glow-sm transition-all duration-300 bg-card/30 backdrop-blur-sm border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <div className="p-6 flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Multi-Agent Collaboration</h3>
                    <p className="text-sm text-muted-foreground">
                      Coordinate intelligent agents for complex problem-solving with expert panels and debates.
                    </p>
                  </div>
                  <div className="w-24 h-24 relative">
                    <img 
                      src={teamCollaboration} 
                      alt="Team Collaboration"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-glow-sm transition-all duration-300 bg-card/30 backdrop-blur-sm border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <div className="w-24 h-24 relative">
                    <img 
                      src={walletInterface} 
                      alt="Wallet Interface"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Stellar Wallet Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      Seamless cryptocurrency transactions with advanced portfolio management.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center lg:text-left">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-semibold">10,000+</span> agents deployed • 
                <span className="text-primary font-semibold ml-2">50+</span> integrations • 
                <span className="text-primary font-semibold ml-2">99.9%</span> uptime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;