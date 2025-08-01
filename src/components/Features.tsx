import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Wallet, Users, BarChart3, Mic, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Agent Management",
      description: "Create, customize, and deploy intelligent AI agents with advanced memory systems and function calling capabilities.",
    },
    {
      icon: Wallet,
      title: "Stellar Wallet Integration",
      description: "Seamless cryptocurrency wallet functionality with secure transactions and advanced portfolio management.",
    },
    {
      icon: Users,
      title: "Multi-Agent Collaboration",
      description: "Coordinate multiple agents for complex tasks with expert panels, debates, and chain-of-thought patterns.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive usage tracking, performance insights, and collaboration analytics for individual and group activities.",
    },
    {
      icon: Mic,
      title: "Voice Capabilities",
      description: "Integrated text-to-speech and speech-to-text functionality powered by ElevenLabs for natural conversations.",
    },
    {
      icon: Zap,
      title: "Smart Functions",
      description: "Intelligent function selection based on context with custom function calling to extend agent capabilities.",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powerful Features for Modern AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to build, deploy, and manage sophisticated AI agents with 
            advanced memory, collaboration, and blockchain integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:border-primary/30 transition-all duration-300 hover:shadow-glow-sm bg-card/50 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-accent rounded-lg group-hover:shadow-glow-sm transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;