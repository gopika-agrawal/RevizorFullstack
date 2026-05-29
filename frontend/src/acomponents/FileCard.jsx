// import React, { useEffect, useState } from 'react'
// import './FileCard.css'
// import { Cross } from 'lucide-react';

// const FileCard = ({file, id, deleteFile}) => {

//     const [ progress, setProgress ] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setProgress((prev) => {
//                 if(prev >= 100){
//                     clearInterval(interval);
//                     return 100;
//                 }
//                 return prev + 10;
//             })
//         },300);
//         return () => clearInterval(interval);
//     },[file]);

//   return (
//     <div>

//         <div>
//             <span>{file.name}</span>
//             <span>({(file.size/1024).toFixed(2)} KB)</span>
//         </div>

//         <div className='progress-container'>
//             <div id='progress-bar' style={{width: `${progress}%`}}>
//                 {progress}%
//             </div>
//         </div>

//         <div>
//             <button onClick={() => deleteFile(id)}>
//                 <Cross/>
//             </button>
//         </div>

//     </div>
//   )
// }

// export default FileCard




import React, { useEffect, useState } from 'react';
import { FileText, Upload, X } from "lucide-react";

const FileCard = ({ file, id, deleteFile }) => {

    const [progress, setProgress] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setProgress((prev) => {

                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }

                return prev + 10;

            });

        }, 300);

        return () => clearInterval(interval);

    }, [file]);

    return (

        <div
        className="
        w-[260px]

        bg-white/80
        backdrop-blur-xl

        border
        border-[#dfeceb]

        rounded-2xl

        p-4

        shadow-[0_8px_30px_rgba(0,0,0,0.05)]

        hover:shadow-[0_0_35px_rgba(39,199,184,0.18)]

        transition-all
        "
    >

        <div className="flex items-start justify-between">

            <div className="flex gap-3">

                <div
                    className="
                    w-10 h-10

                    rounded-xl

                    bg-[#e9fbf8]

                    flex items-center justify-center
                    "
                >
                    <FileText
                        size={20}
                        className="text-[#27c7b8]"
                    />
                </div>

                <div>

                    <h3
                        className="
                        text-sm
                        font-semibold
                        text-[#07122b]

                        max-w-[140px]

                        truncate
                        "
                    >
                        {file.name}
                    </h3>

                    <p className="text-xs text-[#5f6c8d]">
                        {(file.size / 1024).toFixed(1)} KB
                    </p>

                </div>

            </div>

            <button
                onClick={() => deleteFile(id)}
                className="
                text-[#5f6c8d]

                hover:text-red-500

                transition-all
                "
            >
                <X size={18} />
            </button>

        </div>

        {/* Progress */}
        <div className="mt-4">

            <div className="h-2 rounded-full bg-[#e9fbf8] overflow-hidden">

                <div
                    className="
                    h-full
                    bg-[#27c7b8]

                    transition-all
                    duration-300
                    "
                    style={{
                        width: `${progress}%`
                    }}
                />

            </div>

            <p className="text-xs mt-2 text-[#5f6c8d]">
                {
                    progress === 100 ? "Uploaded" : `Uploading... ${progress}%` 
                }
            </p>

        </div>

    </div>

    );
};

export default FileCard;