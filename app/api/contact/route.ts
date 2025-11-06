import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Contact API called');
    
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    console.log('📤 Sending contact message from:', email);

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['q.bamidele001@gmail.com'],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); 
                      color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 30px 20px; background: #f9fafb; }
            .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .info-row { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .info-row:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #4b5563; }
            .message-box { background: white; padding: 25px; border-left: 4px solid #3b82f6; 
                          margin: 20px 0; border-radius: 0 8px 8px 0; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 New Contact Message</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone contacted you through your portfolio</p>
            </div>
            
            <div class="content">
              <div class="info-box">
                <h2 style="margin-top: 0;">Contact Details</h2>
                
                <div class="info-row">
                  <span class="label">Name:</span> ${name}
                </div>
                
                <div class="info-row">
                  <span class="label">Email:</span> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                </div>
                
                <div class="info-row">
                  <span class="label">Subject:</span> ${subject}
                </div>
              </div>

              <div class="message-box">
                <h3 style="margin-top: 0;">Message</h3>
                <p style="color: #374151; white-space: pre-wrap;">${message}</p>
              </div>

              <div class="footer">
                <p><strong>Reply directly to:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                <p style="color: #9ca3af; font-size: 12px;">
                  Sent from your Portfolio Contact Form
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Resend API error:', error);
      throw new Error(error.message || 'Failed to send email');
    }

    console.log('✅ Email sent successfully! ID:', data?.id);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully!',
      emailId: data?.id
    });

  } catch (error: any) {
    console.error('❌ Error sending email:', error);

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}