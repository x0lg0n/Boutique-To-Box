
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
import { 
  User, 
  Sparkles, 
  Shirt, 
  Crown, 
  Coffee, 
  Briefcase, 
  PartyPopper, 
  TreePine, 
  Heart,
  Palette,
  Wind,
  Zap,
  Star,
  Moon,
  Scissors,
  Flower2,
  Diamond,
  Waves,
  Square,
  Triangle,
  Circle,
  Compass
} from 'lucide-react';
import ThreeDModel from '@/components/ThreeDModel';

const bodyTypes = [
  { 
    id: 'hourglass', 
    name: 'Hourglass', 
    icon: <Diamond className="w-6 h-6" />,
    description: 'Balanced bust and hips with defined waist'
  },
  { 
    id: 'pear', 
    name: 'Pear', 
    icon: <Triangle className="w-6 h-6" />,
    description: 'Fuller hips and thighs, narrower shoulders'
  },
  { 
    id: 'apple', 
    name: 'Apple', 
    icon: <Circle className="w-6 h-6" />,
    description: 'Fuller midsection, slimmer legs'
  },
  { 
    id: 'rectangle', 
    name: 'Rectangle', 
    icon: <Square className="w-6 h-6" />,
    description: 'Similar measurements throughout'
  },
  { 
    id: 'invTriangle', 
    name: 'Inverted Triangle', 
    icon: <Triangle className="w-6 h-6 rotate-180" />,
    description: 'Broader shoulders, narrower hips'
  },
];

const stylePreferences = [
  { 
    id: 'casual', 
    name: 'Casual', 
    icon: <Coffee className="w-6 h-6" />,
    description: 'Comfortable, relaxed everyday wear'
  },
  { 
    id: 'formal', 
    name: 'Formal', 
    icon: <Crown className="w-6 h-6" />,
    description: 'Elegant, sophisticated styling'
  },
  { 
    id: 'bohemian', 
    name: 'Bohemian', 
    icon: <Flower2 className="w-6 h-6" />,
    description: 'Free-spirited, artistic flair'
  },
  { 
    id: 'minimalist', 
    name: 'Minimalist', 
    icon: <Moon className="w-6 h-6" />,
    description: 'Clean lines, simple elegance'
  },
  { 
    id: 'streetwear', 
    name: 'Streetwear', 
    icon: <Zap className="w-6 h-6" />,
    description: 'Urban, trendy, comfortable'
  },
  { 
    id: 'vintage', 
    name: 'Vintage', 
    icon: <Star className="w-6 h-6" />,
    description: 'Retro-inspired timeless pieces'
  },
];

const garmentTypes = [
  { 
    id: 'dress', 
    name: 'Dress', 
    icon: <Sparkles className="w-6 h-6" />,
    description: 'One-piece elegance for any occasion'
  },
  { 
    id: 'top', 
    name: 'Top/Blouse', 
    icon: <Shirt className="w-6 h-6" />,
    description: 'Versatile upper body garments'
  },
  { 
    id: 'pants', 
    name: 'Pants/Trousers', 
    icon: <Waves className="w-6 h-6 rotate-90" />,
    description: 'Comfortable and stylish bottoms'
  },
  { 
    id: 'skirt', 
    name: 'Skirt', 
    icon: <Heart className="w-6 h-6" />,
    description: 'Feminine and flowing silhouettes'
  },
  { 
    id: 'jacket', 
    name: 'Jacket/Coat', 
    icon: <Scissors className="w-6 h-6" />,
    description: 'Layering pieces for style and warmth'
  },
];

