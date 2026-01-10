import { useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../../constant/default_data';

const AudioVideoUpload = ({ onAudioVideoSend }: any) => {
    const fileInputRef: any = useRef(null);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            uploadAudioVideo(file);
        }
    };

    const uploadAudioVideo = async (file: any) => {
        const formData = new FormData();
        formData.append('mediaFile', file); // 'mediaFile' should match the field name in Multer config

        try {
            const response = await axios.post(API_URL + 'chat/upload-audio-video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onAudioVideoSend(response.data.fileUrl); // Send the image URL back to the chat component
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
                accept="audio/*,video/*"
            />
            <button onClick={() => fileInputRef.current.click()}>
                Upload Audio/Video
            </button>
        </div>
    );
};
export default AudioVideoUpload;
