"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Lock, Eye, Database, Users, Globe } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0a0e27] to-[#1a237e] p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/pitch-deck">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Pitch Deck
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 mb-6">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="text-white font-semibold">Privacy Policy</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how Scalix World collects, uses, and protects your personal information.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-400" />
              Introduction
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Scalix World ("we," "our," or "us") is committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                access our pitch deck or interact with our services.
              </p>
              <p>
                By providing your personal information and consenting to our data handling practices, you agree to 
                the collection and use of information in accordance with this policy.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-400" />
              Information We Collect
            </h2>
            <div className="text-gray-300 space-y-4">
              <h3 className="text-xl font-semibold text-white">Personal Information</h3>
              <p>When you access our pitch deck, we may collect:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Name:</strong> Your full name for identification purposes</li>
                <li><strong>Email Address:</strong> For communication and follow-up purposes</li>
                <li><strong>Phone Number:</strong> Optional contact information for direct communication</li>
                <li><strong>Consent Records:</strong> Your explicit consent for fundraising contact and data handling</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mt-6">Technical Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>IP Address:</strong> For security and analytics purposes</li>
                <li><strong>Browser Information:</strong> To ensure compatibility and improve user experience</li>
                <li><strong>Access Logs:</strong> Timestamps and pages visited for security monitoring</li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-400" />
              How We Use Your Information
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>We use your personal information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Fundraising Communications:</strong> To contact you regarding investment opportunities and fundraising updates</li>
                <li><strong>Business Development:</strong> To provide information about Scalix World's products and services</li>
                <li><strong>Legal Compliance:</strong> To meet regulatory requirements and legal obligations</li>
                <li><strong>Security:</strong> To protect against fraud and unauthorized access</li>
                <li><strong>Analytics:</strong> To improve our services and understand user engagement</li>
              </ul>
            </div>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-blue-400" />
              Data Protection & Security
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>We implement appropriate technical and organizational measures to protect your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
                <li><strong>Access Controls:</strong> Limited access to personal information on a need-to-know basis</li>
                <li><strong>Regular Audits:</strong> Periodic security assessments and updates</li>
                <li><strong>Secure Infrastructure:</strong> Industry-standard security measures for data storage</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-400" />
              Data Sharing & Third Parties
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in our operations (under strict confidentiality agreements)</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
            <div className="text-gray-300 space-y-4">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request access to your personal information we hold</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a structured format</li>
                <li><strong>Withdrawal of Consent:</strong> Withdraw your consent at any time</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at <a href="mailto:privacy@scalix.world" className="text-blue-400 hover:underline">privacy@scalix.world</a>
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, 
                unless a longer retention period is required or permitted by law. Typically, we retain:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contact information for up to 3 years after your last interaction with us</li>
                <li>Consent records for the duration of our business relationship</li>
                <li>Technical logs for up to 1 year for security purposes</li>
              </ul>
            </div>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">International Data Transfers</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Your personal information may be transferred to and processed in countries other than your country of residence. 
                We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards 
                to protect your information.
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services 
                after any modifications constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <div className="text-gray-300 space-y-4">
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <div className="space-y-3">
                  <div>
                    <strong className="text-white">Email:</strong> 
                    <a href="mailto:privacy@scalix.world" className="text-blue-400 hover:underline ml-2">privacy@scalix.world</a>
                  </div>
                  <div>
                    <strong className="text-white">General Contact:</strong> 
                    <a href="mailto:team@scalix.world" className="text-blue-400 hover:underline ml-2">team@scalix.world</a>
                  </div>
                  <div>
                    <strong className="text-white">Phone:</strong> 
                    <span className="text-gray-300 ml-2">+44 7553879404</span>
                  </div>
                  <div>
                    <strong className="text-white">Company:</strong> 
                    <span className="text-gray-300 ml-2">XENOLIX TECHNOLOGIES PVT LTD</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-xs font-medium">XENOLIX TECHNOLOGIES PVT LTD</span>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            © 2024 Scalix World • Founded by Kiran Ravi Kumar
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
