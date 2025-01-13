import { SidebarTrigger } from "@/components/ui/sidebar";
import "./_component/styles.scss";
import { getQuestions } from "@/action/ask/get-questions";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

import { CreateDialog } from "./_component/create";
import Link from "next/link";
import { AskItem } from "./_component/askItem";

const Page = async () => {
  const questions = await getQuestions();
  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  Liste de Questions
                </BreadcrumbPage>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadcrumbPage className="line-clamp-1">
                  <CreateDialog />
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3"></div>
      </header>

      <div className="flex flex-col justify-center items-center gap-y-3 py-4">
        {questions.map((question, index) => (
          <AskItem
            key={index}
            titre={question.question}
            observation={question.observation}
            id={question.id}
            image={question.image}
          />
        ))}
      </div>
      {questions.length === 0 && <span>Pas de question</span>}
    </>
  );
};

export default Page;
