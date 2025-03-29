import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
const Hero = () => {
  return <div className="relative overflow-hidden pt-28 md:pt-32 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-fashion-softPink rounded-full blur-3xl opacity-30 animate-pulse-light -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fashion-softBlue rounded-full blur-3xl opacity-30 animate-pulse-light animation-delay-1000 -z-10"></div>
      
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-gray-800">Generate custom</span>
              <br />
              <span className="bg-gradient-to-r from-fashion-purple to-fashion-darkPurple bg-clip-text text-transparent">fashion designs</span>
              <br />
              <span className="text-gray-800">with AI technology</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground md:w-[85%]">
              Create unique clothing tailored to your style, body type, and preferences using our advanced AI design generator.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-gradient-to-r from-fashion-purple to-fashion-darkPurple hover:opacity-90 text-white px-8 py-6 rounded-md text-lg" asChild>
                <Link to="/design">Start Designing</Link>
              </Button>
              
              <Button variant="outline" className="border-fashion-purple text-fashion-purple hover:bg-fashion-purple/10 px-8 py-6 rounded-md text-lg">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center gap-4 pt-2">
              <span className="text-sm text-muted-foreground">As featured in:</span>
              <div className="flex gap-6 items-center">
                <div className="text-muted-foreground/60 text-sm font-medium">WIRED</div>
                <div className="text-muted-foreground/60 text-sm font-medium">TechCrunch</div>
                <div className="text-muted-foreground/60 text-sm font-medium">Vogue</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative h-[400px] md:h-[480px] bg-white rounded-xl shadow-lg overflow-hidden card-shine">
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80" alt="AI Fashion Design" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg px-[60px] my-[45px] py-[15px]">
                    <h3 className="text-lg font-semibold mb-1">Custom Summer Dress</h3>
                    <p className="text-sm text-muted-foreground">Generated based on bohemian style preferences and summer trends</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating element */}
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-lg bg-fashion-softGray shadow-md p-3 flex flex-col justify-center items-center animate-float px-[2px] mx-[12px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fashion-purple mb-1"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg>
              <span className="text-xs font-medium text-center">Body Type Detection</span>
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-lg bg-fashion-softGray shadow-md p-3 flex flex-col justify-center items-center animate-float animation-delay-1000 mx-0 my-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fashion-purple mb-1"><path d="m6 9 6 6 6-6" /></svg>
              <span className="text-xs font-medium text-center">3D Try-On</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;