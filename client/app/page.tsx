"use client";
import { Button } from "@/components/button";
import uploadFile from "@/services/imageApi";
import { ReactNode, useEffect, useRef, useState } from "react";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setIsLoading(true);
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        try {
          const response = await uploadFile(data);
          setResult(response.path);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getImage();
  }, [file]);

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans">
      <div className="md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1741006727915-d25215fdaf04?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Abstract digital background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent" />
      </div>

      <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          File Sharing Made Simple
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Securely share files with anyone, anywhere. Just upload and share the
          link.
        </p>

        <div className="space-y-4">
          <Button
            onClick={handleButtonClick}
            ariaLabel="Upload file"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload File"}
          </Button>

          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          {result && (
            <a
              href={result}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:text-blue-800 hover:underline mt-4 transition-colors"
            >
              Download Link: {result.split("/").pop()}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
