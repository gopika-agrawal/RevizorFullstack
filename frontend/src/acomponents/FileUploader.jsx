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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const FileUploader = () => {

    const [selectedFile, setSelectedFile] = useState([]);

    const [loading, setLoading] = useState(false);

    const [subject, setSubject] = useState("");
    
    const navigate = useNavigate();

    const changeHandler = (event) => {

        const existingNames =
            selectedFile.map(
                item => item.file.name
            );

        const newFiles = Array.from(event.target.files)
            .filter(file => {

                if (
                    file.type !==
                    "application/pdf"
                ) {

                    toast.error(
                        `${file.name} is not a PDF`
                    );

                    return false;
                }

                if (
                    existingNames.includes(
                        file.name
                    )
                ) {

                    toast.warning(
                        `${file.name} already selected`
                    );

                    return false;
                }

                return true;
            })
            .map(file => ({
                id: crypto.randomUUID(),
                file
            }));

        setSelectedFile(prev => [
            ...prev,
            ...newFiles
        ]);
    };

    function deleteFile(id){
       setSelectedFile(prev => prev.filter(item => item.id !== id));
       console.log(selectedFile);
    }

    async function generateInsights(){
        console.log("Generating insights for files");
        setLoading(true);
        try{

            if(!subject.trim()){
                toast.error(
                    "Please enter subject name"
                );
                return;
            }

            const formData = new FormData();
            selectedFile.forEach((item) => {
                formData.append("files", item.file);
            });

            formData.append("subject",subject);

            if(selectedFile.length === 0){
                toast.error(
                    "Please select at least one PDF"
                );
                return;
            }
            const id = localStorage.getItem("userId");
            if (!id) {
                toast.error(
                    "Session expired. Please login again."
                );

                navigate("/login");

                return;
            }
            console.log("Sending request with userId:", id);

            const url = `http://localhost:8080/api/upload/${id}`;

            console.log(url);
            const response = await fetch(url, {
                method: "POST",
                // content: "application/json",
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem("token")}`
                },
                body: formData
            });

            if(!response.ok){
                throw new Error("Upload failed");
            }

            const data = await response.json();

            localStorage.removeItem("dashboardData");
            
            navigate("/dashboard/unit");

            const dashboardResponse = await fetch(`http://localhost:8080/api/dashboard/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!dashboardResponse.ok) {
                throw new Error(
                    "Failed to generate dashboard"
                );
            }

            const dashboardData = await dashboardResponse.json();

            localStorage.setItem("dashboardData",JSON.stringify(dashboardData));
            localStorage.setItem("subject",subject);
            toast.success("Insights generated successfully");
            console.log(data);

        }
        catch(error){
            console.error(error);

            toast.error(
                "Failed to generate insights"
            );
        }
        finally{
            setLoading(false);
        }
    }

    return (

        <div className="space-y-8">

        <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#07122b]">
                Upload Your PDFs
            </h1>

            <p className="text-[#5f6c8d] mt-4">
                Analyze previous year papers and generate exam insights.
            </p>
        </div>

        <div className="space-y-2">
            <label className="font-semibold text-[#07122b]">
                Subject Name
            </label>

            <input
                type="text"
                value={subject}
                onChange={(e) =>
                    setSubject(e.target.value)
                }
                placeholder="Enter Subject Name (e.g. DBMS)"
                className="
                    w-full
                    p-4
                    rounded-xl
                    border
                    border-[#dfeceb]
                    outline-none
                    focus:border-[#27c7b8]
                "
            />
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

            p-6
            sm:p-8
            md:p-12

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

        <p className="text-sm text-[#5f6c8d]">
            {selectedFile.length} files selected
        </p>

        <button
            onClick={generateInsights}
            disabled={selectedFile.length === 0 || loading}
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
            {loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating Insights...</span>
                    </div>
                ) : (
                    "Generate Insights"
                )}
        </button>

    </div>
    );
};

export default FileUploader;