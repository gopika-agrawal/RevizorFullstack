// import React, { useEffect, useState } from 'react'
// import FileCard from './FileCard';

// const FileUploader = () => {

//     const [ selectedFile, setSelectedFile ] = useState([]);
//     useEffect(() => {
//             console.log(selectedFile);
//         },[selectedFile]);
    

//     const changeHandler = (event) => {
//         const newFile = Array.from(event.target.files).map(file => ({
//             id: crypto.randomUUID(),
//             file
//         }));
//         setSelectedFile((prev) => [...prev, ...newFile]);
        
//     }


//     function deleteFile(id){
//        setSelectedFile(prev => prev.filter(item => item.id !== id));
//        console.log(selectedFile);
//     }

//   return (
//     <div>
//         <div>

//             <input
//                 type='file'
//                 multiple
//                 onChange={changeHandler}
//             />

//             {
//                 selectedFile.map((item) => (
//                     <FileCard file={item.file} key={item.id} id={item.id} deleteFile={deleteFile}/>
//                 ))
//             }

//         </div>
//     </div>
//   )
// }

// export default FileUploader





import React, { useState, useEffect } from 'react';
import FileCard from './FileCard';

const FileUploader = () => {

    const [selectedFile, setSelectedFile] = useState([]);

        useEffect(() => {
            console.log(selectedFile);
        });
    

    const changeHandler = (event) => {
        const newFile = Array.from(event.target.files).map(file => ({
            id: crypto.randomUUID(),
            file
        }));
        setSelectedFile((prev) => [...prev, ...newFile]);
        
    }

    function deleteFile(id){
       setSelectedFile(prev => prev.filter(item => item.id !== id));
       console.log(selectedFile);
    }

    async function generateInsights(){
        console.log("Generating insights for files");
        try{

            const formData = new FormData();
            selectedFile.forEach((item) => {
                formData.append("files", item.file);
            });
            const id = localStorage.getItem("userId");
            console.log("Sending request with userId:", id);

            const url = `http://localhost:8080/api/upload/${id}`;

            console.log(url);
            const response = await fetch(url, {
                method: "POST",
                // content: "application/json",
                body: formData
            });
            const data = await response.json();
            
            console.log(data);

        }
        catch(error){
            console.log(error);
        }
    }

    return (

        <div className="space-y-8">

        <div>
            <h1 className="text-4xl md:text-5xl font-black text-[#07122b]">
                Upload Your PDFs
            </h1>

            <p className="text-[#5f6c8d] mt-4">
                Analyze previous year papers and generate exam insights.
            </p>
        </div>

        <label
            htmlFor="upload"
            className="
            block
            rounded-[30px]
            border-2
            border-dashed
            border-[#bce8e2]

            bg-white/70

            p-12

            text-center

            cursor-pointer

            hover:border-[#27c7b8]

            transition-all
            "
        >
            <h2 className="text-2xl font-bold text-[#07122b]">
                Upload PDFs
            </h2>

            <p className="text-[#5f6c8d] mt-3">
                Click here to upload multiple files
            </p>
        </label>

        <input
            id="upload"
            type="file"
            multiple
            accept='application/pdf'
            className="hidden"
            onChange={changeHandler}
        />

        {/* FILES */}
        <div className="flex flex-wrap gap-4">
            {selectedFile.map((item) => (
                <FileCard
                    key={item.id}
                    id={item.id}
                    file={item.file}
                    deleteFile={deleteFile}
                />
            ))}
        </div>



        <button
            onClick={generateInsights}
            disabled={selectedFile.length === 0}
            className="
            w-full

            h-14

            rounded-2xl

            bg-[#07122b]

            text-white

            font-semibold

            mt-6

            disabled:opacity-50
            disabled:cursor-not-allowed

            hover:shadow-[0_0_50px_rgba(39,199,184,0.25)]

            transition-all
            "
        >
            Generate Insights
        </button>

    </div>
    );
};

export default FileUploader;