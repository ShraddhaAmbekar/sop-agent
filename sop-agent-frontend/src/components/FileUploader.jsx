import React, { useState } from "react";

export default function FileUploader() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {

    if (!file) {
      alert("Select a PDF first");
      return;
    }
    alert(`Selected file: ${file.name}`);
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload SOP</button>

    </div>
  );
}
