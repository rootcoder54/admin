export const askBot = async (message: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  console.log("Réponse du bot :", data.reply);
  return data;
};
