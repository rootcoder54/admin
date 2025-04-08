import { Button } from "@/components/ui/button";
import { useState } from "react";
import { askBot } from "./askAi";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Spinner } from "@/components/spinner";

export const FormAi = () => {
  const [recherche, setRecherche] = useState("");
  const [reponse, setReponse] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setLoading(true);
    setReponse("");
    askBot(recherche).then((data) => {
      setLoading(false);
      setReponse(data.reply);
    });
  };
  return (
    <div className="flex flex-col gap-2 w-[650px]">
      <Textarea
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />
      <Button variant={"outline"} onClick={submit}>
        Recherche
      </Button>
      {loading ? (
        <div className="flex justify-center items-center p-5">
          <Spinner size={"lg"} />
        </div>
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ children, ...props }) {
              return (
                <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code {...props}>{children}</code>
                </pre>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    {children}
                  </table>
                </div>
              );
            }
          }}
        >
          {reponse}
        </ReactMarkdown>
      )}
    </div>
  );
};
