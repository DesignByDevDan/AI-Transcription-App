import React, { useState } from "react";

interface FileUploaderProps {
  onUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setFileName(file.name);
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition shadow-md"
      >
        <span className="text-sm font-medium">
          {fileName || "Click to Select a File"}
        </span>
        <input
          id="file-upload"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload an audio file for transcription"
        />
      </label>
      {fileName && (
        <p className="text-sm text-gray-600">
          Selected File: <span className="font-semibold">{fileName}</span>
        </p>
      )}
    </div>
  );
};

export default FileUploader;
