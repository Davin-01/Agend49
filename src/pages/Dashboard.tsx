import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  BarChart3, 
  Bot, 
  Wallet, 
  Store, 
  Users, 
  Mic,
  Volume2,
  Trophy,
  Zap,
  Brain,
  Shield,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Settings,
  Star,
  TrendingUp,
  Activity,
  Target
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

// Mock data for dashboard
const mockUser = {
  name: "Alex Chen",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  level: 12,
  xp: 2450,
  nextLevelXp: 3000
};

const mockStats = {
  activeAgents: 8,
  totalInteractions: 15420,
  walletBalance: 1250.75,
  collaborations: 3
};

const mockAgents = [
  {
    id: 1,
    name: "DataAnalyst Pro",
    description: "Advanced data analysis and visualization agent",
    avatar: "🤖",
    capabilities: ["Memory", "Analytics", "Collaboration"],
    status: "active",
    interactions: 1250
  },
  {
    id: 2,
    name: "Customer Support",
    description: "24/7 customer service automation agent",
    avatar: "🎧",
    capabilities: ["Voice", "Memory", "Support"],
    status: "active",
    interactions: 890
  },
  {
    id: 3,
    name: "Content Creator",
    description: "AI-powered content generation and optimization",
    avatar: "✍️",
    capabilities: ["Creative", "Memory", "SEO"],
    status: "active",
    interactions: 650
  },
  {
    id: 4,
    name: "Research Assistant",
    description: "Comprehensive research and fact-checking agent",
    avatar: "🔍",
    capabilities: ["Research", "Memory", "Analysis"],
    status: "active",
    interactions: 420
  }
];

const mockCollaborations = [
  {
    id: 1,
    name: "Marketing Team",
    agents: ["Content Creator", "DataAnalyst Pro"],
    mode: "Expert Panel",
    status: "active"
  },
  {
    id: 2,
    name: "Support Squad",
    agents: ["Customer Support", "Research Assistant"],
    mode: "Task Chain",
    status: "active"
  }
];

