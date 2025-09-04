import { videos } from "@/data/type/videoAstuce";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { ChevronRight, HelpCircle } from "lucide-react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const video = videos.find((item) => item.id === id);

  if (!video) return <div>Vidéo introuvable</div>;

  return (
    <div className="flex flex-col items-center gap-4 px-5">
      <div className="flex items-start w-full">
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
                  href={"/support/astuce"}
                  className="text-sm text-zinc-700 font-bold flex gap-2 items-end"
                >
                  Astuce video
                </Link>
              </BreadcrumbPage>
              <ChevronRight />
              <BreadcrumbPage className="line-clamp-1">
                <span className="text-sm text-zinc-400 font-bold">
                  {video.nom}
                </span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <iframe
        src={video.video}
        title={video.nom}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full sm:w-full md:w-[700px] lg:w-[950px] xl:w-[1150px] aspect-video rounded-md shadow-md"
      ></iframe>
      <div className="flex flex-col bg-zinc-100 border shadow-md rounded-md p-6 sm:w-full md:w-[700px] lg:w-[950px] xl:w-[1150px]">
        <h2 className="text-2xl font-semibold text-zinc-700">{video.nom}</h2>
        <div dangerouslySetInnerHTML={{ __html: video.detail }} />
      </div>
    </div>
  );
};

export default Page;
