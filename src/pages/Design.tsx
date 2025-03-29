
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import ThreeDModel from '@/components/ThreeDModel';

const bodyTypes = [
  { id: 'hourglass', name: 'Hourglass' },
  { id: 'pear', name: 'Pear' },
  { id: 'apple', name: 'Apple' },
  { id: 'rectangle', name: 'Rectangle' },
  { id: 'invTriangle', name: 'Inverted Triangle' },
];

const stylePreferences = [
  { id: 'casual', name: 'Casual' },
  { id: 'formal', name: 'Formal' },
  { id: 'bohemian', name: 'Bohemian' },
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'streetwear', name: 'Streetwear' },
  { id: 'vintage', name: 'Vintage' },
];

const garmentTypes = [
  { id: 'dress', name: 'Dress' },
  { id: 'top', name: 'Top/Blouse' },
  { id: 'pants', name: 'Pants/Trousers' },
  { id: 'skirt', name: 'Skirt' },
  { id: 'jacket', name: 'Jacket/Coat' },
];

const occasions = [
  { id: 'everyday', name: 'Everyday' },
  { id: 'work', name: 'Work/Office' },
  { id: 'evening', name: 'Evening/Party' },
  { id: 'outdoor', name: 'Outdoor/Casual' },
  { id: 'formal', name: 'Formal Event' },
];