const Dashboard = () => {
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const nextAgent = () => {
    setCurrentAgentIndex((prev) => (prev + 1) % mockAgents.length);
  };

  const prevAgent = () => {
    setCurrentAgentIndex((prev) => (prev - 1 + mockAgents.length) % mockAgents.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={mockUser} />

      {/* Welcome Hero Section */}
      <section className="relative pt-16 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-dot-pattern opacity-20" style={{ backgroundSize: '20px 20px' }} />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Welcome back, <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{mockUser.name}</span>!
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
              Manage your AI agents, analyze performance, and collaborate smarter.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/agents/create">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glow-sm hover:shadow-glow">
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Agent
                </Button>
              </Link>
              <Link to="/analytics">
                <Button variant="outline" size="lg">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Cards Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Create Agent",
                description: "Build a new AI agent",
                icon: <Bot className="w-8 h-8 text-primary" />,
                link: "/agents/create",
                stats: null
              },
              {
                title: "Analytics Summary",
                description: `${mockStats.activeAgents} active agents`,
                icon: <BarChart3 className="w-8 h-8 text-primary" />,
                link: "/analytics",
                stats: `${mockStats.totalInteractions.toLocaleString()} interactions`
              },
              {
                title: "Wallet Overview",
                description: `$${mockStats.walletBalance.toFixed(2)} balance`,
                icon: <Wallet className="w-8 h-8 text-primary" />,
                link: "/wallet",
                stats: "3 recent transactions"
              },
              {
                title: "Marketplace",
                description: "Browse agent templates",
                icon: <Store className="w-8 h-8 text-primary" />,
                link: "/marketplace",
                stats: "50+ templates available"
              }
            ].map((card, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }}>
                <Link to={card.link}>
                  <Card className="h-full bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                          {card.icon}
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {card.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-2">
                        {card.description}
                      </p>
                      
                      {card.stats && (
                        <p className="text-xs text-primary font-medium">
                          {card.stats}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Active Agents Carousel */}
      <section className="py-12 px-6 bg-card/20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-foreground">Your Active Agents</h2>
              <Link to="/agents">
                <Button variant="outline">
                  View All Agents
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevAgent}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-card hover:border-primary/30 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <button
              onClick={nextAgent}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-card hover:border-primary/30 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            {/* Agents Carousel */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: -currentAgentIndex * 320 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {mockAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    className="flex-shrink-0 w-80"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="h-full bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-2xl">
                            {agent.avatar}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                              {agent.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {agent.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-primary">
                              <Activity className="w-3 h-3" />
                              {agent.interactions.toLocaleString()} interactions
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {agent.capabilities.map((capability) => (
                            <Badge key={capability} variant="secondary" className="text-xs">
                              {capability}
                            </Badge>
                          ))}
                        </div>

                        <Link to={`/agents/${agent.id}`}>
                          <Button variant="outline" className="w-full">
                            <Settings className="w-4 h-4 mr-2" />
                            Manage Agent
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {mockAgents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAgentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentAgentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Agent Collaboration Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-foreground">Your Agent Teams</h2>
              <Link to="/collaborations/create">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Collaboration
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCollaborations.map((collaboration, index) => (
              <motion.div
                key={collaboration.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {collaboration.name}
                        </h3>
                        <Badge variant="secondary" className="mb-3">
                          {collaboration.mode}
                        </Badge>
                      </div>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    </div>

                    {/* Agent Connection Visualization */}
                    <div className="flex items-center justify-center mb-4 py-4">
                      <div className="flex items-center gap-4">
                        {collaboration.agents.map((agentName, agentIndex) => (
                          <div key={agentIndex} className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6 text-primary" />
                            </div>
                            {agentIndex < collaboration.agents.length - 1 && (
                              <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-accent mx-2" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {collaboration.agents.map((agentName, agentIndex) => (
                        <div key={agentIndex} className="text-sm text-muted-foreground">
                          • {agentName}
                        </div>
                      ))}
                    </div>

                    <Link to={`/collaborations/${collaboration.id}`}>
                      <Button variant="outline" className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Team
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice Interaction Feature */}
      <section className="py-12 px-6 bg-card/20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">Talk to Your Agents</h2>
            <p className="text-muted-foreground mb-8">
              Interact with your AI agents using natural voice commands
            </p>

            <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-8 mb-6">
                  <motion.button
                    onClick={() => setIsVoiceActive(!isVoiceActive)}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isVoiceActive
                        ? 'bg-gradient-to-r from-primary to-accent shadow-glow'
                        : 'bg-gradient-to-br from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mic className={`w-8 h-8 ${isVoiceActive ? 'text-white' : 'text-primary'}`} />
                  </motion.button>

                  <motion.button
                    className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center hover:from-primary/30 hover:to-accent/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Volume2 className="w-6 h-6 text-primary" />
                  </motion.button>
                </div>

                <p className="text-sm text-muted-foreground">
                  {isVoiceActive ? "Listening... Speak your command" : "Click the microphone to start voice interaction"}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Gamification/Progress Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-foreground">Your Achievements</h2>
              <Link to="/achievements">
                <Button variant="outline">
                  View All Achievements
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Level Progress */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Level {mockUser.level}</h3>
                      <p className="text-muted-foreground">AI Agent Master</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress to Level {mockUser.level + 1}</span>
                      <span className="text-foreground font-medium">{mockUser.xp}/{mockUser.nextLevelXp} XP</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(mockUser.xp / mockUser.nextLevelXp) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{mockStats.activeAgents}</div>
                      <div className="text-xs text-muted-foreground">Active Agents</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">{mockStats.collaborations}</div>
                      <div className="text-xs text-muted-foreground">Collaborations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">{(mockStats.totalInteractions / 1000).toFixed(1)}K</div>
                      <div className="text-xs text-muted-foreground">Interactions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Badges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Agent Creator", icon: "🤖", description: "Created 5+ agents" },
                    { name: "Collaborator", icon: "🤝", description: "Set up team collaboration" },
                    { name: "Voice Pioneer", icon: "🎤", description: "Used voice features" }
                  ].map((badge, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-card/30 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-2xl">{badge.icon}</div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{badge.name}</div>
                        <div className="text-xs text-muted-foreground">{badge.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats Footer */}
      <section className="py-8 px-6 bg-card/20 border-t border-border">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Total Agents", value: mockStats.activeAgents, icon: <Bot className="w-5 h-5" /> },
              { label: "Interactions", value: `${(mockStats.totalInteractions / 1000).toFixed(1)}K`, icon: <Activity className="w-5 h-5" /> },
              { label: "Wallet Balance", value: `$${mockStats.walletBalance}`, icon: <Wallet className="w-5 h-5" /> },
              { label: "Success Rate", value: "94%", icon: <TrendingUp className="w-5 h-5" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-primary">{stat.icon}</div>
                <div>
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
