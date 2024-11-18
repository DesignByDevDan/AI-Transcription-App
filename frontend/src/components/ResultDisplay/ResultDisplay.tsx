import React from "react";

const ResultDisplay = ({ transcription }: { transcription: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription);
  };

  const downloadAsFile = () => {
    const blob = new Blob([transcription], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transcription.txt";
    link.click();
  };

  return (
    <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Transcription</h2>
      <textarea
        readOnly
        value={transcription}
        className="w-full h-40 border border-gray-300 rounded-lg p-3 mb-4"
      ></textarea>
      <div className="flex gap-4">
        <button
          onClick={copyToClipboard}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Copy to Clipboard
        </button>
        <button
          onClick={downloadAsFile}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
