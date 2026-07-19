import { useState } from "react";
import api from "../api/api";

function FileUpload({ onUpload }) {

    const [file, setFile] = useState(null);

    const uploadFile = async () => {

        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            await api.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("File Uploaded Successfully");

            setFile(null);

            if (onUpload) {
                onUpload();
            }

        } catch (err) {

            console.log(err);

            alert("Upload Failed");

        }

    };

    return (

        <div
            style={{
                marginTop: "20px",
                marginBottom: "20px"
            }}
        >

            <input
                type="file"
                accept=".txt,.md"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button
                onClick={uploadFile}
                style={{
                    marginLeft: "10px"
                }}
            >
                Upload
            </button>

        </div>

    );

}

export default FileUpload;