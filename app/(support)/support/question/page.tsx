import { getQuestions } from "@/action/ask/get-questions";
import { AskItem } from "@/app/(crm)/(routes)/ask/_component/askItem";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { ArrowRightLeft, ChevronRight, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PageQuestion = async () => {
  const questions = await getQuestions();

  return (
    <div className="flex flex-col justify-center items-start gap-y-3 py-4 space-y-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1">
              <Link
                href={"/support"}
                className="text-sm text-zinc-700 font-bold flex gap-2 items-end"
              >
                <HelpCircle /> Support
              </Link>
            </BreadcrumbPage>
            <ChevronRight />
            <BreadcrumbPage className="line-clamp-1">
              <span className="text-sm text-zinc-400 font-bold">
                Vos questions fréquentes
              </span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Image src={"/question.png"} alt="logo" width={40} height={30} />
      <h1 className="text-2xl font-bold">Vos questions fréquentes</h1>
      <span className="text-neutral-400">
        Regroupe les thématiques qui reviennent le plus souvent dans vos
        interrogations
      </span>
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
