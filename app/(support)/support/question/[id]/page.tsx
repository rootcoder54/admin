import { getQuestionId } from "@/action/ask/get-questionId";
import Tiptap from "@/app/(crm)/(routes)/ask/_component/Tiptap";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface QuestionIdPageProps {
  params: Promise<{ id: string }>;
}

const QuestionID = async ({ params }: QuestionIdPageProps) => {
  const { id } = await params;
  const question = await getQuestionId(id);
  return (
    <div>
      <div className="flex flex-col px-8 space-y-3">
        <Link href={"/support/question"} className="hover:underline font-bold flex">
          <ArrowLeft />
          Retour
        </Link>
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
