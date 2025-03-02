import { v2 as cloudinary, ConfigOptions, UploadApiResponse } from 'cloudinary';

class CloudinaryHelper {
    configOptions: ConfigOptions;
    maxMB: number;
    folder: string;

    constructor() {
        this.configOptions = {
            cloud_name: 'dndtvwfvg',
            api_key: '971576641396334',
            api_secret: 'RRjLAFGqY4hxbkOz69kcysOE8eo'
        };
        this.folder = 'blogbook';
        this.maxMB = 5;
    }

    isExceededTheFileLimit(file: string): boolean {

        if(!file.length) return false;

        // Extract the base64 part of the data URI (after the comma)
        const base64Data = file.split(',')[1];

        // Calculate the size in bytes
        // Each Base64 character represents 6 bits of data (3/4 byte)
        const sizeInBytes = (base64Data.length * 3) / 4;

        // Define the size limit in bytes (10 MB = 10 * 1024 * 1024 bytes)
        const maxSizeInBytes = this.maxMB * 1024 * 1024;

        // Check if the size is within the limit
        return sizeInBytes >= maxSizeInBytes;

    }

    async add(file: string): Promise<UploadApiResponse> {

        const uploadedImage: UploadApiResponse = await cloudinary.uploader.upload(file, { folder: this.folder, invalidate: true });
        
        return uploadedImage;
    }

    async remove(id: string): Promise<void> {

        // remove image if the user doesn't upload a new image and there's an existing image on the database
        await cloudinary.uploader.destroy(id, { invalidate: true });

    }

    async update(file: string, id: string): Promise<UploadApiResponse> {

        const updatedImage: UploadApiResponse = await cloudinary.uploader.upload(
            file, 
            {
                public_id: id,
                overwrite: true,
                invalidate: true
            }
        );

        return updatedImage;
    }

    init() {
        
        cloudinary.config(this.configOptions);
        
    }

}

const cloudinaryHelper = new CloudinaryHelper;

cloudinaryHelper.init();

export default cloudinaryHelper;