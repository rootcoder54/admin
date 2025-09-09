"use client";
import { AskItem } from "@/app/(crm)/(routes)/ask/_component/askItem";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/fetcher";
import { Question } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { TbHelpSquareRoundedFilled } from "react-icons/tb";

const PageQuestion = () => {
  const { data: questions } = useQuery<Question[]>({
    queryKey: ["questions"],
    queryFn: () => fetcher(`/api/question/list`)
  });

  return (
    <div className="flex flex-col justify-center items-start gap-y-3 py-4 space-y-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1">
              <Link
                href={"/support"}
                className="text-zinc-700 font-bold flex gap-x-2 items-center text-base"
              >
                <TbHelpSquareRoundedFilled className="h-8 w-8 text-blue-500" />{" "}
                <span>Support</span>
              </Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1 text-base">
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
      {questions ? (
        <>
          <div className="flex flex-col justify-center items-center gap-y-3 py-4">
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
        </>
      ) : (
        <SkeletonDemo />
      )}
    </div>
  );
};

export default PageQuestion;

function SkeletonDemo({ rows = 5 }) {
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
