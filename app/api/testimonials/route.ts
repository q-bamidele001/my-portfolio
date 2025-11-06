import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Testimonial API called');
    
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const company = formData.get('company') as string;
    const project = formData.get('project') as string;
    const rating = parseInt(formData.get('rating') as string);
    const feedback = formData.get('feedback') as string;
    const image = formData.get('image') as File | null;

    if (!name || !email || !role || !company || !project || !rating || !feedback) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    console.log('📤 Sending testimonial from:', email);

    const attachments: any[] = [];

    if (image && image.size > 0 && image.size < 10 * 1024 * 1024) {
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        attachments.push({
          filename: image.name,
          content: buffer,
        });
        
        console.log('📎 Image attached:', image.name);
      } catch (attachError) {
        console.error('⚠️ Image attachment failed:', attachError);
      }
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Testimonials <onboarding@resend.dev>',
      to: ['q.bamidele001@gmail.com'],
      replyTo: email,
      subject: `New Testimonial from ${name} - ${rating} stars ⭐`,
      attachments: attachments.length > 0 ? attachments : undefined,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 30px 20px; background: #f9fafb; }
            .details-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .detail-row { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .detail-row:last-child { border-bottom: none; }
            .detail-label { font-weight: bold; color: #4b5563; display: inline-block; width: 100px; }
            .detail-value { color: #1f2937; }
            .testimonial-box { background: white; padding: 25px; border-left: 4px solid #667eea; 
                              margin: 20px 0; border-radius: 0 8px 8px 0; }
            .testimonial-text { font-style: italic; color: #374151; font-size: 16px; line-height: 1.8; margin: 0; }
            .stars { color: #fbbf24; font-size: 24px; margin: 10px 0; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
            .badge { background: #10b981; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; display: inline-block; }
            ${image ? `.image-note { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #fbbf24; }` : ''}
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 New Testimonial Received!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone left you a ${rating}-star review</p>
            </div>
            
            <div class="content">
              <div class="details-box">
                <h2 style="margin-top: 0; color: #1f2937;">Client Information</h2>
                
                <div class="detail-row">
                  <span class="detail-label">Name:</span>
                  <span class="detail-value">${name}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value">
                    <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                  </span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Role:</span>
                  <span class="detail-value">${role}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Company:</span>
                  <span class="detail-value">${company}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Project:</span>
                  <span class="detail-value">${project}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Rating:</span>
                  <span class="detail-value">
                    <span class="stars">${'⭐'.repeat(rating)}</span>
                    <span class="badge">${rating}/5</span>
                  </span>
                </div>
              </div>

              ${image ? `
              <div class="image-note">
                <strong>📸 Photo Attached:</strong> The client uploaded a photo (${image.name}). 
                You'll find it attached to this email.
              </div>
              ` : ''}

              <div class="testimonial-box">
                <h3 style="margin-top: 0; color: #1f2937;">Testimonial</h3>
                <p class="testimonial-text">"${feedback}"</p>
              </div>

              <div class="footer">
                <p><strong>Reply to:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                <p style="color: #9ca3af; font-size: 12px;">
                  Sent from your Portfolio Testimonial Form
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

    console.log('✅ Testimonial email sent successfully! ID:', data?.id);

    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial sent successfully!',
      emailId: data?.id
    });

  } catch (error: any) {
    console.error('❌ Error sending testimonial email:', error);

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send testimonial',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}