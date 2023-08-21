
import { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";


const TextEditor = () => {

 

  const wrapperRef = useCallback((wrapper) => {

    if (wrapper == null) return
        wrapper.innerHTML = '';
        const editor = document.createElement("div");
        wrapper.append(editor);

        let toolbarOptions = [
            [{ 'size': ['paragraph', false, 'large', 'huge'] }],  // custom dropdown
            ['link', 'image'],      
            [{ 'indent': '-1'}, { 'indent': '+1' }],   
            [{ 'align': [] }],
            ['bold', 'italic'],       
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ];

        new Quill(editor, { theme: "snow", modules: { toolbar : toolbarOptions }});


    }, []);

  return (
    <div id="container"  ref={wrapperRef}>
      
    </div>
  )
}

export default TextEditor
