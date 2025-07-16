"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [clientName, setClientName] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file || !clientName) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("client", clientName);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload/database", true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onloadstart = () => {
      setUploading(true);
      setProgress(0);
      setMessage("");
    };

    xhr.onloadend = () => {
      setUploading(false);
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        try {
          const res = JSON.parse(xhr.responseText);
          setMessage(res.message || "Fichier envoyé");
        } catch {
          setMessage("Erreur lors de la réponse du serveur");
        }
      }
    };

    xhr.send(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-3">
      <div className="flex flex-col items-center space-y-3">
        <h1>📤 Dépôt de Base de donnée</h1>
        <Input
          type="text"
          placeholder="Nom du client"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />

        <Input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <Button
          onClick={handleUpload}
          disabled={!file || !clientName || uploading}
        >
          {uploading ? "Envoi en cours..." : "Envoyer"}
        </Button>

        {uploading && (
          <div style={{ marginTop: 20 }}>
            <div style={{ width: "100%", height: 10, background: "#eee" }}>
              <div
                style={{
                  width: `${progress}%`,
                  height: 10,
                  background: "#0070f3",
                  transition: "width 0.3s"
                }}
              />
            </div>
            <p>{progress}%</p>
          </div>
        )}
        <p>{message}</p>
      </div>
    </div>
  );
}
