import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import { deleteFromCloudinary } from '@/lib/cloudinary';

// GET - Fetch all active projects
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({ isActive: true }).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      projects: projects.map(p => ({
        id: p._id.toString(),
        title: p.title,
        description: p.description,
        tech: p.tech,
        liveUrl: p.liveUrl,
        githubUrl: p.githubUrl,
        image: p.image,
      })),
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const { title, description, tech, liveUrl, githubUrl, image, imagePublicId } = body;

    // Validation
    if (!title || !description || !tech || !liveUrl || !githubUrl || !image) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    const project = await Project.create({
      title,
      description,
      tech,
      liveUrl,
      githubUrl,
      image,
      imagePublicId,
    });

    return NextResponse.json({
      success: true,
      project: {
        id: project._id.toString(),
        title: project.title,
        description: project.description,
        tech: project.tech,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        image: project.image,
      },
      message: 'Project created successfully!',
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      );
    }

    const project = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project: {
        id: project._id.toString(),
        title: project.title,
        description: project.description,
        tech: project.tech,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        image: project.image,
      },
      message: 'Project updated successfully!',
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      );
    }

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary
    if (project.imagePublicId) {
      try {
        await deleteFromCloudinary(project.imagePublicId);
      } catch (err) {
        console.error('Failed to delete image from Cloudinary:', err);
      }
    }

    // Soft delete (set isActive to false)
    await Project.findByIdAndUpdate(id, { isActive: false });

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully!',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}