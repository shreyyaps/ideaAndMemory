
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useUser } from '../StateManagement/UserContext';



const ImagePicker = () => {
    const [images, setImages] = useState([]);
    const { setUserData, } = useUser();
     
    const handleFile = (files) => {
        const fileReaders = [];

        files.forEach((file) => {
            const reader = new FileReader();
            fileReaders.push(
                new Promise((resolve) => {
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                    reader.readAsDataURL(file);
                })
            );
        });

        Promise.all(fileReaders).then((results) => {
            setImages((prev) => [...prev, ...results]);
        });
    };



    const onDrop = useCallback(acceptedFiles => {

        if (acceptedFiles && acceptedFiles.length > 0) {
            handleFile(acceptedFiles);
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        accept: {
            'image/*': [],
        },
    })


    useEffect(()=>{
        
        setUserData((prev) => ({
            ...prev,
            memoryCard: {
                ...prev.memoryCard,
                pictures: images,
            }
        }))
       
    },[images,setUserData])
    return (
        <div >
            <div {...getRootProps()} className=" w-[50vh] h-[20vh] m-2 border-2 border-dashed border-white/40 rounded-xl flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-all duration-200"
            >
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            
                <div className=' w-[50vh] overflow-y-auto bg-white/10 text-white p-4 rounded-xl space-y-2 flex m-2'>

                    { 
                        images.length > 0?(images.map((src,idx) => (
                            <img 
                            key={idx}
                            src={src}
                            className="w-32 h-32 object-cover rounded shadow-md m-2"
                            alt={`preview-${idx}`}
                            />
                        ))):(<div className="w-32 h-32 object-cover rounded m-2"></div>)
                    }
                </div>
            

        </div>

    );
}

export default ImagePicker;