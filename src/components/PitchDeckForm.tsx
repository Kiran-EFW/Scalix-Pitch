"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { showSuccess, showError } from "@/utils/toast";
import AnimatedBackground from "@/components/AnimatedBackground";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(), // Phone number is optional
  fundraisingContact: z.boolean().refine((val) => val === true, {
    message: "You must consent to fundraising contact to access the pitch deck.",
  }),
  dataHandling: z.boolean().refine((val) => val === true, {
    message: "You must consent to data handling to access the pitch deck.",
  }),
});

interface PitchDeckFormProps {
  onAccessGranted: () => void;
}

const PitchDeckForm: React.FC<PitchDeckFormProps> = ({ onAccessGranted }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      fundraisingContact: false,
      dataHandling: false,
    },
  });
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  console.log("Form submitted:", values);

  // Replace YOUR-PROJECT-ID with your actual Firebase Project ID
  const functionUrl = 'https://us-central1-scalix-pitch-deck.cloudfunctions.net/saveFormData';

  try {
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      console.log('Data saved successfully!');
      showSuccess("Thank you! Your consent has been recorded and you now have access to the pitch deck.");
      onAccessGranted(); // Grant access after a successful submission
    } else {
      console.error('Failed to save data. Status:', response.status);
      showError("There was an error saving your data. Please try again.");
    }
  } catch (error) {
    console.error('Network or server error:', error);
    showError("Network error. Please check your connection and try again.");
  }
};


//  const onSubmit = (values: z.infer<typeof formSchema>) => {
  //  console.log("Form submitted:", values);
    // In a real application, you would send this data to a backend.
    // For this example, we'll just grant access immediately.
//    showSuccess("Thank you! Your consent has been recorded and you now have access to the pitch deck.");
 //   onAccessGranted();
 // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0a0e27] to-[#1a237e] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Animated Background Elements */}
      <AnimatedBackground />

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <img
            src="/scalix-logo.png"
            alt="Scalix World Logo"
            className="w-20 h-auto mx-auto mb-4 filter drop-shadow-lg"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Access Pitch Deck
          </h1>
          <p className="text-gray-300 text-sm">
            Please fill out the form below and provide consent to view and download our pitch deck. 
            By submitting this form, you agree to our{" "}
            <a 
              href="/privacy-policy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Glassmorphism Form Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        {...field}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Phone Number <span className="text-gray-400 text-sm">(Optional)</span></FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+44 7553 879404"
                        {...field}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              {/* Fundraising Contact Consent */}
              <FormField
                control={form.control}
                name="fundraisingContact"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-white font-medium text-sm">
                        I consent to Scalix World contacting me regarding our fundraising activities
                      </FormLabel>
                      <p className="text-gray-400 text-xs">
                        We may reach out to you via the provided contact information to discuss investment opportunities and fundraising updates.
                      </p>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Data Handling Consent */}
              <FormField
                control={form.control}
                name="dataHandling"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-white font-medium text-sm">
                        I consent to the safe handling of my personal data
                      </FormLabel>
                      <p className="text-gray-400 text-xs">
                        Your data will be processed securely and in accordance with our{" "}
                        <a 
                          href="/privacy-policy" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          privacy policy
                        </a>
                        . We will not share your information with third parties without your explicit consent.
                      </p>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Pitch Deck
              </Button>
            </form>
          </Form>
        </div>

        {/* Founder Info */}
        <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center">
          <div className="text-white font-semibold mb-2">Kiran Ravi Kumar</div>
          <div className="text-gray-300 text-sm mb-3">Founder & CEO</div>
          <div className="flex justify-center gap-4 text-xs text-gray-400">
            <div>team@scalix.world</div>
            <div>•</div>
            <div>+44 7553879404</div>
          </div>
        </div>

        {/* Company Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-xs font-medium">XENOLIX TECHNOLOGIES PVT LTD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeckForm;
