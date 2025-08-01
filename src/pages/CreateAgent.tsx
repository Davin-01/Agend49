import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft,
  ArrowRight,
  Check,
  Bot,
  Brain,
  Mic,
  Users,
  BarChart3,
  Settings,
  Zap,
  Save,
  Play,
  Eye,
  Sparkles,
  Template,
  Upload
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AgentFormData, 
  AgentCreationStep, 
  AgentCapability, 
  MemoryLevel, 
  ResponseStyle,
  CollaborationMode,
  mockAgentTemplates 
} from "@/types/agent";

// Mock user data
const mockUser = {
  name: "Alex Chen",
  email: "alex.chen@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
};

const steps: AgentCreationStep[] = [
  { id: 1, title: "Basic Information", description: "Name, description, and avatar", isComplete: false, isActive: true },
  { id: 2, title: "Capabilities", description: "Memory, voice, and collaboration settings", isComplete: false, isActive: false },
  { id: 3, title: "Personality", description: "Tone, expertise, and behavior", isComplete: false, isActive: false },
  { id: 4, title: "Integrations", description: "API connections and permissions", isComplete: false, isActive: false },
  { id: 5, title: "Review & Deploy", description: "Test and finalize your agent", isComplete: false, isActive: false }
];

const avatarOptions = ['🤖', '🎧', '📊', '🔍', '✍️', '🎨', '🛡️', '⚡', '🧠', '🎯', '🚀', '💡'];

