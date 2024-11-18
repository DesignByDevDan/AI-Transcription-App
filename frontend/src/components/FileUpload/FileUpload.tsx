import React, { useState } from "react";

const FileUpload: React.FC = () => {
  const [activeTab, setActiveTab] = useState("live"); // Tabs state
  const [transcription, setTranscription] = useState("");

  const handleTabChange = (tab: string) => setActiveTab(tab);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      {/* Header */}
      <div className="w-full max-w-4xl">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-4">Transcripto</h1> */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Real-Time Transcription</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-4xl mt-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-around border-b">
          <button
            onClick={() => handleTabChange("live")}
            className={`w-1/2 py-3 text-lg font-medium ${
              activeTab === "live"
                ? "border-b-4 border-purple-500 text-purple-500"
                : "text-gray-600"
            }`}
          >
            Live Transcription
          </button>
          <button
            onClick={() => handleTabChange("history")}
            className={`w-1/2 py-3 text-lg font-medium ${
              activeTab === "history"
                ? "border-b-4 border-purple-500 text-purple-500"
                : "text-gray-600"
            }`}
          >
            History
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "live" ? (
            <div>
              {/* Live Transcription Form */}
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="meeting-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Meeting Name
                  </label>
                  <input
                    type="text"
                    id="meeting-name"
                    placeholder="Enter meeting name"
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-purple-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="speakers"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expected Number of Speakers (Optional)
                  </label>
                  <input
                    type="number"
                    id="speakers"
                    placeholder="Enter number of speakers"
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-purple-300 focus:outline-none"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                  >
                    Start Transcription
                  </button>
                  <button
                    type="button"
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                  >
                    Stop Transcription
                  </button>
                </div>
              </form>
              {/* Placeholder for Transcription Output */}
              <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                Transcription will appear here...
              </div>
            </div>
          ) : (
            <div>
              {/* History Tab */}
              <p className="text-gray-600">No history available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
