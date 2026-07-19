import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/login", {
                email,
                password
            });

            localStorage.setItem(
                "user",
                JSON.stringify(res.data)
            );

            navigate("/dashboard");

        } catch (error) {

            alert("Invalid Email or Password");

        }

    };

    return (

        <div style={styles.container}>

            <form style={styles.card} onSubmit={handleLogin}>

                <h1>Ajaia Docs</h1>

                <input
                    style={styles.input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    style={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button style={styles.button} type="submit">
                    Login
                </button>

            </form>

        </div>

    );

}

const styles = {

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f5f5"
    },

    card: {
        background: "white",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0,0,0,.1)",
        width: "350px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },

    input: {
        padding: "12px",
        fontSize: "16px"
    },

    button: {
        padding: "12px",
        fontSize: "16px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }

};

export default Login;