const CreateAgent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [stepsState, setStepsState] = useState(steps);
  const [showTemplates, setShowTemplates] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    description: '',
    avatar: '🤖',
    capabilities: [],
    config: {
      memory: { level: 'standard', size: '10GB', retention: 60 },
      voice: { enabled: false, voice: 'alloy', speechRate: 1.0, language: 'en' },
      collaboration: { enabled: false, modes: [], maxTeamSize: 3 },
      analytics: { enabled: true, trackInteractions: true, generateReports: false }
    },
    personality: {
      tone: 'professional',
      expertiseAreas: [],
      responseLength: 'detailed',
      creativity: 50,
      formality: 70,
      empathy: 60
    },
    integrations: {
      apiConnections: [],
      dataSources: [],
      permissions: {
        canAccessInternet: false,
        canModifyData: false,
        canSendEmails: false,
        canScheduleMeetings: false
      }
    },
    saveAsDraft: false
  });

  const updateStepsState = (stepId: number, updates: Partial<AgentCreationStep>) => {
    setStepsState(prev => prev.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      updateStepsState(currentStep, { isComplete: true, isActive: false });
      updateStepsState(currentStep + 1, { isActive: true });
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      updateStepsState(currentStep, { isActive: false });
      updateStepsState(currentStep - 1, { isComplete: false, isActive: true });
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep) {
      updateStepsState(currentStep, { isActive: false });
      updateStepsState(stepId, { isActive: true });
      setCurrentStep(stepId);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = mockAgentTemplates.find(t => t.id === templateId);
    if (template) {
      setFormData(prev => ({
        ...prev,
        name: template.name,
        description: template.description,
        avatar: template.avatar,
        capabilities: template.capabilities,
        config: { ...prev.config, ...template.config },
        personality: { ...prev.personality, ...template.personality },
        integrations: { ...prev.integrations, ...template.integrations },
        templateId: templateId
      }));
      setSelectedTemplate(templateId);
      setShowTemplates(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Navigate back to agents list
    navigate('/agents');
  };

  const handleDeploy = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Navigate to agent detail page
    navigate('/agents/new-agent-id');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '' && formData.description.trim() !== '';
      case 2:
        return formData.capabilities.length > 0;
      case 3:
        // More comprehensive validation for personality step
        const isValid = formData.personality.tone !== '' &&
                        formData.personality.responseLength !== '' &&
                        formData.personality.expertiseAreas.length > 0;

        // Debug logging for step 3
        if (currentStep === 3) {
          console.log('Step 3 Validation:', {
            tone: formData.personality.tone,
            responseLength: formData.personality.responseLength,
            expertiseAreas: formData.personality.expertiseAreas,
            isValid
          });
        }

        return isValid;
      case 4:
        return true; // Integrations are optional
      case 5:
        return true; // Review step
      default:
        return false;
    }
  };

  // Helper function to get validation message for current step
  const getValidationMessage = () => {
    if (currentStep === 3 && !isStepValid()) {
      if (formData.personality.expertiseAreas.length === 0) {
        return "Please add at least one expertise area by typing and pressing Enter";
      }
      if (!formData.personality.tone) {
        return "Please select a response tone";
      }
      if (!formData.personality.responseLength) {
        return "Please select a response length";
      }
    }
    return null;
  };

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

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={mockUser} />
      
      <div className="container mx-auto max-w-7xl px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/agents">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Agents
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Create New Agent</h1>
                <p className="text-muted-foreground">Build your intelligent AI assistant step by step</p>
              </div>
            </div>
          </motion.div>

          {/* Template Selection Modal */}
          <AnimatePresence>
            {showTemplates && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-card border border-border rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                >
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Choose a Template</h2>
                        <p className="text-muted-foreground">Start with a pre-configured agent or build from scratch</p>
                      </div>
                      <Button variant="outline" onClick={() => setShowTemplates(false)}>
                        Skip Templates
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Start from Scratch Option */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowTemplates(false)}
                        className="p-6 border-2 border-dashed border-border hover:border-primary/50 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">Start from Scratch</h3>
                          <p className="text-sm text-muted-foreground">Build a completely custom agent</p>
                        </div>
                      </motion.div>

                      {/* Template Options */}
                      {mockAgentTemplates.map((template) => (
                        <motion.div
                          key={template.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTemplateSelect(template.id)}
                          className={`p-6 border rounded-lg cursor-pointer transition-all ${
                            selectedTemplate === template.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-2xl">
                              {template.avatar}
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">{template.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                            <div className="flex items-center justify-center gap-2 mb-3">
                              <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                              {template.isOfficial && (
                                <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                                  Official
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                              <span>⭐ {template.rating}</span>
                              <span>📥 {template.downloads}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Steps */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {stepsState.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <button
                        onClick={() => handleStepClick(step.id)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                          step.isComplete
                            ? 'bg-primary border-primary text-white'
                            : step.isActive
                            ? 'border-primary text-primary bg-primary/10'
                            : 'border-muted-foreground/30 text-muted-foreground'
                        }`}
                        disabled={step.id > currentStep}
                      >
                        {step.isComplete ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-medium">{step.id}</span>
                        )}
                      </button>

                      <div className="ml-3 hidden md:block">
                        <div className={`text-sm font-medium ${
                          step.isActive ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {step.description}
                        </div>
                      </div>

                      {index < stepsState.length - 1 && (
                        <div className={`w-12 h-0.5 mx-4 ${
                          step.isComplete ? 'bg-primary' : 'bg-muted-foreground/30'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Step Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <motion.div variants={itemVariants}>
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {currentStep === 1 && <Bot className="w-5 h-5" />}
                      {currentStep === 2 && <Settings className="w-5 h-5" />}
                      {currentStep === 3 && <Brain className="w-5 h-5" />}
                      {currentStep === 4 && <Zap className="w-5 h-5" />}
                      {currentStep === 5 && <Eye className="w-5 h-5" />}
                      {stepsState.find(s => s.id === currentStep)?.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <AnimatePresence mode="wait">
                      {/* Step 1: Basic Information */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="name">Agent Name *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Enter agent name..."
                              className="bg-background/50"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                              id="description"
                              value={formData.description}
                              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Describe what your agent does..."
                              className="bg-background/50 min-h-[100px]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Avatar</Label>
                            <div className="grid grid-cols-6 gap-3">
                              {avatarOptions.map((avatar) => (
                                <button
                                  key={avatar}
                                  onClick={() => setFormData(prev => ({ ...prev, avatar }))}
                                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl transition-all ${
                                    formData.avatar === avatar
                                      ? 'border-primary bg-primary/10'
                                      : 'border-border hover:border-primary/50'
                                  }`}
                                >
                                  {avatar}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Custom Avatar Upload</Label>
                            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                Drag and drop an image or click to browse
                              </p>
                              <Button variant="outline" size="sm" className="mt-2">
                                Choose File
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Capabilities */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <Label>Select Capabilities *</Label>
                            <div className="grid grid-cols-2 gap-4">
                              {[
                                { id: 'memory', label: 'Memory', icon: <Brain className="w-4 h-4" />, desc: 'Long-term memory and context retention' },
                                { id: 'voice', label: 'Voice', icon: <Mic className="w-4 h-4" />, desc: 'Text-to-speech and voice interaction' },
                                { id: 'collaboration', label: 'Collaboration', icon: <Users className="w-4 h-4" />, desc: 'Multi-agent teamwork capabilities' },
                                { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" />, desc: 'Data analysis and reporting' }
                              ].map((capability) => (
                                <div
                                  key={capability.id}
                                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                    formData.capabilities.includes(capability.id as AgentCapability)
                                      ? 'border-primary bg-primary/5'
                                      : 'border-border hover:border-primary/50'
                                  }`}
                                  onClick={() => {
                                    const cap = capability.id as AgentCapability;
                                    setFormData(prev => ({
                                      ...prev,
                                      capabilities: prev.capabilities.includes(cap)
                                        ? prev.capabilities.filter(c => c !== cap)
                                        : [...prev.capabilities, cap]
                                    }));
                                  }}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                                      {capability.icon}
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-foreground">{capability.label}</h4>
                                      <p className="text-sm text-muted-foreground">{capability.desc}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Memory Configuration */}
                          {formData.capabilities.includes('memory') && (
                            <div className="space-y-4 p-4 bg-card/30 rounded-lg">
                              <h4 className="font-medium text-foreground">Memory Configuration</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Memory Level</Label>
                                  <Select
                                    value={formData.config.memory?.level}
                                    onValueChange={(value: MemoryLevel) =>
                                      setFormData(prev => ({
                                        ...prev,
                                        config: {
                                          ...prev.config,
                                          memory: { ...prev.config.memory!, level: value }
                                        }
                                      }))
                                    }
                                  >
                                    <SelectTrigger className="bg-background/50">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="basic">Basic (1GB)</SelectItem>
                                      <SelectItem value="standard">Standard (10GB)</SelectItem>
                                      <SelectItem value="advanced">Advanced (25GB)</SelectItem>
                                      <SelectItem value="unlimited">Unlimited</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Retention (days)</Label>
                                  <Input
                                    type="number"
                                    value={formData.config.memory?.retention}
                                    onChange={(e) =>
                                      setFormData(prev => ({
                                        ...prev,
                                        config: {
                                          ...prev.config,
                                          memory: { ...prev.config.memory!, retention: parseInt(e.target.value) }
                                        }
                                      }))
                                    }
                                    className="bg-background/50"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Voice Configuration */}
                          {formData.capabilities.includes('voice') && (
                            <div className="space-y-4 p-4 bg-card/30 rounded-lg">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-foreground">Voice Configuration</h4>
                                <Switch
                                  checked={formData.config.voice?.enabled}
                                  onCheckedChange={(checked) =>
                                    setFormData(prev => ({
                                      ...prev,
                                      config: {
                                        ...prev.config,
                                        voice: { ...prev.config.voice!, enabled: checked }
                                      }
                                    }))
                                  }
                                />
                              </div>
                              {formData.config.voice?.enabled && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Voice</Label>
                                    <Select
                                      value={formData.config.voice?.voice}
                                      onValueChange={(value) =>
                                        setFormData(prev => ({
                                          ...prev,
                                          config: {
                                            ...prev.config,
                                            voice: { ...prev.config.voice!, voice: value }
                                          }
                                        }))
                                      }
                                    >
                                      <SelectTrigger className="bg-background/50">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="alloy">Alloy (Neutral)</SelectItem>
                                        <SelectItem value="echo">Echo (Male)</SelectItem>
                                        <SelectItem value="fable">Fable (British)</SelectItem>
                                        <SelectItem value="nova">Nova (Female)</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Speech Rate: {formData.config.voice?.speechRate}x</Label>
                                    <Slider
                                      value={[formData.config.voice?.speechRate || 1.0]}
                                      onValueChange={([value]) =>
                                        setFormData(prev => ({
                                          ...prev,
                                          config: {
                                            ...prev.config,
                                            voice: { ...prev.config.voice!, speechRate: value }
                                          }
                                        }))
                                      }
                                      max={2}
                                      min={0.5}
                                      step={0.1}
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* Step 3: Personality */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Response Tone</Label>
                              <Select
                                value={formData.personality.tone}
                                onValueChange={(value: ResponseStyle) =>
                                  setFormData(prev => ({
                                    ...prev,
                                    personality: { ...prev.personality, tone: value }
                                  }))
                                }
                              >
                                <SelectTrigger className="bg-background/50">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="professional">Professional</SelectItem>
                                  <SelectItem value="casual">Casual</SelectItem>
                                  <SelectItem value="technical">Technical</SelectItem>
                                  <SelectItem value="creative">Creative</SelectItem>
                                  <SelectItem value="supportive">Supportive</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Response Length</Label>
                              <Select
                                value={formData.personality.responseLength}
                                onValueChange={(value: 'concise' | 'detailed' | 'comprehensive') =>
                                  setFormData(prev => ({
                                    ...prev,
                                    personality: { ...prev.personality, responseLength: value }
                                  }))
                                }
                              >
                                <SelectTrigger className="bg-background/50">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="concise">Concise</SelectItem>
                                  <SelectItem value="detailed">Detailed</SelectItem>
                                  <SelectItem value="comprehensive">Comprehensive</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Expertise Areas *</Label>
                              <div className="space-y-2">
                                <div className="relative">
                                  <Input
                                    placeholder="Type an expertise area and press Enter to add"
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault();
                                        const value = (e.target as HTMLInputElement).value.trim();
                                        if (value && !formData.personality.expertiseAreas.includes(value)) {
                                          setFormData(prev => ({
                                            ...prev,
                                            personality: {
                                              ...prev.personality,
                                              expertiseAreas: [...prev.personality.expertiseAreas, value]
                                            }
                                          }));
                                          (e.target as HTMLInputElement).value = '';
                                        }
                                      }
                                    }}
                                    className={`bg-background/50 ${
                                      formData.personality.expertiseAreas.length === 0 ? 'border-red-500/50' : ''
                                    }`}
                                  />
                                  {formData.personality.expertiseAreas.length === 0 && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                      <span className="text-xs text-red-500">Required</span>
                                    </div>
                                  )}
                                </div>

                                {formData.personality.expertiseAreas.length === 0 && (
                                  <div className="space-y-2">
                                    <p className="text-xs text-muted-foreground">
                                      💡 Quick add common expertise areas:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {['Data Analysis', 'Customer Service', 'Content Writing', 'Software Development', 'Marketing', 'Sales'].map((area) => (
                                        <Button
                                          key={area}
                                          variant="outline"
                                          size="sm"
                                          className="text-xs h-7"
                                          onClick={() => {
                                            if (!formData.personality.expertiseAreas.includes(area)) {
                                              setFormData(prev => ({
                                                ...prev,
                                                personality: {
                                                  ...prev.personality,
                                                  expertiseAreas: [...prev.personality.expertiseAreas, area]
                                                }
                                              }));
                                            }
                                          }}
                                        >
                                          + {area}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="flex flex-wrap gap-2">
                                  {formData.personality.expertiseAreas.map((area, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {area}
                                      <button
                                        onClick={() => {
                                          setFormData(prev => ({
                                            ...prev,
                                            personality: {
                                              ...prev.personality,
                                              expertiseAreas: prev.personality.expertiseAreas.filter((_, i) => i !== index)
                                            }
                                          }));
                                        }}
                                        className="ml-1 hover:text-red-400"
                                      >
                                        ×
                                      </button>
                                    </Badge>
                                  ))}
                                </div>

                                {formData.personality.expertiseAreas.length > 0 && (
                                  <p className="text-xs text-green-600">
                                    ✓ {formData.personality.expertiseAreas.length} expertise area{formData.personality.expertiseAreas.length > 1 ? 's' : ''} added
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>Creativity: {formData.personality.creativity}%</Label>
                                <Slider
                                  value={[formData.personality.creativity || 50]}
                                  onValueChange={([value]) =>
                                    setFormData(prev => ({
                                      ...prev,
                                      personality: { ...prev.personality, creativity: value }
                                    }))
                                  }
                                  max={100}
                                  min={0}
                                  step={10}
                                  className="w-full"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Formality: {formData.personality.formality}%</Label>
                                <Slider
                                  value={[formData.personality.formality || 70]}
                                  onValueChange={([value]) =>
                                    setFormData(prev => ({
                                      ...prev,
                                      personality: { ...prev.personality, formality: value }
                                    }))
                                  }
                                  max={100}
                                  min={0}
                                  step={10}
                                  className="w-full"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Empathy: {formData.personality.empathy}%</Label>
                                <Slider
                                  value={[formData.personality.empathy || 60]}
                                  onValueChange={([value]) =>
                                    setFormData(prev => ({
                                      ...prev,
                                      personality: { ...prev.personality, empathy: value }
                                    }))
                                  }
                                  max={100}
                                  min={0}
                                  step={10}
                                  className="w-full"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 4: Integrations */}
                      {currentStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <h4 className="font-medium text-foreground">Permissions</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {[
                                { key: 'canAccessInternet', label: 'Internet Access', desc: 'Allow agent to access web resources' },
                                { key: 'canModifyData', label: 'Data Modification', desc: 'Allow agent to modify data' },
                                { key: 'canSendEmails', label: 'Send Emails', desc: 'Allow agent to send email notifications' },
                                { key: 'canScheduleMeetings', label: 'Schedule Meetings', desc: 'Allow agent to schedule calendar events' }
                              ].map((permission) => (
                                <div key={permission.key} className="flex items-center justify-between p-4 bg-card/30 rounded-lg">
                                  <div>
                                    <h5 className="font-medium text-foreground">{permission.label}</h5>
                                    <p className="text-sm text-muted-foreground">{permission.desc}</p>
                                  </div>
                                  <Switch
                                    checked={formData.integrations.permissions?.[permission.key as keyof typeof formData.integrations.permissions] || false}
                                    onCheckedChange={(checked) =>
                                      setFormData(prev => ({
                                        ...prev,
                                        integrations: {
                                          ...prev.integrations,
                                          permissions: {
                                            ...prev.integrations.permissions,
                                            [permission.key]: checked
                                          }
                                        }
                                      }))
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 5: Review & Deploy */}
                      {currentStep === 5 && (
                        <motion.div
                          key="step5"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <h4 className="font-medium text-foreground">Agent Summary</h4>
                            <div className="p-6 bg-card/30 rounded-lg space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-2xl">
                                  {formData.avatar}
                                </div>
                                <div>
                                  <h3 className="text-xl font-semibold text-foreground">{formData.name}</h3>
                                  <p className="text-muted-foreground">{formData.description}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-medium text-foreground mb-2">Capabilities</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {formData.capabilities.map((cap) => (
                                      <Badge key={cap} variant="secondary" className="text-xs">{cap}</Badge>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h5 className="font-medium text-foreground mb-2">Personality</h5>
                                  <div className="text-sm text-muted-foreground">
                                    <p>Tone: {formData.personality.tone}</p>
                                    <p>Response: {formData.personality.responseLength}</p>
                                    <p>Expertise: {formData.personality.expertiseAreas.join(', ')}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                              <h5 className="font-medium text-foreground mb-2">Ready to Deploy</h5>
                              <p className="text-sm text-muted-foreground">
                                Your agent is configured and ready to be deployed. You can always modify these settings later.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-1">
              <motion.div variants={itemVariants}>
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50 sticky top-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Agent Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-3xl">
                        {formData.avatar}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {formData.name || 'Unnamed Agent'}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {formData.description || 'No description provided'}
                      </p>
                    </div>

                    {formData.capabilities.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Capabilities</h4>
                        <div className="flex flex-wrap gap-1">
                          {formData.capabilities.map((capability) => (
                            <Badge key={capability} variant="secondary" className="text-xs">
                              {capability}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-border">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSaveDraft}
                          disabled={isLoading}
                          className="flex-1"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Draft
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">
                      Step {currentStep} of {stepsState.length}
                    </div>
                    {getValidationMessage() && (
                      <div className="text-xs text-red-500 mt-1 max-w-xs">
                        {getValidationMessage()}
                      </div>
                    )}
                  </div>

                  {currentStep === 5 ? (
                    <Button
                      onClick={handleDeploy}
                      disabled={isLoading || !isStepValid()}
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Deploying...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Deploy Agent
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className={!isStepValid() ? 'opacity-50 cursor-not-allowed' : ''}
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      {!isStepValid() && getValidationMessage() && (
                        <div className="text-xs text-red-500 text-right max-w-xs">
                          {getValidationMessage()}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateAgent;
