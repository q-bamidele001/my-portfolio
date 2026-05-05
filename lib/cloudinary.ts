import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload image to Cloudinary
 * @param file - File buffer or base64 string
 * @param folder - Cloudinary folder name
 * @returns Upload result with URL and public ID
 */
export async function uploadToCloudinary(
  file: string | Buffer,
  folder: string = 'portfolio'
): Promise<{ url: string; publicId: string }> {
  try {
    const uploadResult = await cloudinary.uploader.upload(
      file as string,
      {
        folder: folder,
        resource_type: 'auto',
        transformation: [
          { width: 800, height: 600, crop: 'limit' }, // Optimize image size
          { quality: 'auto' }, // Auto quality
          { fetch_format: 'auto' }, // Auto format (WebP when supported)
        ],
      }
    );

    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

/**
 * Delete image from Cloudinary
 * @param publicId - Cloudinary public ID
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log('✅ Image deleted from Cloudinary:', publicId);
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
}

export default cloudinary;