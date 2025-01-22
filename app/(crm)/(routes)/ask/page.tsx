"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import "./_component/styles.scss";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

import { CreateDialog } from "./_component/create";
import { AskItem } from "./_component/askItem";
import { useQuery } from "@tanstack/react-query";
import { Question } from "@prisma/client";
import { fetcher } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const {
    data: questions,
    error,
    isLoading
  } = useQuery<Question[]>({
    queryKey: ["questions"],
    queryFn: () => fetcher(`/api/question/list`)
  });
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
      {questions ? (
        <>
          <div className="flex flex-col justify-center items-center gap-y-3 py-4">
            {questions.map((question, index) => (
              <AskItem
                key={index}
                titre={question.question}
                observation={question.observation}
                image={question.image}
                href={`/ask/${question.id}`}
              />
            ))}
          </div>
          {questions.length === 0 && <span>Pas de question</span>}
        </>
      ) : (
        <SkeletonDemo />
      )}
    </>
  );
};

export default Page;

function SkeletonDemo({ rows = 5, columns = 4 }) {
  return (
    <div className="flex flex-col justify-center items-center gap-y-3 py-4">
      {/* Corps du tableau */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[550px]" />
        </div>
      ))}
    </div>
  );
}
