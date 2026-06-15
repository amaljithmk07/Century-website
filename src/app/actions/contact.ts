"use server";

import { Resend } from "resend";
import { z } from "zod";
import { addInquiry, getSettings } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  eventType: z.string().min(1),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  message: z.string().min(10),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Handles normal contact form submissions: logs to DB, then emails via Resend
 */
export async function submitContactForm(data: ContactFormData) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data. Please check your inputs." };
  }

  const { name, email, phone, eventType, eventDate, guestCount, message } = parsed.data;

  // 1. Log inquiry in database first
  try {
    await addInquiry({
      name,
      email,
      phone,
      eventType,
      eventDate,
      guestCount,
      message,
      type: "contact",
    });
  } catch (dbError) {
    console.error("Failed to log inquiry in DB:", dbError);
  }

  // 2. Fetch email contact coordinates from settings
  const settings = await getSettings();
  const contactEmail = settings.email || process.env.CONTACT_EMAIL || "info@centuryconvention.com";

  const emailHtml = `
    <h2>New Inquiry - Century Convention Center</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Event Type:</strong> ${eventType}</p>
    ${eventDate ? `<p><strong>Event Date:</strong> ${eventDate}</p>` : ""}
    ${guestCount ? `<p><strong>Guest Count:</strong> ${guestCount}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  if (!process.env.RESEND_API_KEY) {
    console.log("Contact form submission (dev mode - no API key):", parsed.data);
    return { success: true };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Century Convention Center <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: email,
      subject: `New Inquiry: ${eventType} from ${name}`,
      html: emailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: "Failed to send your inquiry email. However, your inquiry has been recorded, and our team will get in touch soon.",
    };
  }
}

/**
 * Handles WhatsApp quick inquiries: logs to DB, then returns pre-filled WhatsApp link
 */
export async function submitWhatsAppInquiryAction(data: {
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  eventDate?: string;
  guestCount?: string;
  message: string;
}) {
  try {
    // 1. Save to database
    await addInquiry({
      name: data.name,
      email: data.email || "",
      phone: data.phone,
      eventType: data.eventType,
      eventDate: data.eventDate || "",
      guestCount: data.guestCount || "",
      message: data.message,
      type: "whatsapp",
    });

    // 2. Fetch target WhatsApp number from database settings
    const settings = await getSettings();
    const targetWhatsApp = settings.whatsapp || "919876543210";

    // 3. Construct message
    const lines = [
      `*New Booking Inquiry - Century Convention Center*`,
      `*Name:* ${data.name}`,
      `*Phone:* ${data.phone}`,
      data.email ? `*Email:* ${data.email}` : null,
      `*Event Type:* ${data.eventType}`,
      data.eventDate ? `*Preferred Date:* ${data.eventDate}` : null,
      data.guestCount ? `*Expected Guests:* ${data.guestCount}` : null,
      `*Message:* ${data.message}`,
    ].filter(Boolean);

    const fullMessage = lines.join("\n");
    const whatsappUrl = `https://wa.me/${targetWhatsApp}?text=${encodeURIComponent(fullMessage)}`;

    return { success: true, whatsappUrl };
  } catch (error) {
    console.error("Failed to submit WhatsApp inquiry:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
