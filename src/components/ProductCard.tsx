import { Star, ExternalLink, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  link: string;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <Card 
      className="group relative overflow-hidden bg-card border-0 shadow-card hover:shadow-card-hover transition-all duration-500 ease-out animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <Badge className="absolute top-4 left-4 z-10 gradient-warm border-0 text-primary-foreground font-semibold">
          {discountPercent}% OFF
        </Badge>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Category & Brand */}
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {product.category}
          </span>
          <span className="text-sm font-semibold text-primary">
            {product.brand}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-serif text-lg font-semibold text-foreground leading-tight line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="text-sm font-semibold text-foreground">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice!.toLocaleString()}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1 gradient-warm border-0 text-primary-foreground hover:opacity-90 transition-opacity"
            onClick={() => window.open(product.link, '_blank')}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy Now
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="border-border hover:bg-secondary"
            onClick={() => window.open(product.link, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
