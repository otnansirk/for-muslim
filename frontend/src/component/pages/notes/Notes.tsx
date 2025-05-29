import { useEffect, useRef } from "react";
import { NotesType } from "../../../types/Storage";
import Storage from "../../../utils/Storage";
import PocketEditor from "pocket-editor";
import "pocket-editor/style.css";

import './style.css'


let pockerInstance: PocketEditor | null = null;


const Notes = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const notesRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        if (editorRef.current && !pockerInstance) {
            pockerInstance = new PocketEditor("#note-wrapper");
        }

        Storage.sync.get("notes", data => {
            const notes = data as NotesType
            if (notes?.content && pockerInstance) {
                pockerInstance.value = notes.content as string
            }
        })

        Storage.sync.watch("notes", data => {
            const notes = data as NotesType
            notesRef.current!.style.display = notes.enable ? 'block' : 'none'
        })

        // Listen editor
        const observer = new MutationObserver(() => Storage.sync.set("notes", { content: pockerInstance?.value }))
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

    return <div className="notes" ref={notesRef}>
        <div id="note-wrapper" ref={editorRef} />
    </div>;
};

export default Notes;
