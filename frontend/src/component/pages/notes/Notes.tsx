import { useEffect, useRef } from "react";
import PocketEditor from "pocket-editor";
import "pocket-editor/style.css";
import './style.css'

let pockerInstance: PocketEditor | null = null;

const Notes = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        pockerInstance?.oninput(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        })

        if (editorRef.current && !pockerInstance) {
            pockerInstance = new PocketEditor("#note-wrapper");
            pockerInstance.value = "## Notes !!!";
        }

        return () => {
            if (pockerInstance && editorRef.current) {
                pockerInstance = null;
                editorRef.current = null;
            }
        };
    }, []);

    return <div className="notes">
        <div id="note-wrapper" ref={editorRef} />
    </div>;
};

export default Notes;
