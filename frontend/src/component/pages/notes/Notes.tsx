import { useEffect, useRef } from "react";
import Storage from "../../../utils/Storage";
import PocketEditor from "pocket-editor";
import "pocket-editor/style.css";

import './style.css'


let pockerInstance: PocketEditor | null = null;


const Notes = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        if (editorRef.current && !pockerInstance) {
            pockerInstance = new PocketEditor("#note-wrapper");
        }

        Storage.sync.get("notes", content => {
            if (content && pockerInstance) {
                pockerInstance.value = content as string
            }
        })

        // Listen editor
        const observer = new MutationObserver(() => Storage.sync.set("notes", pockerInstance?.value))
        if (editorRef.current) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            observer.observe(editorRef.current, { childList: true, subtree: true, characterData: true })
        }

        return () => {
            observer.disconnect();
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
