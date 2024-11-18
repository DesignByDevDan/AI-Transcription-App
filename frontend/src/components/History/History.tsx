import React from "react";

const History: React.FC = () => {
  // Mock data: Replace with actual backend data when available
  const mockHistory = [
    { id: 1, fileName: "audio1.mp3", transcription: "This is the transcription for audio1." },
    { id: 2, fileName: "audio2.mp3", transcription: "This is the transcription for audio2." },
  ];

  // Function to handle download
  const handleDownload = (fileName: string, transcription: string) => {
    const element = document.createElement("a");
    const file = new Blob([transcription], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName}-transcription.txt`;
    document.body.appendChild(element); // Required for Firefox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-[calc(100vh-4rem)]">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-blue-500 to-purple-500 py-4 rounded-md w-full">
        Transcription History
      </h1>

      {/* Content Container */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4 w-11/12 md:w-2/3 lg:w-1/2">
        {/* History List */}
        {mockHistory.length > 0 ? (
          <ul className="space-y-4">
            {mockHistory.map((entry) => (
              <li
                key={entry.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{entry.fileName}</h3>
                  <p className="text-sm text-gray-500 mt-2">{entry.transcription}</p>
                </div>
                <button
                  onClick={() => handleDownload(entry.fileName, entry.transcription)}
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No history available yet.</p>
        )}
      </div>
    </div>
  );
};

export default History;
