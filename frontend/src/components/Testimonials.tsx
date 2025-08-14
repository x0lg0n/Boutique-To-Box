
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const testimonials = [
  {
    quote: "ThreadTailor helped me find clothes that actually fit my body type. The AI designs are surprisingly spot-on!",
    name: "Emma Rodriguez",
    title: "Fashion Blogger",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    quote: "I've always struggled to find clothes that match my style. The AI generator understands what I want better than I do!",
    name: "Marcus Chen",
    title: "Product Designer",
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    quote: "Being connected to local tailors who can make my custom designs is game-changing. The quality is amazing.",
    name: "Sarah Johnson",
    title: "Marketing Executive",
    avatar: "https://i.pravatar.cc/150?img=5"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">What Our Users Say</h2>
          <p className="text-muted-foreground md:text-lg md:w-3/4 mx-auto">
            Hear from fashion enthusiasts who have transformed their wardrobes with ThreadTailor
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full bg-secondary/30 border-none">
              <CardContent className="pt-6">
                <div className="mb-4 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute -top-2 -left-2 text-fashion-purple/20">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                  <p className="text-lg">{testimonial.quote}</p>
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-4 border-t pt-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
