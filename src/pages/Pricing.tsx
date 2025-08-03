import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  X, 
  Zap, 
  Users, 
  Shield, 
  Brain, 
  Star,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  popular: boolean;
  features: PlanFeature[];
  cta: string;
  ctaLink: string;
}

interface Testimonial {
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans: Plan[] = [
    {
      name: "Free",
      description: "For Platform testing & basic usage",
      monthlyPrice: "0",
      yearlyPrice: "0",
      popular: false,
      features: [
        { name: "2 AI Agents (lifetime)", included: true },
        { name: "500 messages/month (total across all agents)", included: true },
        { name: "1 Discord deployment", included: true },
        { name: "Basic AI models only (Gemini, DeepSeek)", included: true },
        { name: "100MB memory storage", included: true },
        { name: "10 function calls/month", included: true },
        { name: "Community support only", included: true },
        { name: "Basic analytics", included: true },
        { name: "Web deployment", included: false },
        { name: "Custom models", included: false },
        { name: "Multi-agent features", included: false },
      ],
      cta: "Get Started Free",
      ctaLink: "/signup"
    },
    {
      name: "Starter Plan",
      description: "For Individual creators & small businesses",
      monthlyPrice: "14.99",
      yearlyPrice: "169.88",
      popular: true,
      features: [
        { name: "5 AI Agents", included: true },
        { name: "2,500 messages/month (500 per agent)", included: true },
        { name: "3 Discord deployments", included: true },
        { name: "All AI models (Gemini, DeepSeek, GPT-3.5, Claude-3 Haiku)", included: true },
        { name: "500MB memory storage", included: true },
        { name: "100 function calls/month", included: true },
        { name: "Email support", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Web deployment (1 site)", included: false },
        { name: "Custom agent templates", included: false },
        { name: "Basic multi-agent (2 agents max)", included: false },
      ],
      cta: "Start Plan Trial",
      ctaLink: "/signup"
    },
    {
      name: "Professional Plan",
      description: "For Growing businesses & power users",
      monthlyPrice: "39.99",
      yearlyPrice: "469.99",
      popular: false,
      features: [
        { name: "15 AI Agents", included: true },
        { name: "10,000 messages/month (667 per agent)", included: true },
        { name: "Unlimited Discord deployments", included: true },
        { name: "All AI models + GPT-4, Claude-3 Sonnet, Grok", included: true },
        { name: "2GB memory storage", included: true },
        { name: "500 function calls/month", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced analytics + insights", included: true },
        { name: "Unlimited web deployments", included: true },
        { name: "Custom integrations", included: true },
        { name: "Multi-agent collaboration (5 agents max)", included: true },
        { name: "Voice features (ElevenLabs)", included: true },
        { name: "Custom branding", included: true },
      ],
      cta: "Contact Sales",
      ctaLink: "/contact"
    },
    {
      name: "Business Plan",
      description: "For Teams & agencies",
      monthlyPrice: "79.99",
      yearlyPrice: "929.88",
      popular: false,
      features: [
        { name: "50 AI Agents", included: true },
        { name: "50,000 messages/month (1,000 per agent)", included: true },
        { name: "All platform integrations (Discord, Telegram, WhatsApp, Slack)", included: true },
        { name: "All AI models + Claude-3 Opus, GPT-4 Turbo", included: true },
        { name: "10GB memory storage", included: true },
        { name: "2,000 function calls/month", included: true },
        { name: "Dedicated support", included: true },
        { name: "Team management (5 users)", included: true },
        { name: "White-label options", included: true },
        { name: "Advanced multi-agent (10 agents max)", included: true },
        { name: "Custom model fine-tuning", included: true },
        { name: "API access", included: true },
        { name: "Advanced security features", included: true },
      ],
      cta: "Contact Sales",
      ctaLink: "/contact"
    },
    {
      name: "Enterprise Plan",
      description: "For Large organizations",
      monthlyPrice: "199.99",
      yearlyPrice: "2359.88",
      popular: false,
      features: [
        { name: "Unlimited AI Agents", included: true },
        { name: "200,000 messages/month", included: true },
        { name: "All platform integrations", included: true },
        { name: "All AI models + custom models", included: true },
        { name: "50GB memory storage", included: true },
        { name: "10,000 function calls/month", included: true },
        { name: "24/7 phone support", included: true },
        { name: "Team management (unlimited users)", included: true },
        { name: "Full white-label solution", included: true },
        { name: "Unlimited multi-agent collaboration", included: true },
        { name: "Custom integrations", included: true },
        { name: "SLA guarantees (99.9% uptime)", included: true },
        { name: "Advanced security (SSO, audit logs)", included: true },
        { name: "Custom training data", included: true },
      ],
      cta: "Contact Sales",
      ctaLink: "/contact"
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "Can I change my plan at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
    },
    {
      question: "What happens to my agents if I downgrade?",
      answer: "Your agents will remain active, but you may need to reduce the number of active agents to match your new plan's limits. We'll help you through this process."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund."
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes! Pro and Enterprise plans come with a 14-day free trial. No credit card required to start your trial."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and can arrange invoicing for Enterprise customers."
    },
    {
      question: "How does the memory storage work?",
      answer: "Memory storage is used for your AI agents' long-term memory capabilities. This includes conversation history, learned preferences, and contextual data."
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Chen",
      title: "AI Research Director",
      company: "TechCorp",
      content: "The Pro plan has everything we need for our AI research. The multi-agent collaboration is game-changing.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez", 
      title: "CTO",
      company: "InnovateLabs",
      content: "Enterprise support is exceptional. They helped us integrate ncAGENTS into our existing infrastructure seamlessly.",
      rating: 5
    }
  ];

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

  const getPrice = (plan: Plan) => {
    if (plan.monthlyPrice === "0") return "Free";
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const period = isYearly ? "/year" : "/month";
    return `$${price}${period}`;
  };

  const getSavings = (plan: Plan) => {
    if (plan.monthlyPrice === "0") return 0;
    const monthlyPriceNum = parseFloat(plan.monthlyPrice);
    const yearlyPriceNum = parseFloat(plan.yearlyPrice);
    const yearlyTotal = monthlyPriceNum * 12;
    const savings = yearlyTotal - yearlyPriceNum;
    const percentage = Math.round((savings / yearlyTotal) * 100);
    return percentage;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-dot-pattern opacity-20" style={{ backgroundSize: '20px 20px' }} />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-card/40 backdrop-blur-sm border border-border/50 rounded-full px-6 py-2 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Simple, Transparent Pricing</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                AI Journey
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
              Start free and scale as you grow. All plans include our core AI agent 
              management features with no hidden fees.
            </p>

            {/* Billing Toggle */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                  isYearly ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{ x: isYearly ? 32 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              {isYearly && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ml-2"
                >
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Save up to 17%
                  </Badge>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <Card className={`h-full transition-all duration-300 ${
                  plan.popular
                    ? 'border-primary/50 shadow-glow-sm bg-card/60'
                    : 'border-border/50 hover:border-primary/30 bg-card/40'
                } backdrop-blur-sm`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                      {index === 0 && <Zap className="w-8 h-8 text-primary" />}
                      {index === 1 && <Brain className="w-8 h-8 text-primary" />}
                      {index === 2 && <Shield className="w-8 h-8 text-primary" />}
                      {index > 2 && <Users className="w-8 h-8 text-primary" />}
                    </div>

                    <CardTitle className="text-2xl font-bold text-foreground mb-2">
                      {plan.name}
                    </CardTitle>

                    <p className="text-muted-foreground mb-6">
                      {plan.description}
                    </p>

                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-foreground">
                        {getPrice(plan)}
                      </div>
                      {isYearly && plan.monthlyPrice !== "0" && (
                        <div className="text-sm text-muted-foreground">
                          <span className="line-through">${parseFloat(plan.monthlyPrice) * 12}/year</span>
                          <span className="ml-2 text-green-400 font-medium">
                            Save {getSavings(plan)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className={`text-sm ${
                            feature.included ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link to={plan.ctaLink} className="block">
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glow-sm hover:shadow-glow'
                            : ''
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                        size="lg"
                      >
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-card/20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trusted by Developers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See what our customers are saying about ncAGENTS
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>

                    <blockquote className="text-foreground/90 leading-relaxed mb-6">
                      "{testimonial.content}"
                    </blockquote>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our pricing and plans
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-card/20 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-foreground pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Join thousands of developers building the future with intelligent AI agents
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glow-sm hover:shadow-glow">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;