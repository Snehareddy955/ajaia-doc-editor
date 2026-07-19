import { useEffect, useState } from "react";
import api from "../api/api";

function ShareModal({ documentId, onClose }) {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const res = await api.get("/users");

            setUsers(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const shareDocument = async () => {

        if (!selectedUser) {

            alert("Please select a user");

            return;

        }

        try {

            await api.post("/share", {

                document_id: documentId,

                user_id: Number(selectedUser)

            });

            alert("Document Shared Successfully");

            onClose();

        } catch (err) {

            console.log(err);

            alert("Sharing Failed");

        }

    };

    return (

        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,.4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >

            <div
                style={{
                    background: "white",
                    padding: "30px",
                    borderRadius: "10px",
                    width: "350px"
                }}
            >

                <h2>Share Document</h2>

                <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px"
                    }}
                >

                    <option value="">Select User</option>

                    {users.map(user => (

                        <option
                            key={user.id}
                            value={user.id}
                        >
                            {user.name}
                        </option>

                    ))}

                </select>

                <button onClick={shareDocument}>
                    Share
                </button>

                <button
                    onClick={onClose}
                    style={{
                        marginLeft: "10px"
                    }}
                >
                    Cancel
                </button>

            </div>

        </div>

    );

}

export default ShareModal;