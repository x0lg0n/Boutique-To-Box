
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyzeStyle, generateDesign } from '@/services/api';
import { Link } from 'react-router-dom';

// Define style preferences, body types, etc.
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

const AIDesigns = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [stylePreference, setStylePreference] = useState('');
  const [garmentType, setGarmentType] = useState('');
  const [occasion, setOccasion] = useState('');
  const [designUrl, setDesignUrl] = useState('');
  const [currentStep, setCurrentStep] = useState('input');

  const handleAnalyzeStyle = async () => {
    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please provide a description of your design",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeStyle(description);
      if (result.success && result.keywords) {
        setKeywords(result.keywords);
        toast({
          title: "Success",
          description: "Style preferences analyzed successfully",
        });
      } else {
        throw new Error("Failed to analyze style");
      }
    } catch (error) {
      console.error("Style analysis error:", error);
      toast({
        title: "Error",
        description: "Failed to analyze style preferences",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDesign = async () => {
    if (!bodyType || !stylePreference || !garmentType || !occasion) {
      toast({
        title: "Error",
        description: "Please complete all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Use extracted keywords or default to empty array
      const designKeywords = keywords.length > 0 ? keywords : [description];
      
      const result = await generateDesign({
        userId: user?.email || 'guest',
        keywords: designKeywords,
        bodyType,
        stylePreference,
        garmentType,
        occasion
      });
      
      if (result.success && result.designUrl) {
        setDesignUrl(result.designUrl);
        setCurrentStep('result');
        toast({
          title: "Success",
          description: "Design generated successfully",
        });
      } else {
        throw new Error("Failed to generate design");
      }
    } catch (error) {
      console.error("Design generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate design",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Generated Designs</h1>
        <p className="text-muted-foreground">
          Create and manage your AI-powered clothing designs
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Design Generator</CardTitle>
          <CardDescription>Create custom clothing designs with AI</CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 'input' ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="description">Describe your ideal design</Label>
                <Textarea 
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Example: A flowing summer dress with floral patterns in blue and white, suitable for beach outings"
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleAnalyzeStyle} 
                    disabled={loading || !description.trim()}
                    className="bg-fashion-purple hover:bg-fashion-darkPurple"
                  >
                    {loading ? "Analyzing..." : "Analyze Style"}
                  </Button>
                </div>
                
                {keywords.length > 0 && (
                  <div className="mt-4 p-4 bg-muted rounded-md">
                    <p className="font-medium mb-2">Extracted Style Keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((keyword, index) => (
                        <span key={index} className="bg-fashion-softPurple text-fashion-darkPurple px-2 py-1 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
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
                    onClick={handleGenerateDesign}
                    disabled={loading || !bodyType || !stylePreference || !garmentType || !occasion}
                    className="bg-fashion-purple hover:bg-fashion-darkPurple"
                  >
                    {loading ? "Generating..." : "Generate Design"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                {designUrl ? (
                  <img 
                    src={designUrl} 
                    alt="Generated Design" 
                    className="max-h-[400px] rounded-md shadow-lg"
                  />
                ) : (
                  <div className="w-full h-[400px] bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Design image unavailable</p>
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-medium mb-2">Design Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Body Type:</p>
                    <p>{bodyTypes.find(b => b.id === bodyType)?.name || bodyType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Style:</p>
                    <p>{stylePreferences.find(s => s.id === stylePreference)?.name || stylePreference}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Garment:</p>
                    <p>{garmentTypes.find(g => g.id === garmentType)?.name || garmentType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Occasion:</p>
                    <p>{occasions.find(o => o.id === occasion)?.name || occasion}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep('input')}
                >
                  Back to Form
                </Button>
                <Button
                  onClick={() => {
                    toast({
                      title: "Success",
                      description: "Design saved to your collection",
                    });
                  }}
                  className="bg-fashion-purple hover:bg-fashion-darkPurple"
                >
                  Save Design
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIDesigns;
