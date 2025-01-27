import { getQuestionId } from "@/action/ask/get-questionId";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { Observation } from "../_component/Observation";
import Tiptap from "../_component/Tiptap";

interface QuestionIdPageProps {
  params: Promise<{ id: string }>;
}

const QuestionID = async ({ params }: QuestionIdPageProps) => {
  const { id } = await params;
  const question = await getQuestionId(id);
  return (
    <div>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  <Link href={"/ask"}>Liste de Questions</Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  {question?.question}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3"></div>
      </header>
      <div className="flex flex-col px-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{question?.question}</h1>
          {question?.observation !== null && (
            <Observation id={id} observation={question?.observation} />
          )}
          <h1 className="text-xl font-bold">Reponse :</h1>
          <Tiptap id={id} isAdmin content={question?.reponse} />
        </div>
      </div>
    </div>
  );
};

export default QuestionID;
