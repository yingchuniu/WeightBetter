import React, { useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

function Editor() {
  const [content, setContent] = useState("");

  function handleEditorChange(event, editor) {
    const data = editor.getData();
    setContent(data);
  }

  return (
    <CKEditor editor={ClassicEditor} onChange={handleEditorChange} />
  );
}

export default Editor;
