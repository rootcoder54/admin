"use client";
import { FormAi } from "./_component/form_ai";

const TestPage = () => {
  /*const askBot = async (message: string) => {
    const res = await fetch("http://localhost/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    console.log("Réponse du bot :", data.reply);
    return data;
  };

  const data = await askBot("Bonjour !");
*/
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-2 p-4">
      <span>Demander à l&apos;IA</span>
      <FormAi />
    </div>
  );
};

export default TestPage;
