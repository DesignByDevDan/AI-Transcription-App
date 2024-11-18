import React, { useState } from "react";

const URLInput = ({ onSubmit }: { onSubmit: (url: string) => void }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="url"
        placeholder="Enter audio URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Transcribe from URL
      </button>
    </form>
  );
};

export default URLInput;
