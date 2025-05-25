import { NextResponse } from 'next/server';
import { z } from 'zod';
import { publicApiAuth } from '@/utils/publicApiAuth';
import nodemailer from "nodemailer";
import { database } from '@/utils/appwrite';

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(10, 'Subject must be at least 20 characters'),
  message: z.string().min(50, 'Message must be at least 80 characters'),
  token : z.string(),
});

async function postHandler(req: Request) {

  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${validatedData.token}`;

    const recaptchaRes = await fetch(verifyURL, { method: 'POST' });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || recaptchaData.score < 0.1) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 403 });
    }

    await database.createDocument(
      process.env.APPWRITE_DB_ID!,
      process.env.APPWRITE_CONTACT_COLLECTION_ID!,
      'unique()',
      {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        created_at: new Date().toISOString(),
      }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "eramarinfo@gmail.com",
      to: process.env.GMAIL_USER,
      subject: `Contact Form Submission from ${validatedData.name}`,
      text: validatedData.message,
      html: `<p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Message:</strong><br/>${validatedData.message}</p>`,
    });

    return NextResponse.json({
      message: 'Message sent successfully',
      data: validatedData.message,
    });

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export const POST = publicApiAuth(postHandler,{
  rateLimit: true,
  requireHMAC: true, // optional — helps prevent spoofed requests
})
