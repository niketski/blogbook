import { v2 as cloudinary, ConfigOptions, ResourceApiResponse } from 'cloudinary';

const clodinaryConfig: ConfigOptions = {
    cloud_name: 'dndtvwfvg',
    api_key: '971576641396334',
    api_secret: 'RRjLAFGqY4hxbkOz69kcysOE8eo',
};

cloudinary.config(clodinaryConfig);

export default cloudinary;