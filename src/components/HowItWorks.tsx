
const steps = [
  {
    number: "1",
    title: "Define Your Style",
    description: "Answer a few questions about your style preferences, body type, and the occasion.",
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "2",
    title: "Generate Designs",
    description: "Our AI generates custom clothing designs tailored to your preferences and measurements.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "3",
    title: "Virtual Try-On",
    description: "Preview your designs in 3D and AR to see how they look before ordering.",
    image: "https://images.unsplash.com/photo-1633419798825-5f9649384efb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "4",
    title: "Find a Tailor",
    description: "Connect with local tailors who can bring your AI-designed clothes to life.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">How Boutique to Box Works</h2>
          <p className="text-muted-foreground md:text-lg md:w-3/4 mx-auto">
            From idea to custom clothing in just four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-fashion-purple/30">
            <div className="absolute top-0 left-[12.5%] right-[12.5%] h-full"></div>
          </div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-fashion-purple text-white flex items-center justify-center font-bold text-lg mb-6 z-10">
                {step.number}
              </div>
              
              <div className="aspect-square w-full overflow-hidden rounded-xl mb-4">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
