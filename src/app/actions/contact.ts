"use server";

import { Resend } from "resend";
import { z } from "zod";

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

export async function submitContactForm(data: ContactFormData) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data. Please check your inputs." };
  }

  const { name, email, phone, eventType, eventDate, guestCount, message } = parsed.data;
  const contactEmail = process.env.CONTACT_EMAIL || "info@centuryconvention.com";

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
    console.log("Contact form submission (dev mode):", parsed.data);
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
      error: "Failed to send your inquiry. Please try again or contact us directly.",
    };
  }
}
