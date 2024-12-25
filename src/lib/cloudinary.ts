import { v2 as cloudinary, ConfigOptions, ResourceApiResponse } from 'cloudinary';

const clodinaryConfig: ConfigOptions = {
    cloud_name: 'dndtvwfvg',
    api_key: '971576641396334',
    api_secret: 'RRjLAFGqY4hxbkOz69kcysOE8eo',
};

const MAX_FILE_MB = 10;

export const isExceededTheFileLimit = (file: string) => {

    // Extract the base64 part of the data URI (after the comma)
    const base64Data = file.split(',')[1];

    // Calculate the size in bytes
    // Each Base64 character represents 6 bits of data (3/4 byte)
    const sizeInBytes = (file.length * 3) / 4;

    // Define the size limit in bytes (10 MB = 10 * 1024 * 1024 bytes)
    const maxSizeInBytes = MAX_FILE_MB * 1024 * 1024;

    // Check if the size is within the limit
    return sizeInBytes <= maxSizeInBytes;

}

cloudinary.config(clodinaryConfig);

export default cloudinary;