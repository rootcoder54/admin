export const handle = async (file: File | null, id: string) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("intervention", id);
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData
  });
  console.log(response.body);
  return response;
};
