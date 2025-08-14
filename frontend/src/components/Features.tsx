
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "AI Design Generator",
    description: "Create custom clothing designs based on your style preferences, occasion, and body type using our advanced AI.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fashion-purple">
        <path d="M13 11.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path>
        <path d="M2 12c0 5.5 4.5 10 10 10s10-4.5 10-10S17.5 2 12 2 2 6.5 2 12Z"></path>
        <path d="M12 2a5 5 0 0 0-5 5v5a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z"></path>
      </svg>
    ),
  },
  {
    title: "3D/AR Try-On",
    description: "Visualize your custom designs in 3D and AR before ordering, ensuring the perfect fit and style for your body.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fashion-purple">
        <path d="M12 3c.53 0 1.04.21 1.41.59.38.37.59.88.59 1.41 0 .53-.21 1.04-.59 1.41-.37.38-.88.59-1.41.59-.53 0-1.04-.21-1.41-.59C10.21 6.04 10 5.53 10 5c0-.53.21-1.04.59-1.41C10.96 3.21 11.47 3 12 3z"></path>
        <path d="M12 15c.53 0 1.04.21 1.41.59.38.37.59.88.59 1.41 0 .53-.21 1.04-.59 1.41-.37.38-.88.59-1.41.59-.53 0-1.04-.21-1.41-.59-.38-.37-.59-.88-.59-1.41 0-.53.21-1.04.59-1.41.37-.38.88-.59 1.41-.59z"></path>
        <path d="M20 12c.53 0 1.04.21 1.41.59.38.37.59.88.59 1.41 0 .53-.21 1.04-.59 1.41-.37.38-.88.59-1.41.59-.53 0-1.04-.21-1.41-.59-.38-.37-.59-.88-.59-1.41 0-.53.21-1.04.59-1.41.37-.38.88-.59 1.41-.59z"></path>
        <path d="M4 12c.53 0 1.04.21 1.41.59.38.37.59.88.59 1.41 0 .53-.21 1.04-.59 1.41-.37.38-.88.59-1.41.59-.53 0-1.04-.21-1.41-.59C2.21 14.04 2 13.53 2 13c0-.53.21-1.04.59-1.41C2.96 11.21 3.47 11 4 11z"></path>
        <path d="M5 5c.53 0 1.04.21 1.41.59.38.37.59.88.59 1.41 0 .53-.21 1.04-.59 1.41-.37.38-.88.59-1.41.59-.53 0-1.04-.21-1.41-.59C3.21 8.04 3 7.53 3 7c0-.53.21-1.04.59-1.41C3.96 5.21 4.47 5 5 5z"></path>
        <path d="M19 5c.53 0 1.04.21 1.41.59.38.37.59.88.59 1.41 0 .53-.21 1.04-.59 1.41-.37.38-.88.59-1.41.59-.53 0-1.04-.21-1.41-.59-.38-.37-.59-.88-.59-1.41 0-.53.21-1.04.59-1.41.37-.38.88-.59 1.41-.59z"></path>
        <path d="M19 19c.53 0 1.04.21 1.41.59.38.37.59.88.59 1.41 0 .53-.21 1.04-.59 1.41-.37.38-.88.59-1.41.59-.53 0-1.04-.21-1.41-.59-.38-.37-.59-.88-.59-1.41 0-.53.21-1.04.59-1.41.37-.38.88-.59 1.41-.59z"></path>
        <path d="M5 19c.53 0 1.04.21 1.41.59.38.37.59.88.59 1.41 0 .53-.21 1.04-.59 1.41-.37.38-.88.59-1.41.59-.53 0-1.04-.21-1.41-.59C3.21 22.04 3 21.53 3 21c0-.53.21-1.04.59-1.41.37-.38.88-.59 1.41-.59z"></path>
      </svg>
    ),
  },
  {
    title: "Tailor Connector",
    description: "Get your AI-designed clothes made by connecting with local tailors and manufacturers through our platform.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fashion-purple">
        <circle cx="6" cy="6" r="3"></circle>
        <circle cx="18" cy="18" r="3"></circle>
        <path d="M8.12 8.12 18 18"></path>
        <path d="M6 14a8 8 0 0 0 8 8"></path>
        <path d="M18 10a8 8 0 0 0-8-8"></path>
      </svg>
    ),
  },
  {
    title: "Trend Engine",
    description: "Stay ahead of fashion with our trend analysis engine that incorporates real-time fashion trends into your designs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fashion-purple">
        <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"></path>
        <path d="m13 12-3 5h4l-3 5"></path>
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Fashion Innovation at Your Fingertips</h2>
          <p className="text-muted-foreground md:text-lg md:w-3/4 mx-auto">
            Our AI-powered platform offers a suite of tools to create unique fashion designs tailored to your preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-2">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
