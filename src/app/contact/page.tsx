import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { contactPage, getSection } from "@/data/lpsVidhyawadiDatabase";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 lg:pt-40">
      <Navbar />
      
      {/* Header */}
      <section className="px-6 mb-20 text-center">
        <div className="max-w-7xl mx-auto">
          <span className="text-green-primary font-black uppercase tracking-[0.4em] text-sm mb-6 block">Get In Touch</span>
          <h1 className="text-5xl lg:text-8xl font-black text-navy leading-none mb-8">
            CONTACT <span className="text-green-primary">US.</span>
          </h1>
          <div className="h-2 w-32 bg-mint mx-auto rounded-full" />
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info Cards */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-navy mb-10">We&apos;d love to hear from you.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Call Us", detail: "02934-220935 / 220936", icon: Phone, color: "bg-mint/20 text-navy" },
                { title: "Email Us", detail: "lpsvidhyawadi@gmail.com", icon: Mail, color: "bg-green-primary/20 text-green-primary" },
                { title: "Visit Us", detail: "Vidyawadi, Khimel, Station - Rani, Pali", icon: MapPin, color: "bg-navy/10 text-navy" },
                { title: "Office Hours", detail: "Office enquiry: 11:00 AM to 3:00 PM", icon: Clock, color: "bg-yellow-accent/20 text-navy" },
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
                  <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-black text-navy uppercase text-xs tracking-widest mb-2">{item.title}</h3>
                  <p className="text-gray-600 font-bold">{item.detail}</p>
                </div>
              ))}
            </div>

            {/* Google Maps Placeholder */}
            <div className="w-full h-[400px] bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">
                {getSection(contactPage, "Reach Us")[1]}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-navy p-8 lg:p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-mint/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-4">Send a Message</h2>
              <p className="text-white/60 font-medium mb-10">Have a question? Fill out the form below and our team will get back to you within 24 hours.</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-mint uppercase tracking-widest ml-2">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-mint transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-mint uppercase tracking-widest ml-2">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-mint transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-mint uppercase tracking-widest ml-2">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-mint transition-colors appearance-none">
                    <option className="bg-navy">Admissions Inquiry</option>
                    <option className="bg-navy">General Question</option>
                    <option className="bg-navy">Career Opportunity</option>
                    <option className="bg-navy">Fee Related</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-mint uppercase tracking-widest ml-2">Your Message</label>
                  <textarea rows={5} placeholder="How can we help you?" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-mint transition-colors resize-none"></textarea>
                </div>
                <button className="w-full bg-mint text-navy py-5 rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-2xl hover:-translate-y-1 transition-all">
                  Send Message
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