const occasions = [
  { 
    id: 'everyday', 
    name: 'Everyday', 
    icon: <Coffee className="w-6 h-6" />,
    description: 'Perfect for daily activities'
  },
  { 
    id: 'work', 
    name: 'Work/Office', 
    icon: <Briefcase className="w-6 h-6" />,
    description: 'Professional and polished'
  },
  { 
    id: 'evening', 
    name: 'Evening/Party', 
    icon: <PartyPopper className="w-6 h-6" />,
    description: 'Special occasions and celebrations'
  },
  { 
    id: 'outdoor', 
    name: 'Outdoor/Casual', 
    icon: <TreePine className="w-6 h-6" />,
    description: 'Active and comfortable wear'
  },
  { 
    id: 'formal', 
    name: 'Formal Event', 
    icon: <Crown className="w-6 h-6" />,
    description: 'Elegant and sophisticated'
  },
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

  // Custom Selection Card Component
  const SelectionCard = ({ 
    item, 
    isSelected, 
    onSelect, 
    className = "" 
  }: { 
    item: { id: string; name: string; icon: React.ReactNode; description: string };
    isSelected: boolean;
    onSelect: (id: string) => void;
    className?: string;
  }) => (
    <div
      className={`selection-card ${isSelected ? 'selected selection-pulse' : ''} ${className}`}
      onClick={() => onSelect(item.id)}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={`text-fashion-purple ${isSelected ? 'icon-selected' : ''} transition-colors duration-200`}>
          {item.icon}
        </div>
        <div>
          <h3 className="font-semibold text-sm md:text-base">{item.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-tight">
            {item.description}
          </p>
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2">
            <div className="w-4 h-4 bg-fashion-purple rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-fashion-softGray/30 via-white to-fashion-softPink/20">
      <Navbar />
      
      <main className="flex-1 py-16 md:py-24 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-fashion-purple/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-fashion-softPink/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-fashion-purple to-fashion-darkPurple bg-clip-text text-transparent">
                Design Studio
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Create custom clothing designs tailored to your unique style and preferences. 
                Let's bring your fashion vision to life.
              </p>
            </div>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="space-y-8"
            >
              <TabsList className="grid w-full grid-cols-3 mb-10 bg-fashion-softGray/50 p-2 rounded-xl shadow-inner">
                <TabsTrigger 
                  value="preferences"
                  disabled={loading}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fashion-purple data-[state=active]:to-fashion-darkPurple data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 py-3 rounded-lg font-medium"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    1. Style Preferences
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="customize"
                  disabled={loading || activeTab === 'preferences'}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fashion-purple data-[state=active]:to-fashion-darkPurple data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 py-3 rounded-lg font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    2. Customize Design
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="results"
                  disabled={!designGenerated || loading}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fashion-purple data-[state=active]:to-fashion-darkPurple data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 py-3 rounded-lg font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    3. Your Design
                  </span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="preferences">
                <Card className="overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="space-y-8">
                      {/* Body Type Selection */}
                      <div className="space-y-4">
                        <div className="text-center mb-6">
                          <Label className="text-lg font-semibold flex items-center justify-center gap-2">
                            <Compass className="w-5 h-5 text-fashion-purple" />
                            What's your body type?
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2">
                            Help us create designs that flatter your unique silhouette
                          </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {bodyTypes.map((type) => (
                            <SelectionCard
                              key={type.id}
                              item={type}
                              isSelected={bodyType === type.id}
                              onSelect={setBodyType}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Style Preference Selection */}
                      <div className="space-y-4">
                        <div className="text-center mb-6">
                          <Label className="text-lg font-semibold flex items-center justify-center gap-2">
                            <Palette className="w-5 h-5 text-fashion-purple" />
                            What's your style preference?
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2">
                            Choose the aesthetic that resonates with your personality
                          </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {stylePreferences.map((style) => (
                            <SelectionCard
                              key={style.id}
                              item={style}
                              isSelected={stylePreference === style.id}
                              onSelect={setStylePreference}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Garment Type Selection */}
                      <div className="space-y-4">
                        <div className="text-center mb-6">
                          <Label className="text-lg font-semibold flex items-center justify-center gap-2">
                            <Shirt className="w-5 h-5 text-fashion-purple" />
                            What garment type would you like to design?
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2">
                            Select the piece you'd love to add to your wardrobe
                          </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {garmentTypes.map((garment) => (
                            <SelectionCard
                              key={garment.id}
                              item={garment}
                              isSelected={garmentType === garment.id}
                              onSelect={setGarmentType}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Occasion Selection */}
                      <div className="space-y-4">
                        <div className="text-center mb-6">
                          <Label className="text-lg font-semibold flex items-center justify-center gap-2">
                            <Sparkles className="w-5 h-5 text-fashion-purple" />
                            What occasion is this for?
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2">
                            Tell us where you'll be wearing this beautiful piece
                          </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {occasions.map((occ) => (
                            <SelectionCard
                              key={occ.id}
                              item={occ}
                              isSelected={occasion === occ.id}
                              onSelect={setOccasion}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-6">
                        <Button
                          onClick={handleNextTab}
                          className="bg-gradient-to-r from-fashion-purple to-fashion-darkPurple hover:opacity-90 px-8 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                          size="lg"
                        >
                          Next Step →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="customize">
                <Card className="overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="space-y-8">
                      {/* Design Description */}
                      <div className="space-y-4">
                        <div className="text-center mb-6">
                          <Label className="text-lg font-semibold flex items-center justify-center gap-2">
                            <Sparkles className="w-5 h-5 text-fashion-purple" />
                            Describe your ideal design
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2">
                            Paint us a picture with words - colors, patterns, details, and inspiration
                          </p>
                        </div>
                        <div className="relative">
                          <Textarea 
                            placeholder="Example: I'd like a flowy summer dress with floral patterns in blue and white tones, slightly above knee length with cap sleeves. I love romantic details like lace trim and buttons..."
                            className="min-h-[120px] border-2 focus:border-fashion-purple transition-colors duration-200 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                            {description.length}/500
                          </div>
                        </div>
                      </div>
                      
                      {/* Material Preference */}
                      <div className="space-y-4">
                        <div className="text-center mb-6">
                          <Label className="text-lg font-semibold flex items-center justify-center gap-2">
                            <Palette className="w-5 h-5 text-fashion-purple" />
                            Material Preference
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2">
                            Choose your preferred balance of natural vs synthetic materials
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-gray-100">
                          <div className="flex justify-between mb-4">
                            <span className="text-sm font-medium text-green-700 flex items-center gap-2">
                              <TreePine className="w-4 h-4" />
                              Natural Fibers
                            </span>
                            <span className="text-lg font-bold text-fashion-purple">
                              {materialPreference <= 30 && "Mostly Natural"}
                              {materialPreference > 30 && materialPreference <= 70 && "Balanced Mix"}
                              {materialPreference > 70 && "Mostly Synthetic"}
                            </span>
                            <span className="text-sm font-medium text-blue-700 flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              Synthetic Materials
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-green-600">🌿 Cotton, Silk, Wool</span>
                            <div className="flex-1">
                              <Slider 
                                value={[materialPreference]}
                                max={100} 
                                step={1} 
                                className="w-full"
                                onValueChange={(value) => setMaterialPreference(value[0])}
                              />
                            </div>
                            <span className="text-sm text-blue-600">⚡ Polyester, Nylon, Spandex</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Measurements Section */}
                      <div className="space-y-4">
                        <div className="text-center mb-6">
                          <Label className="text-lg font-semibold flex items-center justify-center gap-2">
                            <User className="w-5 h-5 text-fashion-purple" />
                            Your Measurements
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2">
                            Optional: Help us create a perfect fit just for you
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="height" className="text-sm font-medium flex items-center gap-2">
                              📏 Height (cm)
                            </Label>
                            <Input 
                              id="height" 
                              type="number" 
                              placeholder="175" 
                              className="border-2 focus:border-fashion-purple transition-colors duration-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="waist" className="text-sm font-medium flex items-center gap-2">
                              📐 Waist (cm)
                            </Label>
                            <Input 
                              id="waist" 
                              type="number" 
                              placeholder="76" 
                              className="border-2 focus:border-fashion-purple transition-colors duration-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="chest" className="text-sm font-medium flex items-center gap-2">
                              📊 Chest/Bust (cm)
                            </Label>
                            <Input 
                              id="chest" 
                              type="number" 
                              placeholder="92" 
                              className="border-2 focus:border-fashion-purple transition-colors duration-200"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between pt-6">
                        <Button
                          onClick={handlePreviousTab}
                          variant="outline"
                          className="border-2 hover:border-fashion-purple hover:text-fashion-purple transition-all duration-200 px-6"
                        >
                          ← Back
                        </Button>
                        <Button
                          onClick={handleNextTab}
                          className="bg-gradient-to-r from-fashion-purple to-fashion-darkPurple hover:opacity-90 px-8 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                          disabled={loading}
                          size="lg"
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Generating Your Design...
                            </>
                          ) : (
                            <>
                              Generate Design ✨
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="results">
                <Card className="overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-fashion-purple to-fashion-darkPurple bg-clip-text text-transparent">
                          Your Custom Design is Ready! ✨
                        </h2>
                        <p className="text-muted-foreground">
                          Here's your personalized fashion design based on your preferences
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="bg-gradient-to-br from-fashion-softGray to-white p-6 rounded-xl border shadow-sm">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-fashion-purple" />
                              Design Details
                            </h3>
                            
                            {/* Design details */}
                            <div className="space-y-3">
                              <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                                <span className="text-sm text-muted-foreground flex items-center gap-2">
                                  <Palette className="w-4 h-4" />
                                  Style:
                                </span>
                                <span className="font-medium capitalize bg-fashion-purple/10 px-3 py-1 rounded-full text-fashion-purple">
                                  {stylePreferences.find(s => s.id === stylePreference)?.name || stylePreference}
                                </span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                                <span className="text-sm text-muted-foreground flex items-center gap-2">
                                  <Shirt className="w-4 h-4" />
                                  Garment:
                                </span>
                                <span className="font-medium capitalize bg-fashion-purple/10 px-3 py-1 rounded-full text-fashion-purple">
                                  {garmentTypes.find(g => g.id === garmentType)?.name || garmentType}
                                </span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                                <span className="text-sm text-muted-foreground flex items-center gap-2">
                                  <Crown className="w-4 h-4" />
                                  Occasion:
                                </span>
                                <span className="font-medium capitalize bg-fashion-purple/10 px-3 py-1 rounded-full text-fashion-purple">
                                  {occasions.find(o => o.id === occasion)?.name || occasion}
                                </span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                                <span className="text-sm text-muted-foreground flex items-center gap-2">
                                  <TreePine className="w-4 h-4" />
                                  Material:
                                </span>
                                <span className="font-medium bg-fashion-purple/10 px-3 py-1 rounded-full text-fashion-purple">
                                  {materialPreference <= 30 && "Natural Fibers"}
                                  {materialPreference > 30 && materialPreference <= 70 && "Mixed Materials"}
                                  {materialPreference > 70 && "Synthetic Materials"}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-br from-fashion-softPink/30 to-fashion-softBlue/30 p-6 rounded-xl border shadow-sm">
                            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-fashion-purple" />
                              AI Design Notes
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              This {garmentTypes.find(g => g.id === garmentType)?.name.toLowerCase()} features a {stylePreference === 'minimalist' ? 'clean, simple' : stylePreference === 'bohemian' ? 'free-spirited, artistic' : stylePreference === 'vintage' ? 'retro-inspired' : 'contemporary'} design 
                              {description ? ` with ${description.toLowerCase().slice(0, 100)}${description.length > 100 ? '...' : ''}` : ''}.
                              It's perfect for {occasions.find(o => o.id === occasion)?.name.toLowerCase()} occasions and designed to flatter a {bodyTypes.find(b => b.id === bodyType)?.name.toLowerCase()} body type.
                            </p>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button 
                              variant="outline" 
                              className="flex-1 border-2 hover:border-fashion-purple hover:text-fashion-purple transition-all duration-200"
                              onClick={handlePreviousTab}
                            >
                              ← Modify Design
                            </Button>
                            <Button
                              className="bg-gradient-to-r from-fashion-purple to-fashion-darkPurple hover:opacity-90 flex-1 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                            >
                              Find Tailors 👗
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex flex-col">
                          <div className="bg-gradient-to-br from-fashion-softGray to-white rounded-xl shadow-lg overflow-hidden h-[450px] relative border">
                            <ThreeDModel className="w-full h-full" />
                            
                            <div className="absolute bottom-4 right-4">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="flex items-center gap-2 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m6 9 6 6 6-6"/>
                                </svg>
                                3D View
                              </Button>
                            </div>
                            
                            <div className="absolute top-4 left-4">
                              <div className="bg-fashion-purple/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                                AI Generated ✨
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-center">
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                              <span className="text-fashion-purple">💡</span>
                              <span>Click and drag to rotate • Scroll to zoom</span>
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
