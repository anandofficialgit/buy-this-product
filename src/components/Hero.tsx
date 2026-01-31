import { ArrowDown, TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-16 md:py-24 gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            Today's Top Picks
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Discover Amazing
            <span className="block text-gradient">Product Deals</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We've curated the best products from across the web. Quality items at unbeatable prices, hand-picked just for you.
          </p>
          
          <div className="pt-4">
            <a 
              href="#products" 
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
            >
              <span className="font-medium">Explore Products</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
