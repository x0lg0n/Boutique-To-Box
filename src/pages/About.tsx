
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About ThreadTailor</h1>
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-muted-foreground mb-8">
              Revolutionizing fashion with AI-powered custom clothing design for everyone.
            </p>
            
            <Card className="mb-10">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  At ThreadTailor, we believe everyone deserves clothing that fits perfectly and expresses 
                  their unique style. Our AI-powered platform combines cutting-edge technology with fashion 
                  expertise to make custom clothing design accessible to all.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Our AI analyzes your style preferences, body measurements, and fashion trends to create
                    clothing designs that are uniquely yours. No more compromise between style and fit.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sustainable Fashion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    By creating clothes that are designed specifically for you, we reduce waste and promote
                    sustainable fashion practices. Quality over quantity is at the heart of our philosophy.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <p className="mb-6">
              ThreadTailor brings together experts from fashion design, artificial intelligence, and 
              manufacturing to create a revolutionary platform that makes custom clothing accessible to all.
            </p>

            <div className="bg-muted p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p>
                Have questions or suggestions? We'd love to hear from you! Contact us at 
                <a href="mailto:info@threadtailor.com" className="text-fashion-purple"> info@threadtailor.com</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
