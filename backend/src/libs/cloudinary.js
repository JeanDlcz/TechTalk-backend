import {v2 as cloudinary } from 'cloudinary'
import { config } from "dotenv";
import { API_KEY, API_SECRET, CLOUD_NAME } from '../config';
config({ path: "../src/.env" });

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
  });

export const uploadImage = async filePath =>{
    return await cloudinary.uploader.upload(filePath, {
        folder: 'posts',
        resource_type : "auto"
    })
}

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}
