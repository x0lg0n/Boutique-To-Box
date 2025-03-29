
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg -z-10"></div>
      
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to Create Your Dream Wardrobe?
          </h2>
          <p className="text-muted-foreground md:text-lg mb-8">
            Start designing custom clothing that fits your style, body, and personality perfectly.
            Our AI-powered platform makes fashion design accessible to everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-gradient-to-r from-fashion-purple to-fashion-darkPurple hover:opacity-90 text-white px-8 py-6 rounded-md text-lg"
              asChild
            >
              <Link to="/design">Start Designing Now</Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-fashion-purple text-fashion-purple hover:bg-fashion-purple/10 px-8 py-6 rounded-md text-lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
