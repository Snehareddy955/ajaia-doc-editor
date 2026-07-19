import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const buttonStyle = {
    padding: "10px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "",
  });

  useEffect(() => {
    if (editor) {
      loadDocument();
    }
  }, [editor]);

  const loadDocument = async () => {
    try {
      const res = await api.get(`/documents/${id}`);

      setTitle(res.data.title);

      editor.commands.setContent(res.data.content || "");
    } catch (err) {
      console.log(err);
    }
  };

  const saveDocument = async () => {
    try {
      await api.put(`/documents/${id}`, {
        title,
        content: editor.getHTML(),
      });

      alert("Document Saved Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  if (!editor) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >

      <button
        onClick={() => navigate("/dashboard")}
        style={buttonStyle}
      >
        ← Back
      </button>

      <br />
      <br />

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Document Title"
        style={{
          width: "100%",
          fontSize: "28px",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <div
        style={{
          display:"flex",
          gap:"10px",
          marginBottom:"20px",
          flexWrap:"wrap",
        }}
      >

        <button
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          style={buttonStyle}
        >
          Bold
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          style={buttonStyle}
        >
          Italic
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          style={buttonStyle}
        >
          Underline
        </button>


        <button
          onClick={() =>
            editor.chain()
            .focus()
            .toggleHeading({level:1})
            .run()
          }
          style={buttonStyle}
        >
          H1
        </button>


        <button
          onClick={() =>
            editor.chain()
            .focus()
            .toggleHeading({level:2})
            .run()
          }
          style={buttonStyle}
        >
          H2
        </button>


        <button
          onClick={() =>
            editor.chain()
            .focus()
            .toggleBulletList()
            .run()
          }
          style={buttonStyle}
        >
          Bullet List
        </button>


        <button
          onClick={() =>
            editor.chain()
            .focus()
            .toggleOrderedList()
            .run()
          }
          style={buttonStyle}
        >
          Number List
        </button>

      </div>


      <div
        style={{
          background:"white",
          borderRadius:"10px",
          padding:"20px",
          border:"1px solid #ddd",
          minHeight:"500px",
        }}
      >
        <EditorContent editor={editor}/>
      </div>


      <br/>


      <button
        onClick={saveDocument}
        style={buttonStyle}
      >
        Save
      </button>


    </div>
  );
}

export default Editor;