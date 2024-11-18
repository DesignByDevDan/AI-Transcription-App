import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import FileUploader from "./components/FileUploader/FileUploader";
import URLInput from "./components/URLInput/URLInput";
import ResultDisplay from "./components/ResultDisplay/ResultDisplay";
import History from "./components/History/History";

const App: React.FC = () => {
  const [transcription, setTranscription] = useState<string>("");

  const handleFileUpload = async (file: File) => {
    // Mock API call for file upload
    const mockTranscription = `Transcription for ${file.name}`;
    setTranscription(mockTranscription);
  };

  const handleURLSubmit = async (url: string) => {
    // Mock API call for URL input
    const mockTranscription = `Transcription for audio from ${url}`;
    setTranscription(mockTranscription);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
        {/* Header */}
        <header className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-4 text-white text-center rounded-b-lg shadow-md">
          <h1 className="text-3xl font-bold">Transcripto</h1>
        </header>

        {/* Main Content */}
        <main className="flex-grow w-full flex flex-col items-center mt-8">
          <nav className="flex space-x-4 mb-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`
              }
            >
              Live Transcription
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`
              }
            >
              History
            </NavLink>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-center mb-4">Upload or Enter Audio URL</h2>
                  <div className="flex flex-col gap-4">
                    <FileUploader onUpload={handleFileUpload} />
                    <div className="text-center text-gray-500">OR</div>
                    <URLInput onSubmit={handleURLSubmit} />
                  </div>
                  {transcription && (
                    <div className="mt-8">
                      <ResultDisplay transcription={transcription} />
                    </div>
                  )}
                </div>
              }
            />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="w-full bg-gray-200 text-center py-4 mt-8 text-sm text-gray-500">
          &copy; 2024 Transcripto. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
