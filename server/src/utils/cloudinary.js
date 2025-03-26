import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, options = {}) => {
  try {
    if (!localFilePath) return null;
    
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: options.folder || "Backend", // Default folder is "Backend"
    });

    console.log("File uploaded to Cloudinary:", response.url);

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};


export const deleteImageFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      console.error('Public ID is required for deletion.');
      return null;
    }
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('Image deleted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

export { uploadOnCloudinary };
