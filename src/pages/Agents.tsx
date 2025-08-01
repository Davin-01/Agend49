import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  MoreVertical,
  Play,
  Pause,
  Edit,
  Copy,
  Trash2,
  Bot,
  Activity,
  Calendar,
  Users,
  Brain,
  Mic,
  BarChart3,
  Shield,
  Zap,
  Eye,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Agent, AgentCapability, AgentStatus, mockAgents } from "@/types/agent";

// Mock user data
const mockUser = {
  name: "Alex Chen",
  email: "alex.chen@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
};

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'created' | 'activity' | 'interactions';

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AgentStatus | 'all'>('all');
  const [capabilityFilter, setCapabilityFilter] = useState<AgentCapability | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('activity');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort agents
  const filteredAgents = agents
    .filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           agent.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
      const matchesCapability = capabilityFilter === 'all' || agent.capabilities.includes(capabilityFilter);
      return matchesSearch && matchesStatus && matchesCapability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'activity':
          return new Date(b.analytics.lastActivity).getTime() - new Date(a.analytics.lastActivity).getTime();
        case 'interactions':
          return b.analytics.totalInteractions - a.analytics.totalInteractions;
        default:
          return 0;
      }
    });

  const handleSelectAgent = (agentId: string) => {
    setSelectedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedAgents(
      selectedAgents.length === filteredAgents.length 
        ? [] 
        : filteredAgents.map(agent => agent.id)
    );
  };

  const handleToggleStatus = (agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === 'active' ? 'inactive' : 'active' }
        : agent
    ));
  };

  const handleDeleteAgent = (agentId: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId));
    setSelectedAgents(prev => prev.filter(id => id !== agentId));
  };

  const getCapabilityIcon = (capability: AgentCapability) => {
    const icons = {
      memory: <Brain className="w-4 h-4" />,
      voice: <Mic className="w-4 h-4" />,
      collaboration: <Users className="w-4 h-4" />,
      analytics: <BarChart3 className="w-4 h-4" />,
      research: <Search className="w-4 h-4" />,
      creative: <Zap className="w-4 h-4" />,
      support: <Shield className="w-4 h-4" />,
      automation: <Settings className="w-4 h-4" />
    };
    return icons[capability] || <Bot className="w-4 h-4" />;
  };

  const getStatusColor = (status: AgentStatus) => {
    const colors = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      draft: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      archived: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[status];
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
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">AI Agents</h1>
              <p className="text-muted-foreground">Manage and monitor your intelligent agents</p>
            </div>
            <Link to="/agents/create">
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glow-sm hover:shadow-glow">
                <Plus className="w-4 h-4 mr-2" />
                Create New Agent
              </Button>
            </Link>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search agents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background/50"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className={showFilters ? 'bg-primary/10 border-primary/30' : ''}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>

                    <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                      <SelectTrigger className="w-40 bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="activity">Last Activity</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="created">Created Date</SelectItem>
                        <SelectItem value="interactions">Interactions</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="h-8 w-8 p-0"
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="h-8 w-8 p-0"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Expanded Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-4 pt-4 mt-4 border-t border-border">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Status</label>
                          <Select value={statusFilter} onValueChange={(value: AgentStatus | 'all') => setStatusFilter(value)}>
                            <SelectTrigger className="w-32 bg-background/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Capability</label>
                          <Select value={capabilityFilter} onValueChange={(value: AgentCapability | 'all') => setCapabilityFilter(value)}>
                            <SelectTrigger className="w-40 bg-background/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Capabilities</SelectItem>
                              <SelectItem value="memory">Memory</SelectItem>
                              <SelectItem value="voice">Voice</SelectItem>
                              <SelectItem value="collaboration">Collaboration</SelectItem>
                              <SelectItem value="analytics">Analytics</SelectItem>
                              <SelectItem value="research">Research</SelectItem>
                              <SelectItem value="creative">Creative</SelectItem>
                              <SelectItem value="support">Support</SelectItem>
                              <SelectItem value="automation">Automation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bulk Actions */}
          {selectedAgents.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              variants={itemVariants}
            >
              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground">
                        {selectedAgents.length} agent{selectedAgents.length > 1 ? 's' : ''} selected
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Activate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Pause className="w-4 h-4 mr-2" />
                        Deactivate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-400">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Agents Display */}
          <motion.div variants={itemVariants}>
            {filteredAgents.length === 0 ? (
              // Empty State
              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <Bot className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {agents.length === 0 ? "No agents yet" : "No agents found"}
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {agents.length === 0
                      ? "Create your first AI agent to get started with intelligent automation and collaboration."
                      : "Try adjusting your search or filter criteria to find the agents you're looking for."
                    }
                  </p>
                  {agents.length === 0 && (
                    <Link to="/agents/create">
                      <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Agent
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ) : (
              // Agents Grid/List
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {/* Select All Checkbox */}
                {filteredAgents.length > 0 && (
                  <div className={`${viewMode === 'grid' ? 'col-span-full' : ''} mb-4`}>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedAgents.length === filteredAgents.length}
                        onCheckedChange={handleSelectAll}
                      />
                      <span className="text-sm text-muted-foreground">
                        Select all ({filteredAgents.length} agents)
                      </span>
                    </div>
                  </div>
                )}

                {filteredAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className={`h-full bg-card/40 backdrop-blur-sm border transition-all duration-300 ${
                      selectedAgents.includes(agent.id)
                        ? 'border-primary/50 bg-primary/5'
                        : 'border-border/50 hover:border-primary/30'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Checkbox
                            checked={selectedAgents.includes(agent.id)}
                            onCheckedChange={() => handleSelectAgent(agent.id)}
                          />

                          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                            {agent.avatar}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-semibold text-foreground truncate">
                                {agent.name}
                              </h3>
                              <div className="flex items-center gap-1">
                                <Badge className={getStatusColor(agent.status)}>
                                  {agent.status}
                                </Badge>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {agent.description}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {agent.capabilities.slice(0, 3).map((capability) => (
                                <Badge key={capability} variant="secondary" className="text-xs">
                                  <span className="mr-1">{getCapabilityIcon(capability)}</span>
                                  {capability}
                                </Badge>
                              ))}
                              {agent.capabilities.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{agent.capabilities.length - 3} more
                                </Badge>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  {agent.analytics.totalInteractions.toLocaleString()} interactions
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  {new Date(agent.analytics.lastActivity).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Link to={`/agents/${agent.id}`} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleStatus(agent.id)}
                                className={agent.status === 'active' ? 'text-red-500 hover:text-red-400' : 'text-green-500 hover:text-green-400'}
                              >
                                {agent.status === 'active' ? (
                                  <Pause className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4" />
                                )}
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Agents;
