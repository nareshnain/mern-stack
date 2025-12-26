import { useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../../constant/default_data';

const ImageUpload = ({ onImageSend }: any) => {
    const fileInputRef: any = useRef(null);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            uploadImage(file);
        }
    };

    const uploadImage = async (file: any) => {
        const formData = new FormData();
        formData.append('image', file); // 'image' should match the field name in Multer config

        try {
            const response = await axios.post(API_URL + 'chat/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onImageSend(response.data.imageUrl); // Send the image URL back to the chat component
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className='flex items-end'>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*"
            />
            <button onClick={() => fileInputRef.current.click()}>
                Upload Photo
            </button>
        </div>
    );
};
export default ImageUpload;
