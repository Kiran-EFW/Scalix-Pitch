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
import { showSuccess, showError } from "@/utils/toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(), // Phone number is optional
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
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
    // In a real application, you would send this data to a backend.
    // For this example, we'll just grant access immediately.
    showSuccess("Thank you! You now have access to the pitch deck.");
    onAccessGranted();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0a0e27] to-[#1a237e] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <img
            src="https://z-cdn-media.chatglm.cn/files/a6735ff9-1e2b-4cba-b0a3-2e4e50a5af33_logo.png.png?auth_key=1790171439-d2f879595c5640b2bd9030d45fc9b9d6-0-793df07e36ebfc08f202946421960f09"
            alt="Scalix World Logo"
            className="w-20 h-auto mx-auto mb-4 filter drop-shadow-lg"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Access Pitch Deck
          </h1>
          <p className="text-gray-300 text-sm">
            Please fill out the form below to view and download our pitch deck.
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