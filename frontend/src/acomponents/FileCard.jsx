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




import React from 'react';
import { X } from "lucide-react";

const FileCard = ({ file, id, deleteFile }) => {

    const fileSize =
        file.size > 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
            : `${(file.size / 1024).toFixed(1)} KB`;

    return (

        <div
        className="
        w-full
        sm:w-[260px]

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
                    <span className="text-xs bg-red-100 px-2 py-1 rounded">PDF</span>
                </div>

                <div>

                    <h3
                        title={file.name}
                        className="
                        text-sm
                        font-semibold
                        text-[#07122b]

                        max-w-[180px]
                        sm:max-w-[140px]

                        truncate
                        "
                    >
                        {file.name}
                    </h3>

                    <p className="text-xs text-[#5f6c8d]">
                        {fileSize}
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

            <p className="text-xs font-medium text-green-600">
                Ready for Analysis
            </p>

        </div>

    </div>

    );
};

export default FileCard;