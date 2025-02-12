export const handle = async (file: File | null, nom: string) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    headers: {
      "file-name": nom
    }
  });

  const result = await response.json();
  console.log(result);
};
