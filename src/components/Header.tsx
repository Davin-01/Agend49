import { Button } from "@/components/ui/button";
import { Brain, Github, FileText, BookOpen, MessageCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-accent rounded-lg shadow-glow-sm">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tight">ncAGENTS</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 group"
            >
              <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="relative">
                Github
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 group"
            >
              <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="relative">
                Docs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 group"
            >
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="relative">
                Whitepaper
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 group"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="relative">
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <a href="/signin" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="hover:bg-secondary/30">
                Sign In
              </Button>
            </a>
            <a href="/signup">
              <Button variant="hero" size="lg" className="font-semibold group">
                Let's Talk
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;