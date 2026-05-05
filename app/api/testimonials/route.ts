import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

const resend = new Resend(process.env.RESEND_API_KEY);

// ─────────────────────────────────────────────
// GET - Fetch all approved testimonials
// ─────────────────────────────────────────────
export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({
      status: 'approved',
      isActive: true,
    }).sort({ createdAt: -1 });

    const mapped = testimonials.map((t) => {
      const hasCustomDate = t.displayDate != null;
      const resolvedDate = hasCustomDate
        ? new Date(t.displayDate as Date)
        : new Date(t.createdAt);

      console.log(`[GET] id=${t._id} displayDate=${t.displayDate} resolvedDate=${resolvedDate}`);

      return {
        id: t._id.toString(),
        name: t.name,
        email: t.email,
        role: t.role,
        company: t.company,
        image: t.image,
        rating: t.rating,
        feedback: t.feedback,
        project: t.project,
        // ✅ Use UTC methods so timezone never shifts the month
        date: resolvedDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC',
        }),
        displayDate: hasCustomDate
          ? (t.displayDate as Date).toISOString().split('T')[0]
          : null,
      };
    });

    return NextResponse.json(
      { success: true, testimonials: mapped },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────
// POST - Submit new testimonial (from user form)
// ─────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    await connectDB();
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

    let imageUrl = '';
    let imagePublicId = '';

    if (image && image.size > 0 && image.size < 10 * 1024 * 1024) {
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64String = `data:${image.type};base64,${buffer.toString('base64')}`;
        const uploadResult = await uploadToCloudinary(base64String, 'portfolio/testimonials');
        imageUrl = uploadResult.url;
        imagePublicId = uploadResult.publicId;
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
      }
    }

    const testimonial = await Testimonial.create({
      name, email, role, company, project, rating, feedback,
      image: imageUrl,
      imagePublicId,
      status: 'approved',
      displayDate: null,
    });

    const attachments: any[] = [];
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      attachments.push({ filename: image.name, content: buffer });
    }

    try {
      await resend.emails.send({
        from: 'Portfolio Testimonials <onboarding@resend.dev>',
        to: ['q.bamidele001@gmail.com'],
        replyTo: email,
        subject: `New Testimonial from ${name} - ${rating} stars ⭐`,
        attachments: attachments.length > 0 ? attachments : undefined,
        html: `
          <!DOCTYPE html><html><head><meta charset="UTF-8">
          <style>
            body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
            .container{max-width:600px;margin:0 auto;padding:20px}
            .header{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:30px 20px;text-align:center;border-radius:8px 8px 0 0}
            .content{padding:30px 20px;background:#f9fafb}
            .details-box{background:#fff;padding:20px;border-radius:8px;margin:20px 0}
            .detail-row{padding:10px 0;border-bottom:1px solid #e5e7eb}
            .stars{color:#fbbf24;font-size:24px}
          </style></head><body>
          <div class="container">
            <div class="header"><h1>🎉 New Testimonial!</h1></div>
            <div class="content">
              <div class="details-box">
                <div class="detail-row"><strong>Name:</strong> ${name}</div>
                <div class="detail-row"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></div>
                <div class="detail-row"><strong>Role:</strong> ${role} at ${company}</div>
                <div class="detail-row"><strong>Project:</strong> ${project}</div>
                <div class="detail-row"><strong>Rating:</strong> <span class="stars">${'⭐'.repeat(rating)}</span></div>
              </div>
              <p style="padding:20px;background:#fff;border-left:4px solid #667eea">"${feedback}"</p>
            </div>
          </div></body></html>`,
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Testimonial submitted successfully!',
      testimonialId: testimonial._id.toString(),
    });
  } catch (error: any) {
    console.error('Error processing testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────
// PUT - Update testimonial date (admin)
// ─────────────────────────────────────────────
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, displayDate } = body;

    console.log('[PUT] Received:', { id, displayDate });

    if (!id || !displayDate) {
      return NextResponse.json(
        { success: false, error: 'id and displayDate are required' },
        { status: 400 }
      );
    }

    // ✅ THE FIX: parse "YYYY-MM-01" using explicit year/month parts
    // so the date is always treated as UTC noon — never shifts to previous month
    const [year, month] = displayDate.split('-').map(Number);
    const newDate = new Date(Date.UTC(year, month - 1, 1, 12, 0, 0));

    console.log('[PUT] Writing displayDate to DB:', newDate.toISOString());

    if (isNaN(newDate.getTime())) {
      return NextResponse.json(
        { success: false, error: `Invalid date: "${displayDate}"` },
        { status: 400 }
      );
    }

    const result = await Testimonial.updateOne(
      { _id: id },
      { $set: { displayDate: newDate } }
    );

    console.log('[PUT] updateOne result:', result);

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    // Read back to confirm
    const confirmed = await Testimonial.findById(id).select('displayDate createdAt');
    console.log('[PUT] Confirmed from DB:', confirmed?.displayDate);

    const dateSource = confirmed?.displayDate ?? confirmed?.createdAt;
    if (!dateSource) {
      return NextResponse.json(
        { success: false, error: 'Unable to determine date after update' },
        { status: 500 }
      );
    }

    // ✅ Format using UTC so the month never shifts
    const formattedDate = new Date(dateSource).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });

    console.log('[PUT] Returning formatted date:', formattedDate);

    return NextResponse.json({
      success: true,
      message: 'Date updated successfully!',
      date: formattedDate,
    });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────
// DELETE - Soft-delete testimonial
// ─────────────────────────────────────────────
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    if (testimonial.imagePublicId) {
      try {
        await deleteFromCloudinary(testimonial.imagePublicId);
      } catch (err) {
        console.error('Failed to delete image:', err);
      }
    }

    await Testimonial.updateOne({ _id: id }, { $set: { isActive: false } });

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully!' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}