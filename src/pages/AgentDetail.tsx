import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Edit,
  Play,
  Pause,
  Copy,
  Download,
  Upload,
  Settings,
  BarChart3,
  MessageSquare,
  Users,
  Brain,
  Mic,
  Shield,
  Activity,
  Calendar,
  Clock,
  TrendingUp,
  Star,
  Send,
  Bot,
  User,
  Zap,
  Target,
  Award
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Agent, ConversationLog, mockAgents } from "@/types/agent";

// Mock user data
const mockUser = {
  name: "Alex Chen",
  email: "alex.chen@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
};

// Mock conversation logs
const mockConversationLogs: ConversationLog[] = [
  {
    id: 'conv_1',
    timestamp: '2024-01-20T14:30:00Z',
    userId: 'user_456',
    userName: 'Sarah Johnson',
    messages: [
      { id: 'msg_1', role: 'user', content: 'Can you analyze the sales data for Q4?', timestamp: '2024-01-20T14:30:00Z' },
      { id: 'msg_2', role: 'agent', content: 'I\'ll analyze the Q4 sales data for you. Let me pull the latest figures and identify key trends.', timestamp: '2024-01-20T14:30:15Z' },
      { id: 'msg_3', role: 'user', content: 'Focus on the regional performance differences', timestamp: '2024-01-20T14:31:00Z' },
      { id: 'msg_4', role: 'agent', content: 'Based on the Q4 data, here are the key regional insights: North America showed 15% growth, Europe had 8% growth, while Asia-Pacific led with 22% growth. The main drivers were...', timestamp: '2024-01-20T14:31:30Z' }
    ],
    rating: 5,
    feedback: 'Very helpful analysis with clear insights',
    duration: 180
  },
  {
    id: 'conv_2',
    timestamp: '2024-01-20T10:15:00Z',
    userId: 'user_789',
    userName: 'Mike Chen',
    messages: [
      { id: 'msg_5', role: 'user', content: 'Generate a monthly report template', timestamp: '2024-01-20T10:15:00Z' },
      { id: 'msg_6', role: 'agent', content: 'I\'ll create a comprehensive monthly report template for you. What specific metrics would you like to include?', timestamp: '2024-01-20T10:15:10Z' }
    ],
    rating: 4,
    duration: 120
  }
];

const AgentDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [testMessage, setTestMessage] = useState('');
  const [testConversation, setTestConversation] = useState<{ role: 'user' | 'agent', content: string }[]>([]);
  const [isTestLoading, setIsTestLoading] = useState(false);

  // Find the agent (in real app, this would be fetched from API)
  const agent = mockAgents.find(a => a.id === id) || mockAgents[0];

  const handleSendTestMessage = async () => {
    if (!testMessage.trim()) return;

    const userMessage = { role: 'user' as const, content: testMessage };
    setTestConversation(prev => [...prev, userMessage]);
    setTestMessage('');
    setIsTestLoading(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        role: 'agent' as const,
        content: `I understand you're asking about "${testMessage}". As ${agent.name}, I'm designed to help with ${agent.personality.expertiseAreas.join(', ')}. How can I assist you further with this topic?`
      };
      setTestConversation(prev => [...prev, agentResponse]);
      setIsTestLoading(false);
    }, 1500);
  };

  const getCapabilityIcon = (capability: string) => {
    const icons: Record<string, JSX.Element> = {
      memory: <Brain className="w-4 h-4" />,
      voice: <Mic className="w-4 h-4" />,
      collaboration: <Users className="w-4 h-4" />,
      analytics: <BarChart3 className="w-4 h-4" />,
      research: <Target className="w-4 h-4" />,
      creative: <Zap className="w-4 h-4" />,
      support: <Shield className="w-4 h-4" />,
      automation: <Settings className="w-4 h-4" />
    };
    return icons[capability] || <Bot className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      draft: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      archived: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[status] || colors.inactive;
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
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-2xl">
                  {agent.avatar}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{agent.name}</h1>
                  <p className="text-muted-foreground">{agent.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(agent.status)}>
                {agent.status}
              </Badge>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline">
                {agent.status === 'active' ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Activate
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {agent.analytics.totalInteractions.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Interactions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {agent.analytics.successRate}%
                      </div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {agent.analytics.userSatisfactionScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">Satisfaction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {agent.analytics.averageResponseTime}ms
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Response</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Main Content Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-card/40 backdrop-blur-sm">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="conversations" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Conversations</span>
                </TabsTrigger>
                <TabsTrigger value="collaboration" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Teams</span>
                </TabsTrigger>
                <TabsTrigger value="test" className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span className="hidden sm:inline">Test</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Agent Configuration */}
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Capabilities</h4>
                        <div className="flex flex-wrap gap-2">
                          {agent.capabilities.map((capability) => (
                            <Badge key={capability} variant="secondary" className="text-xs">
                              <span className="mr-1">{getCapabilityIcon(capability)}</span>
                              {capability}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-foreground mb-2">Memory</h4>
                        <div className="text-sm text-muted-foreground">
                          Level: {agent.config.memory.level} ({agent.config.memory.size})
                          <br />
                          Retention: {agent.config.memory.retention} days
                        </div>
                      </div>

                      {agent.config.voice.enabled && (
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Voice</h4>
                          <div className="text-sm text-muted-foreground">
                            Voice: {agent.config.voice.voice}
                            <br />
                            Speech Rate: {agent.config.voice.speechRate}x
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium text-foreground mb-2">Personality</h4>
                        <div className="text-sm text-muted-foreground">
                          Tone: {agent.personality.tone}
                          <br />
                          Response Length: {agent.personality.responseLength}
                          <br />
                          Expertise: {agent.personality.expertiseAreas.join(', ')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {agent.analytics.topQueries.map((query, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                          <div>
                            <div className="font-medium text-foreground text-sm">{query.query}</div>
                            <div className="text-xs text-muted-foreground">{query.count} times</div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            #{index + 1}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Daily Interactions Chart */}
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Daily Interactions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {agent.analytics.dailyInteractions.map((day, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="text-sm text-muted-foreground w-20">
                              {new Date(day.date).toLocaleDateString()}
                            </div>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                                style={{ width: `${(day.count / 60) * 100}%` }}
                              />
                            </div>
                            <div className="text-sm font-medium text-foreground w-12">
                              {day.count}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Performance Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Success Rate</span>
                          <span className="text-foreground font-medium">{agent.analytics.successRate}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${agent.analytics.successRate}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">User Satisfaction</span>
                          <span className="text-foreground font-medium">{agent.analytics.userSatisfactionScore}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${agent.analytics.userSatisfactionScore}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Response Time</span>
                          <span className="text-foreground font-medium">{agent.analytics.averageResponseTime}ms</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${Math.min((1000 / agent.analytics.averageResponseTime) * 100, 100)}%` }}
                          />
                        </div>
                      </div>

                      {agent.trainingData && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Training Accuracy</span>
                            <span className="text-foreground font-medium">{agent.trainingData.accuracy}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: `${agent.trainingData.accuracy}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Conversations Tab */}
              <TabsContent value="conversations" className="space-y-6">
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Recent Conversations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockConversationLogs.map((conversation) => (
                      <div key={conversation.id} className="p-4 bg-card/30 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground text-sm">{conversation.userName}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(conversation.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {conversation.rating && (
                              <div className="flex items-center gap-1">
                                {[...Array(conversation.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            )}
                            <Badge variant="secondary" className="text-xs">
                              {Math.floor(conversation.duration / 60)}m {conversation.duration % 60}s
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {conversation.messages.slice(0, 2).map((message) => (
                            <div key={message.id} className={`text-sm p-2 rounded ${
                              message.role === 'user'
                                ? 'bg-primary/10 text-foreground ml-4'
                                : 'bg-accent/10 text-foreground mr-4'
                            }`}>
                              <div className="font-medium text-xs mb-1">
                                {message.role === 'user' ? conversation.userName : agent.name}
                              </div>
                              {message.content}
                            </div>
                          ))}
                          {conversation.messages.length > 2 && (
                            <div className="text-xs text-muted-foreground text-center">
                              +{conversation.messages.length - 2} more messages
                            </div>
                          )}
                        </div>

                        {conversation.feedback && (
                          <div className="mt-3 p-2 bg-card/20 rounded text-sm text-muted-foreground">
                            <strong>Feedback:</strong> {conversation.feedback}
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Test Tab */}
              <TabsContent value="test" className="space-y-6">
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      Test Agent
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Test Conversation */}
                      <div className="h-96 bg-card/20 rounded-lg p-4 overflow-y-auto space-y-3">
                        {testConversation.length === 0 ? (
                          <div className="text-center text-muted-foreground py-8">
                            <Bot className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                            <p>Start a conversation to test your agent</p>
                          </div>
                        ) : (
                          testConversation.map((message, index) => (
                            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[80%] p-3 rounded-lg ${
                                message.role === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-card border border-border'
                              }`}>
                                <div className="text-xs mb-1 opacity-70">
                                  {message.role === 'user' ? 'You' : agent.name}
                                </div>
                                {message.content}
                              </div>
                            </div>
                          ))
                        )}

                        {isTestLoading && (
                          <div className="flex justify-start">
                            <div className="bg-card border border-border p-3 rounded-lg">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Test Input */}
                      <div className="flex gap-2">
                        <Input
                          value={testMessage}
                          onChange={(e) => setTestMessage(e.target.value)}
                          placeholder="Type a message to test your agent..."
                          className="bg-background/50"
                          onKeyPress={(e) => e.key === 'Enter' && handleSendTestMessage()}
                          disabled={isTestLoading}
                        />
                        <Button
                          onClick={handleSendTestMessage}
                          disabled={!testMessage.trim() || isTestLoading}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AgentDetail;
