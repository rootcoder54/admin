import { getQuestionId } from "@/action/ask/get-questionId";
import Tiptap from "@/app/(crm)/(routes)/ask/_component/Tiptap";
import {  ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

interface QuestionIdPageProps {
  params: Promise<{ id: string }>;
}

const QuestionID = async ({ params }: QuestionIdPageProps) => {
  const { id } = await params;
  const question = await getQuestionId(id);
  return (
    <div>
      <div className="flex flex-col px-8 space-y-8">
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
                <Link
                  href={"/support/question"}
                  className="text-sm text-zinc-700 font-bold flex gap-2 items-end"
                >
                  Vos questions fréquentes
                </Link>
              </BreadcrumbPage>
              <ChevronRight />
              <BreadcrumbPage className="line-clamp-1">
                <span className="text-sm text-zinc-400 font-bold">
                  {question?.question}
                </span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="space-y-3 sm:w-full md:w-[700px] lg:w-[950px] xl:w-[1150px]">
          <h1 className="text-3xl font-bold">{question?.question}</h1>
          {question?.observation !== null && (
            <span>{question?.observation}</span>
          )}
          <h1 className="text-xl font-bold">Reponse :</h1>
          <Tiptap id={id} isAdmin={false} content={question?.reponse} />
        </div>
      </div>
    </div>
  );
};

export default QuestionID;
