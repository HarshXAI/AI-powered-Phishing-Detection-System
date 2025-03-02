
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ChevronLeft, 
  Bell, 
  Search, 
  User, 
  Home, 
  Mail, 
  MessageSquare, 
  Globe,
  BarChart3,
  Settings,
  Shield,
  ShieldAlert,
  AlertCircle,
  ChevronRight,
  Menu
} from 'lucide-react';

import AnimatedButton from '@/components/ui/AnimatedButton';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Dashboard: React.FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsCardsRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  // Sidebar toggle animation
  const toggleSidebar = () => {
    if (!sidebarRef.current || !mainContentRef.current) return;
    
    setSidebarCollapsed(prev => !prev);
    
    const sidebar = sidebarRef.current;
    const mainContent = mainContentRef.current;
    
    if (sidebarCollapsed) {
      // Expand sidebar
      gsap.to(sidebar, {
        width: '250px',
        duration: 0.5,
        ease: 'power2.out'
      });
      gsap.to(mainContent, {
        marginLeft: '250px',
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      // Collapse sidebar
      gsap.to(sidebar, {
        width: '80px',
        duration: 0.5,
        ease: 'power2.out'
      });
      gsap.to(mainContent, {
        marginLeft: '80px',
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  };
  
  // Mock data for charts
  const phishingData = [
    { month: 'Jan', attacks: 12 },
    { month: 'Feb', attacks: 19 },
    { month: 'Mar', attacks: 15 },
    { month: 'Apr', attacks: 25 },
    { month: 'May', attacks: 32 },
    { month: 'Jun', attacks: 18 },
    { month: 'Jul', attacks: 29 },
  ];
  
  // Mock data for threats
  const threatFeed = [
    { id: 1, type: 'Email', sender: 'suspicious@phishing-attempt.com', severity: 'high', time: '2 min ago' },
    { id: 2, type: 'Website', url: 'fake-login.secure-bank.com', severity: 'critical', time: '15 min ago' },
    { id: 3, type: 'Email', sender: 'service@paypa1-security.com', severity: 'high', time: '1 hour ago' },
    { id: 4, type: 'Website', url: 'account-verify.amazon-cloud.net', severity: 'medium', time: '3 hours ago' },
  ];
  
  // Setup animations
  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.from(headerRef.current.children, {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
    
    // Stats cards animation
    if (statsCardsRef.current) {
      gsap.from(statsCardsRef.current.children, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: statsCardsRef.current,
          start: 'top 80%',
        }
      });
    }
    
    // Chart animation
    if (chartRef.current) {
      gsap.from(chartRef.current, {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 1,
        ease: 'elastic.out(1, 0.75)',
        scrollTrigger: {
          trigger: chartRef.current,
          start: 'top 85%',
        }
      });
    }
    
    // Create pulsing effect for globe
    if (globeRef.current) {
      gsap.to(globeRef.current, {
        boxShadow: '0 0 30px rgba(147, 51, 234, 0.5)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      // Rotate globe
      gsap.to(globeRef.current.querySelector('.globe-inner'), {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
      });
    }
    
    // Cleanup animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf(headerRef.current?.children);
      gsap.killTweensOf(statsCardsRef.current?.children);
      gsap.killTweensOf(chartRef.current);
      gsap.killTweensOf(globeRef.current);
    };
  }, []);
  
  // Sidebar menu items
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', active: true },
    { icon: <Mail className="w-5 h-5" />, label: 'Email Analysis' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Message Scanner' },
    { icon: <Globe className="w-5 h-5" />, label: 'Website Scanner' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Reports' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];
  
  // Stats cards data
  const statsCards = [
    { icon: <ShieldAlert className="w-8 h-8 text-primary" />, label: 'Total Phishing Attacks', value: '2,543', trend: '+12%' },
    { icon: <Shield className="w-8 h-8 text-green-500" />, label: 'Safe Emails', value: '8,721', trend: '+5%' },
    { icon: <AlertCircle className="w-8 h-8 text-destructive" />, label: 'Malicious Emails', value: '347', trend: '-8%' },
    { icon: <Globe className="w-8 h-8 text-blue-500" />, label: 'Protected Domains', value: '128', trend: '+3%' },
  ];
  
  // Severity badge component
  const SeverityBadge = ({ severity }: { severity: string }) => {
    const colors = {
      low: 'bg-blue-500/20 text-blue-500',
      medium: 'bg-yellow-500/20 text-yellow-500',
      high: 'bg-orange-500/20 text-orange-500',
      critical: 'bg-destructive/20 text-destructive',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[severity as keyof typeof colors]}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Sidebar */}
      <motion.div 
        ref={sidebarRef}
        initial={{ width: '250px' }}
        className="fixed left-0 top-0 h-screen glass z-10 border-r border-border overflow-hidden transition-all duration-300"
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <span className={`font-bold text-xl transition-opacity duration-300 ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
              ShieldGuard
            </span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-secondary transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
        
        <nav className="p-3">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.li 
                key={index}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="#" 
                  className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                    item.active ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                  }`}
                >
                  {item.icon}
                  <span className={`transition-opacity duration-300 ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    {item.label}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-4 left-0 right-0 p-4">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className={`transition-opacity duration-300 ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                Back to Home
              </span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div 
        ref={mainContentRef}
        className="ml-[250px] transition-all duration-300 p-6"
      >
        {/* Header */}
        <header ref={headerRef} className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={toggleSidebar}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-10 w-[200px] lg:w-[300px] bg-secondary/50"
              />
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold">
                3
              </span>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <span className="hidden md:block">Admin User</span>
            </motion.div>
          </div>
        </header>
        
        {/* Stats Cards */}
        <div ref={statsCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(147, 51, 234, 0.3)' }}
              className="glass p-6 rounded-xl border border-border/60"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-full bg-background/50">
                  {card.icon}
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  card.trend.startsWith('+') ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                }`}>
                  {card.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{card.value}</h3>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Threat Feed Panel - 2/3 width */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-xl border border-border/60 lg:col-span-2"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-primary" />
              Live Threat Feed
            </h2>
            
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Threats</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="website">Website</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {threatFeed.map((threat) => (
                  <motion.div
                    key={threat.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="p-4 rounded-lg bg-secondary/30 border border-border/40 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      {threat.type === 'Email' ? (
                        <Mail className="w-5 h-5 text-primary" />
                      ) : (
                        <Globe className="w-5 h-5 text-primary" />
                      )}
                      <div>
                        <div className="font-medium">{threat.type} Threat Detected</div>
                        <div className="text-sm text-muted-foreground">
                          {threat.type === 'Email' ? threat.sender : threat.url}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <SeverityBadge severity={threat.severity} />
                      <span className="text-xs text-muted-foreground mt-1">
                        {threat.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="email" className="space-y-4">
                {threatFeed.filter(t => t.type === 'Email').map((threat) => (
                  <motion.div
                    key={threat.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="p-4 rounded-lg bg-secondary/30 border border-border/40 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Email Threat Detected</div>
                        <div className="text-sm text-muted-foreground">{threat.sender}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <SeverityBadge severity={threat.severity} />
                      <span className="text-xs text-muted-foreground mt-1">
                        {threat.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="website" className="space-y-4">
                {threatFeed.filter(t => t.type === 'Website').map((threat) => (
                  <motion.div
                    key={threat.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="p-4 rounded-lg bg-secondary/30 border border-border/40 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Website Threat Detected</div>
                        <div className="text-sm text-muted-foreground">{threat.url}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <SeverityBadge severity={threat.severity} />
                      <span className="text-xs text-muted-foreground mt-1">
                        {threat.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center mt-6">
              <AnimatedButton variant="secondary" size="sm">
                View All Threats
              </AnimatedButton>
            </div>
          </motion.div>
          
          {/* Globe Visualization - 1/3 width */}
          <motion.div 
            ref={globeRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-6 rounded-xl border border-border/60 flex flex-col h-[400px]"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Global Attack Map
            </h2>
            
            <div className="relative flex-1 flex items-center justify-center">
              <div className="globe-inner w-48 h-48 rounded-full bg-primary/5 border border-primary/20 relative">
                {/* Simulated attack points */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute w-3 h-3 bg-destructive rounded-full top-[20%] left-[70%]" 
                />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 3, 
                    delay: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute w-2 h-2 bg-yellow-500 rounded-full top-[40%] left-[30%]" 
                />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    delay: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute w-2 h-2 bg-primary rounded-full top-[60%] left-[60%]" 
                />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 3.5, 
                    delay: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute w-3 h-3 bg-orange-500 rounded-full top-[30%] left-[50%]" 
                />
                
                {/* Grid lines */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/10"></div>
                <div className="absolute inset-0 rounded-full border-2 border-primary/5" style={{ transform: 'rotateX(60deg)' }}></div>
                <div className="absolute inset-0 rounded-full border-2 border-primary/5" style={{ transform: 'rotateY(60deg)' }}></div>
              </div>
              
              {/* Pulse effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-48 h-48 rounded-full border-2 border-primary/30"
                />
              </div>
            </div>
            
            <div className="mt-auto grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Top Source</div>
                <div className="font-medium">Eastern Europe</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Active Attacks</div>
                <div className="font-medium">24</div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Chart Section */}
        <motion.div 
          ref={chartRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass p-6 rounded-xl border border-border/60 mb-8"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Phishing Attacks Trend
          </h2>
          
          <div className="h-64 w-full">
            <div className="relative h-full">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-b border-border/40 h-0" />
                ))}
              </div>
              
              <div className="relative h-full flex items-end justify-around z-10">
                {phishingData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.attacks / 40) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="w-10 bg-gradient-to-t from-primary/80 to-primary rounded-t-md"
                    />
                    <div className="text-xs mt-2">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <span className="text-sm">Phishing Attempts</span>
            </div>
          </div>
        </motion.div>
        
        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <AnimatedButton>
            Run Security Scan
          </AnimatedButton>
          <AnimatedButton variant="secondary">
            Generate Report
          </AnimatedButton>
          <AnimatedButton variant="outline">
            Check Email
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
