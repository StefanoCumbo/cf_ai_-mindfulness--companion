import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import "./journal.css";

export default function Journal() {
    const [entry, setEntry] = useState<string>("");
    const [response, setResponse] = useState<any>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setLoading(true);
        setEntry("");
        try {
            const res = axios.post("/reflect", {entry});
            setResponse((await res).data);
        } catch (error) {
            console.error("Error submitting journal entry:", error);
        }
        setLoading(false);
    }

    return(
        <>
            <Link to="/" className="back-button">Back</Link>
            
            <div className="journal-container">
                <h1 className="journal-title">Your Reflection</h1>

                <textarea
                    className="journal-textarea"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="Write your thoughts here..."
                />

                <button className="journal-button" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Reflecting..." : "Submit"}
                </button>

                {response && (
                    <div className="journal-response">
                        <h2>AI Reflection</h2>
                        <p> {response.prompt}</p>
                        <p> {response.insight}</p>
                        <p> {response.followUp}</p>
                    </div>
                )}
            </div>
        </>
    )
}