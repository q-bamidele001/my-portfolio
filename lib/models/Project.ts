import mongoose, { Schema, models } from 'mongoose';

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    tech: {
      type: [String],
      required: [true, 'At least one technology is required'],
    },
    liveUrl: {
      type: String,
      required: [true, 'Live URL is required'],
      trim: true,
    },
    githubUrl: {
      type: String,
      required: [true, 'GitHub URL is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Project image is required'],
    },
    imagePublicId: {
      type: String, // Cloudinary public ID for deletion
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = models.Project || mongoose.model('Project', ProjectSchema);

export default Project;