const Design = () => {
  const [activeTab, setActiveTab] = useState('preferences');
  const [loading, setLoading] = useState(false);
  const [designGenerated, setDesignGenerated] = useState(false);

  // Form states
  const [bodyType, setBodyType] = useState('');
  const [stylePreference, setStylePreference] = useState('');
  const [garmentType, setGarmentType] = useState('');
  const [occasion, setOccasion] = useState('');
  const [description, setDescription] = useState('');
  const [materialPreference, setMaterialPreference] = useState(50); // 0-100 scale for natural vs synthetic

  const handleNextTab = () => {
    if (activeTab === 'preferences') {
      if (!bodyType || !stylePreference || !garmentType || !occasion) {
        toast({
          title: "Missing Information",
          description: "Please complete all required fields before proceeding.",
          variant: "destructive",
        });
        return;
      }
      setActiveTab('customize');
    } else if (activeTab === 'customize') {
      handleGenerateDesign();
    }
  };
  
  const handlePreviousTab = () => {
    if (activeTab === 'customize') {
      setActiveTab('preferences');
    } else if (activeTab === 'results') {
      setActiveTab('customize');
      setDesignGenerated(false);
    }
  };
  
  const handleGenerateDesign = () => {
    setLoading(true);
    
    // Simulate API call for design generation
    setTimeout(() => {
      setLoading(false);
      setDesignGenerated(true);
      setActiveTab('results');
      toast({
        title: "Design Generated",
        description: "Your custom fashion design has been created!",
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Design Studio</h1>
              <p className="text-muted-foreground">
                Create custom clothing designs tailored to your preferences
              </p>
            </div>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger 
                  value="preferences"
                  disabled={loading}
                >
                  1. Style Preferences
                </TabsTrigger>
                <TabsTrigger 
                  value="customize"
                  disabled={loading || activeTab === 'preferences'}
                >
                  2. Customize Design
                </TabsTrigger>
                <TabsTrigger 
                  value="results"
                  disabled={!designGenerated || loading}
                >
                  3. Your Design
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="preferences">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>What's your body type?</Label>
                        <RadioGroup value={bodyType} onValueChange={setBodyType} className="flex flex-wrap gap-4">
                          {bodyTypes.map((type) => (
                            <div key={type.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={type.id} id={`body-${type.id}`} />
                              <Label htmlFor={`body-${type.id}`}>{type.name}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>What's your style preference?</Label>
                        <RadioGroup value={stylePreference} onValueChange={setStylePreference} className="flex flex-wrap gap-4">
                          {stylePreferences.map((style) => (
                            <div key={style.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={style.id} id={`style-${style.id}`} />
                              <Label htmlFor={`style-${style.id}`}>{style.name}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>What garment type would you like to design?</Label>
                        <RadioGroup value={garmentType} onValueChange={setGarmentType} className="flex flex-wrap gap-4">
                          {garmentTypes.map((garment) => (
                            <div key={garment.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={garment.id} id={`garment-${garment.id}`} />
                              <Label htmlFor={`garment-${garment.id}`}>{garment.name}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>What occasion is this for?</Label>
                        <RadioGroup value={occasion} onValueChange={setOccasion} className="flex flex-wrap gap-4">
                          {occasions.map((occ) => (
                            <div key={occ.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={occ.id} id={`occasion-${occ.id}`} />
                              <Label htmlFor={`occasion-${occ.id}`}>{occ.name}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button
                          onClick={handleNextTab}
                          className="bg-fashion-purple hover:bg-fashion-darkPurple"
                        >
                          Next Step
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="customize">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Describe your ideal design (colors, patterns, details, etc.)</Label>
                        <Textarea 
                          placeholder="Example: I'd like a flowy summer dress with floral patterns in blue and white tones, slightly above knee length with cap sleeves."
                          className="min-h-[100px]"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Material Preference</Label>
                          <span className="text-sm text-muted-foreground">
                            {materialPreference <= 30 && "Mostly Natural Fibers"}
                            {materialPreference > 30 && materialPreference <= 70 && "Balanced Mix"}
                            {materialPreference > 70 && "Mostly Synthetic"}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Natural</span>
                          <Slider 
                            defaultValue={[50]} 
                            max={100} 
                            step={1} 
                            className="flex-1"
                            onValueChange={(value) => setMaterialPreference(value[0])}
                          />
                          <span className="text-sm">Synthetic</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Your Measurements (optional)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="height" className="text-xs">Height (cm)</Label>
                            <Input id="height" type="number" placeholder="175" />
                          </div>
                          <div>
                            <Label htmlFor="waist" className="text-xs">Waist (cm)</Label>
                            <Input id="waist" type="number" placeholder="76" />
                          </div>
                          <div>
                            <Label htmlFor="chest" className="text-xs">Chest/Bust (cm)</Label>
                            <Input id="chest" type="number" placeholder="92" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button
                          onClick={handlePreviousTab}
                          variant="outline"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleNextTab}
                          className="bg-fashion-purple hover:bg-fashion-darkPurple"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Generating Design...
                            </>
                          ) : (
                            'Generate Design'
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="results">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold">Your Custom Design</h3>
                          
                          {/* Design details */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Style:</span>
                              <span className="font-medium capitalize">
                                {stylePreferences.find(s => s.id === stylePreference)?.name || stylePreference}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Garment:</span>
                              <span className="font-medium capitalize">
                                {garmentTypes.find(g => g.id === garmentType)?.name || garmentType}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Occasion:</span>
                              <span className="font-medium capitalize">
                                {occasions.find(o => o.id === occasion)?.name || occasion}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Material:</span>
                              <span className="font-medium">
                                {materialPreference <= 30 && "Natural Fibers"}
                                {materialPreference > 30 && materialPreference <= 70 && "Mixed Materials"}
                                {materialPreference > 70 && "Synthetic Materials"}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 p-4 bg-muted rounded-lg">
                            <h4 className="text-sm font-medium mb-2">AI Design Notes</h4>
                            <p className="text-sm text-muted-foreground">
                              This {garmentTypes.find(g => g.id === garmentType)?.name.toLowerCase()} features a {stylePreference === 'minimalist' ? 'clean, simple' : stylePreference === 'bohemian' ? 'free-spirited, artistic' : stylePreference === 'vintage' ? 'retro-inspired' : 'contemporary'} design 
                              {description ? ` with ${description.toLowerCase()}` : ''}.
                              It's perfect for {occasions.find(o => o.id === occasion)?.name.toLowerCase()} occasions and designed to flatter a {bodyTypes.find(b => b.id === bodyType)?.name.toLowerCase()} body type.
                            </p>
                          </div>
                          
                          <div className="flex gap-2 mt-6">
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={handlePreviousTab}
                            >
                              Modify Design
                            </Button>
                            <Button
                              className="bg-fashion-purple hover:bg-fashion-darkPurple flex-1"
                            >
                              Find Tailors
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex flex-col">
                          <div className="bg-fashion-softGray rounded-lg shadow-lg overflow-hidden h-[400px] relative">
                            <ThreeDModel className="w-full h-full" />
                            
                            <div className="absolute bottom-4 right-4">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="flex items-center gap-2"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m6 9 6 6 6-6"/>
                                </svg>
                                3D View
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-center">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-fashion-purple">💡</span>
                              <span className="text-muted-foreground">Click and drag to rotate the model</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Design;
