import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { motion } from 'framer-motion';
import { SiTelegram, SiGithub, SiX, SiInstagram, SiYoutube, SiTiktok } from 'react-icons/si';
import { Globe, BadgeCheck, MapPin } from 'lucide-react';

const queryClient = new QueryClient();

// Data
const PROFILE = {
  name: "Alex Developer",
  handle: "@alexdev",
  bio: "Building aesthetic digital experiences. Crafting open-source tools and exploring the frontiers of the web.",
  location: "San Francisco",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop",
  stats: [
    { label: "Links", value: "7" },
    { label: "Projects", value: "24" },
    { label: "Followers", value: "12.5k" }
  ]
};

const LINKS = [
  {
    id: "telegram",
    title: "Telegram Channel",
    subtitle: "Daily updates & thoughts",
    icon: SiTelegram,
    url: "https://telegram.org",
    highlight: true,
  },
  {
    id: "github",
    title: "GitHub",
    subtitle: "Open source contributions",
    icon: SiGithub,
    url: "https://github.com",
    highlight: false,
  },
  {
    id: "twitter",
    title: "Twitter / X",
    subtitle: "Short form thoughts",
    icon: SiX,
    url: "https://twitter.com",
    highlight: false,
  },
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "Behind the scenes",
    icon: SiInstagram,
    url: "https://instagram.com",
    highlight: false,
  },
  {
    id: "youtube",
    title: "YouTube",
    subtitle: "Video essays & tutorials",
    icon: SiYoutube,
    url: "https://youtube.com",
    highlight: false,
  },
  {
    id: "tiktok",
    title: "TikTok",
    subtitle: "Bite-sized coding tips",
    icon: SiTiktok,
    url: "https://tiktok.com",
    highlight: false,
  },
  {
    id: "website",
    title: "Personal Website",
    subtitle: "Portfolio & blog",
    icon: Globe,
    url: "https://example.com",
    highlight: false,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

function Home() {
  return (
    <div className="min-h-[100dvh] w-full flex justify-center bg-background text-foreground selection:bg-primary/30">
      {/* Maximum width constraint for mobile-first feel on desktop */}
      <div className="w-full max-w-[440px] px-5 py-10 flex flex-col items-center">
        
        {/* Profile Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-8 w-full"
        >
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 p-1 shadow-lg shadow-primary/10">
              <img 
                src={PROFILE.avatar} 
                alt={PROFILE.name} 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
              <BadgeCheck className="w-6 h-6 text-primary fill-primary/20" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1 flex items-center gap-2">
            {PROFILE.name}
          </h1>
          <p className="text-primary font-medium text-sm mb-3">{PROFILE.handle}</p>
          
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[320px] mb-4">
            {PROFILE.bio}
          </p>

          <div className="flex items-center gap-1 text-xs text-muted-foreground/80 font-medium bg-secondary/50 px-3 py-1.5 rounded-full mb-6">
            <MapPin className="w-3 h-3" />
            <span>{PROFILE.location}</span>
          </div>

          {/* Stats Row */}
          <div className="flex w-full justify-between items-center bg-card/40 border border-border/50 rounded-2xl p-4 mb-2 backdrop-blur-sm">
            {PROFILE.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center w-1/3">
                <span className="text-white font-bold text-lg">{stat.value}</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Links List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col gap-3"
        >
          {LINKS.map((link) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className={`
                group relative flex items-center p-4 rounded-2xl 
                overflow-hidden transition-colors border
                ${link.highlight 
                  ? 'bg-primary text-primary-foreground border-primary/50 shadow-md shadow-primary/20' 
                  : 'bg-card text-card-foreground border-border/50 hover:bg-secondary/80'}
              `}
            >
              {/* Optional inner glow on hover for non-highlighted */}
              {!link.highlight && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-xl mr-4 shrink-0 transition-transform group-hover:scale-110
                ${link.highlight ? 'bg-white/20' : 'bg-secondary/80 text-primary group-hover:bg-primary/20 group-hover:text-primary'}
              `}>
                <link.icon className="w-5 h-5" />
              </div>
              
              <div className="flex flex-col flex-1 text-left">
                <span className={`font-semibold tracking-tight ${link.highlight ? 'text-white' : 'text-white'}`}>
                  {link.title}
                </span>
                <span className={`text-xs mt-0.5 ${link.highlight ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {link.subtitle}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 mb-6"
        >
          <div className="flex flex-col items-center text-xs text-muted-foreground/60 font-medium">
            <span>Powered by Telegram</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
