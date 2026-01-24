import { useEffect, useState } from "react";

const PdfManager = ({ readOnly }) => {
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pdfs") || "[]");
    setPdfs(stored);
  }, []);

  const handleUpload = () => {
    if (!file) return;

    const newPdf = {
      id: Date.now(),
      name: file.name,
      url: URL.createObjectURL(file),
    };

    const updated = [...pdfs, newPdf];
    setPdfs(updated);
    localStorage.setItem("pdfs", JSON.stringify(updated));
    setFile(null);
  };

  const handleDelete = (id) => {
    const updated = pdfs.filter((p) => p.id !== id);
    setPdfs(updated);
    localStorage.setItem("pdfs", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] p-4 md:p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow border border-[#E3E8F1] p-5">
        
        {/* Upload Section */}
        {!readOnly && (
          <div className="flex flex-col md:flex-row gap-3 mb-5 items-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full md:w-auto"
            />
            <button
              onClick={handleUpload}
              className="bg-[#2E7DF5] text-white px-6 py-2 rounded-lg hover:bg-[#7AB8FF] transition"
            >
              Upload PDF
            </button>
          </div>
        )}

        {/* PDF List */}
        <div className="space-y-3">
          {pdfs.length === 0 && (
            <p className="text-[#5B6B7A]">No PDFs uploaded yet.</p>
          )}

          {pdfs.map((p) => (
            <div
              key={p.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border border-[#E3E8F1] p-4 rounded-lg"
            >
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#0B1B2B] font-medium hover:text-[#2E7DF5] transition"
              >
                {p.name}
              </a>

              {!readOnly && (
                <button
                  onClick={() => handleDelete(p.id)}
                  className="mt-3 md:mt-0 bg-[#E74C3C] text-white px-4 py-2 rounded-lg hover:bg-[#C0392B] transition"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PdfManager;
