import mongoose, { Schema } from 'mongoose';

const TestimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
    },
    project: {
      type: String,
      required: [true, 'Project is required'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    feedback: {
      type: String,
      required: [true, 'Feedback is required'],
      trim: true,
      maxlength: 500,
    },
    image: {
      type: String,
      default: '',
    },
    imagePublicId: {
      type: String,
      default: '',
    },
    displayDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved',
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

// ✅ IMPORTANT: delete the cached model before re-registering
// This forces Mongoose to pick up the latest schema on every hot-reload
delete mongoose.models['Testimonial'];

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

export default Testimonial;