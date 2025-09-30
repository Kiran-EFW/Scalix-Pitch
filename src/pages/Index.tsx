import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, Shield, Zap } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0a0e27] to-[#1a237e] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl"></div>
      </div>

      {/* Animated Background Elements */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Logo and Brand */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <img
              src="/scalix-logo.png"
              alt="Scalix World Logo"
              className="w-32 h-auto mx-auto mb-6 filter drop-shadow-lg"
            />
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 leading-tight">
              SCALIX WORLD
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              Desktop-First AI Development Platform
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Privacy-First</h3>
              <p className="text-gray-400 text-sm">Process sensitive data locally without cloud dependencies</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Ultra-Fast</h3>
              <p className="text-gray-400 text-sm">Sub-second response times with local AI processing</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Developer Control</h3>
              <p className="text-gray-400 text-sm">Full control over your development environment</p>
            </div>
          </div>

          {/* YouTube Video Section */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              Watch Our Story
            </h2>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/LPf5uxztRIc"
                title="Scalix World - Desktop-First AI Development Platform"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Experience the Future of AI Development
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join the Scalix ecosystem and revolutionize your development workflow. Save time, modernize your processes, and unlock the power of desktop-first AI development.
              View our complete pitch deck to discover how we're transforming the AI development landscape.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pitch-deck">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  View Pitch Deck
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Company Badge */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-sm font-medium">XENOLIX TECHNOLOGIES PVT LTD</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <span>© 2024 Scalix World</span>
          <span>•</span>
          <span>Founded by Kiran Ravi Kumar</span>
        </div>
      </div>
    </div>
  );
};

export default Index;