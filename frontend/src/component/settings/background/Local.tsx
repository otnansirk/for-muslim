
import { useRef } from "react"
import "./style.css"
import { uploadImage } from "../../../utils/LocalBackground"


const Local = () => {
    const uploadImageRef = useRef<HTMLInputElement>(null)

    return <>
        <div className='items'>
            <div className='items-title'>
                Collections
            </div>
            <div className="items-content">
                <label className="file-upload">
                    <span>Select Images</span>
                    <input type="file" multiple accept="image/*" ref={uploadImageRef} onChange={(e) => {
                        uploadImage(e.target.files)
                    }} />
                </label>
            </div>
        </div>
        <div className="thumbnails">
            <button className="thumbnail">
                <img src="https://images.unsplash.com/photo-1746311499999-f23b2fea0fb7?ixid=M3w3MjczMzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDY1MjkwOTR8&ixlib=rb-4.1.0" />
                <span className="remove-button">✕</span>
            </button>
            <button className="thumbnail">
                <img src="https://images.unsplash.com/photo-1746311499999-f23b2fea0fb7?ixid=M3w3MjczMzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDY1MjkwOTR8&ixlib=rb-4.1.0" />
                <span className="remove-button">✕</span>
            </button>
            <button className="thumbnail">
                <img src="https://images.unsplash.com/photo-1746311499999-f23b2fea0fb7?ixid=M3w3MjczMzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDY1MjkwOTR8&ixlib=rb-4.1.0" />
                <span className="remove-button">✕</span>
            </button>
        </div>
    </>
}

export default Local