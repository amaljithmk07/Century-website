import { getInquiries, getGalleryImages } from "@/lib/db";
import Link from "next/link";
import { 
  Inbox, 
  Image as ImageIcon, 
  MessageSquare, 
  ArrowRight,
  TrendingUp,
  Mail,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 0; // Disable static rendering caching to ensure live data

export default async function AdminOverviewPage() {
  const inquiries = await getInquiries();
  const gallery = await getGalleryImages();

  // Statistics calculations
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === "new").length;
  const whatsappInquiries = inquiries.filter(i => i.type === "whatsapp").length;
  const emailInquiries = inquiries.filter(i => i.type === "contact").length;
  const totalGallery = gallery.length;

  const recentInquiries = inquiries.slice(0, 5);

  const stats = [
    {
      label: "Total Inquiries",
      value: totalInquiries,
      description: "From all channels",
      icon: Inbox,
      color: "text-gold",
    },
    {
      label: "New Inquiries",
      value: newInquiries,
      description: "Awaiting action",
      icon: MessageSquare,
      color: "text-gold-light animate-pulse",
    },
    {
      label: "Gallery Images",
      value: totalGallery,
      description: "Active photos",
      icon: ImageIcon,
      color: "text-gold",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header section */}
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold-600 font-semibold block mb-1">Administration Control</span>
        <h2 
          className="text-4xl font-light text-neutral-800 tracking-wide"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Dashboard Overview
        </h2>
        <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
          Welcome back. Here is the dynamic status overview of the Century Convention Center portal.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, idx) => {
          return (
            <div 
              key={idx}
              className="relative overflow-hidden rounded-2xl border border-gold/15 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-md group"
            >
              {/* Subtle top light overlay */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">{stat.label}</p>
                  <p 
                    className="mt-3 text-5xl font-light text-gold-600 tracking-tight"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-full border border-gold/20 bg-gradient-to-tr from-gold/5 to-transparent p-3.5 text-gold-600 transition-transform duration-300 group-hover:scale-105`}>
                  <stat.icon className="h-4.5 w-4.5" strokeWidth={1} />
                </div>
              </div>
              <div className="mt-5 border-t border-gold/10 pt-3.5">
                <span className="text-[10px] uppercase tracking-wide text-neutral-400 font-medium">{stat.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inquiry Source Analysis & Shortcuts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Source Analysis */}
        <div className="rounded-2xl border border-gold/15 bg-white p-6 lg:col-span-1 flex flex-col justify-between shadow-sm relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
          
          <div>
            <h3 
              className="text-lg font-light text-neutral-800 mb-6 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Inquiry Channels
            </h3>
            <div className="space-y-6">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs tracking-wider">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Mail className="h-3.5 w-3.5 text-gold-600" strokeWidth={1} />
                    <span className="uppercase text-[10px] font-medium">Website Form</span>
                  </div>
                  <span className="font-sans font-medium text-neutral-800">{emailInquiries}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 border border-neutral-200">
                  <div 
                    className="h-full bg-gradient-to-r from-gold/50 to-gold" 
                    style={{ width: `${totalInquiries > 0 ? (emailInquiries / totalInquiries) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs tracking-wider">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Smartphone className="h-3.5 w-3.5 text-emerald-600" strokeWidth={1} />
                    <span className="uppercase text-[10px] font-medium">WhatsApp Chat</span>
                  </div>
                  <span className="font-sans font-medium text-neutral-800">{whatsappInquiries}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 border border-neutral-200">
                  <div 
                    className="h-full bg-emerald-500" 
                    style={{ width: `${totalInquiries > 0 ? (whatsappInquiries / totalInquiries) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-gold/5 border border-gold/15 p-4 text-center">
            <TrendingUp className="h-4 w-4 text-gold-600 mx-auto mb-2" strokeWidth={1.5} />
            <p className="text-[11px] font-semibold text-gold-600 uppercase tracking-widest">Active Channels</p>
            <p className="text-[10px] text-neutral-500 mt-1.5 leading-relaxed">WhatsApp continues to be the preferred direct booking channel for visitors.</p>
          </div>
        </div>

        {/* Quick Links / Actions */}
        <div className="rounded-2xl border border-gold/15 bg-white p-6 lg:col-span-2 shadow-sm relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
          
          <div className="flex items-center justify-between mb-6">
            <h3 
              className="text-lg font-light text-neutral-800 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Recent Inquiries
            </h3>
            <Button variant="ghost" size="sm" asChild className="text-gold-600 hover:text-gold-700 hover:bg-gold/5 rounded-xl text-[10px] gap-1.5 uppercase tracking-widest font-semibold px-3 h-8">
              <Link href="/admin/inquiries">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="flex h-52 flex-col items-center justify-center rounded-xl border border-dashed border-gold/15 p-6 text-center">
              <Inbox className="h-6 w-6 text-neutral-300 mb-2.5" strokeWidth={1} />
              <p className="text-xs text-neutral-400 tracking-wider uppercase">No inquiries received yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gold/15 text-neutral-400 text-[9px] uppercase tracking-[0.2em] font-semibold">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Event Type</th>
                    <th className="pb-3 font-medium">Channel</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5">
                  {recentInquiries.map((inq) => {
                    const statusConfig = {
                      new: "bg-gold/5 text-gold-600 border-gold/20",
                      read: "bg-blue-500/5 text-blue-600 border-blue-500/10",
                      replied: "bg-emerald-500/5 text-emerald-600 border-emerald-500/10",
                      archived: "bg-neutral-100 text-neutral-500 border-neutral-200",
                    };

                    const channelConfig = {
                      contact: { label: "Form", bg: "bg-gold/5 text-gold-600 border-gold/10" },
                      whatsapp: { label: "WhatsApp", bg: "bg-emerald-500/5 text-emerald-600 border-emerald-500/10" },
                    };

                    return (
                      <tr key={inq.id} className="group hover:bg-neutral-50/50 transition-colors border-b border-gold/5 last:border-0">
                        <td className="py-3 font-medium text-neutral-800">{inq.name}</td>
                        <td className="py-3 text-neutral-600">{inq.eventType}</td>
                        <td className="py-3">
                          <span className={`inline-block rounded-full border px-2 py-0.2 text-[8px] font-semibold tracking-wider uppercase ${channelConfig[inq.type].bg}`}>
                            {channelConfig[inq.type].label}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`inline-block rounded-full border px-2 py-0.2 text-[8px] font-semibold tracking-wider uppercase ${statusConfig[inq.status]}`}>
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-3 text-right text-[10px] text-neutral-400">
                          {new Date(inq.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
