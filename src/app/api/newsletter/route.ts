import { NextResponse } from 'next/server';
import { z } from 'zod';
import { publicApiAuth } from '@/utils/publicApiAuth';
import { database } from "@/utils/appwrite";

const subscriptionSchema = z.object({
  email: z.string().email('Invalid email address'),
  token : z.string(),
});

async function postHandler(req: Request) {
  try {
    const body = await req.json();
    const validatedData = subscriptionSchema.parse(body);

    const secret = process.env.RECAPTCHA_SECRET_KEY;
   
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${validatedData.token}`;

    const recaptchaRes = await fetch(verifyURL, { method: 'POST' });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, {status: 403});
    }
    
    await database.createDocument(
      process.env.APPWRITE_DB_ID!,      
      process.env.APPWRITE_SUBSCRIBER_COLLETION_ID!, 
      'unique()',             // Document ID (let Appwrite generate it)
      {
        email: validatedData.email,
        created_at:new Date().toISOString(),
      }
    );

    return NextResponse.json({
      message: 'Successfully subscribed to newsletter',
    });

  } catch (error: unknown) {
   
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
} 


export  const POST = publicApiAuth(postHandler,{
  rateLimit: true,
  requireHMAC: true, // optional — helps prevent spoofed requests
})