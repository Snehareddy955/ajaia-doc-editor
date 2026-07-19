import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

import FileUpload from "../components/FileUpload";
import ShareModal from "../components/ShareModal";

function Dashboard() {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [documents, setDocuments] = useState([]);
    const [sharedDocs, setSharedDocs] = useState([]);
    const [shareDocId, setShareDocId] = useState(null);

    useEffect(() => {
        loadDocuments();
        loadSharedDocuments();
    }, []);

    const loadDocuments = async () => {
        const res = await api.get("/documents");
        setDocuments(res.data);
    };

    const loadSharedDocuments = async () => {
        const res = await api.get(`/shared/${user.id}`);
        setSharedDocs(res.data);
    };

    const createDocument = async () => {
        await api.post("/documents", {
            title: "Untitled Document",
            owner_id: user.id
        });

        loadDocuments();
    };

    const renameDocument = async (doc) => {

        const title = prompt("Rename Document", doc.title);

        if (!title) return;

        await api.put(`/documents/${doc.id}`, {
            title,
            content: doc.content
        });

        loadDocuments();

    };

    const deleteDocument = async(id)=>{

        if(!window.confirm("Delete this document?")) return;

        await api.delete(`/documents/${id}`);

        loadDocuments();

    }

    return (

<div style={{
maxWidth:"1100px",
margin:"30px auto",
padding:"20px",
fontFamily:"Arial",
background:"#f5f7fb",
minHeight:"100vh"
}}>

<h1
style={{
color:"#2563eb"
}}
>
Ajaia Docs
</h1>

<div
style={{
background:"white",
padding:"20px",
borderRadius:"10px",
boxShadow:"0 4px 10px rgba(0,0,0,.08)",
marginBottom:"20px"
}}
>

<h2>Welcome, {user.name}</h2>

<p>{user.email}</p>

<button
onClick={createDocument}
style={{
background:"#2563eb",
color:"white",
padding:"12px 22px",
border:"none",
borderRadius:"6px",
cursor:"pointer",
fontWeight:"bold"
}}
>

+ New Document

</button>

<br/><br/>

<FileUpload onUpload={loadDocuments}/>

</div>

<h2>📄 My Documents</h2>

{
documents
.filter(doc=>doc.owner_id===user.id)
.map(doc=>(

<div
key={doc.id}
style={{
background:"white",
padding:"20px",
borderRadius:"10px",
marginBottom:"20px",
boxShadow:"0 2px 8px rgba(0,0,0,.08)"
}}
>

<h3>{doc.title}</h3>

<p>
Document ID : {doc.id}
</p>

<button
onClick={()=>navigate(`/editor/${doc.id}`)}
>
Open
</button>

<button
style={{marginLeft:"10px"}}
onClick={()=>renameDocument(doc)}
>
Rename
</button>

<button
style={{
marginLeft:"10px",
background:"red",
color:"white"
}}
onClick={()=>deleteDocument(doc.id)}
>
Delete
</button>

<button
style={{
marginLeft:"10px",
background:"green",
color:"white"
}}
onClick={()=>setShareDocId(doc.id)}
>
Share
</button>

</div>

))
}

<h2>🤝 Shared With Me</h2>

{
sharedDocs.length===0?

<p>No Shared Documents</p>

:

sharedDocs.map(doc=>(

<div
key={doc.id}
style={{
background:"white",
padding:"20px",
borderRadius:"10px",
marginBottom:"20px",
boxShadow:"0 2px 8px rgba(0,0,0,.08)"
}}
>

<h3>{doc.title}</h3>

<button
onClick={()=>navigate(`/editor/${doc.id}`)}
>
Open
</button>

</div>

))
}

{
shareDocId&&(

<ShareModal

documentId={shareDocId}

onClose={()=>{
setShareDocId(null);
loadSharedDocuments();
}}

/>

)
}

</div>

    );

}

export default Dashboard;