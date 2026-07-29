import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { motion } from 'framer-motion';
import { SiX } from 'react-icons/si';
import { Globe } from 'lucide-react';

function TrakteerIcon({ className }: { className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}trakteer-logo.png`}
      alt="Trakteer"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

const queryClient = new QueryClient();

// Data
const PROFILE = {
  avatar: "https://cdn5.telesco.pe/file/Z5OiagkyMizcfiaFLo_YUURI33-sWE_ZWGwcAb6uJGLSFmsHgGI4_u2mhZCr8UBKbGquBArhiqOTOMEg_vvrhOXNSjpQd1gFo45mzQdY484NCyQ_60u8MuroKJ5RKJRl-Jz7AlQKbbLg7_1oNcSa_YLAUIhv52roK5eTPO2ic2H32MNQgmPQnd-4GFxxAZhiqWWfstJTTJ4lck3QPfKS7CUdKzdcIEPIBStWORQ-wydNBt2btqIwnZJRK4CN8Xrn9tsp-f6uTv360bjTUh19wslA4mGrVBfy4RTqNt8JcLJxu0wH19oWmbfRC_m9SzRaWe6aNuHR9uX3CM1Chkw1wg.jpg",
};

const LINKS = [
  {
    id: "trakteer",
    title: "Trakteer",
    icon: TrakteerIcon,
    url: "https://trakteer.id",
    highlight: true,
  },
  {
    id: "twitter",
    title: "Twitter / X",
    icon: SiX,
    url: "https://twitter.com",
    highlight: false,
  },
  {
    id: "website",
    title: "Personal Website",
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
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 p-1 shadow-lg shadow-primary/10">
              <img 
                src={PROFILE.avatar} 
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
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
                <span className="font-semibold tracking-tight text-white">
                  {link.title}
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
