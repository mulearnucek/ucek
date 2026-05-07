"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ExternalLink, Images, Bell, Users } from "lucide-react";

export default function DashboardHome() {
  const router = useRouter();

  // These should be set in .env.local as NEXT_PUBLIC_*
  const forms = [
    {
      title: "Carousel Items",
      description: "Add or update images and text for the homepage carousel.",
      url: process.env.NEXT_PUBLIC_GOOGLE_FORM_CAROUSEL || "#",
      icon: Images,
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      title: "Notifications & Popups",
      description: "Manage important alerts, popups, and scrolling notifications.",
      url: process.env.NEXT_PUBLIC_GOOGLE_FORM_NOTIFICATIONS || "#",
      icon: Bell,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      title: "Faculty Information",
      description: "Update faculty details, designations, and contact info.",
      url: process.env.NEXT_PUBLIC_GOOGLE_FORM_FACULTY || "#",
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-100"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome to Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your website content, pages, and external data sources.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {forms.map((form, i) => {
          const Icon = form.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className={`w-12 h-12 rounded-lg ${form.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${form.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{form.title}</h3>
                <p className="text-sm text-gray-500 mb-6">{form.description}</p>
                <a 
                  href={form.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Open Google Form
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
