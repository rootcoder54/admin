import { getQuestions } from "@/action/ask/get-questions";
import { AskItem } from "@/app/(crm)/(routes)/ask/_component/askItem";

const PageQuestion = async () => {
  const questions = await getQuestions();

  return (
    <div className="flex flex-col justify-center items-center gap-y-3 py-4 space-y-4">
      <h1 className="text-2xl font-bold">Vos questions fréquentes</h1>
      {questions.map((question, index) => (
        <AskItem
          key={index}
          titre={question.question}
          observation={question.observation}
          image={question.image}
          href={`/support/question/${question.id}`}
        />
      ))}
    </div>
  );
};

export default PageQuestion;
