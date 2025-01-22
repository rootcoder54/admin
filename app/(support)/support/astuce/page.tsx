"use client";

import { Card } from "@/components/ui/card";
import { videos } from "@/data/type/videoAstuce";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { ChevronRight, HelpCircle } from "lucide-react";

const rendre = (texte: string) => {
  return texte.length > 60 ? texte.slice(0, 60) + "..." : texte;
};

const AstucePage = () => {
  return (
    <div className="container px-9">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-start gap-y-7">
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
                <span className="text-sm text-zinc-400 font-bold">Astuce video</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {videos.map((video, index) => (
              <CardVideo
                key={index}
                nom={video.nom}
                description={video.description}
                image={video.image}
                link={`/support/astuce/${video.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstucePage;

const CardVideo = ({
  link,
  nom,
  description,
  image
}: {
  link: string;
  nom: string;
  description: string;
  image?: string;
}) => {
  return (
    <Link href={link}>
      <Card className="group hover:shadow-sm border transition overflow-hidden rounded-lg h-full flex flex-col bg-white">
        <div className="flex-1">
          <div className="relative w-full aspect-video rounded-t-md overflow-hidden border-b">
            <Image
              src={image || "/bgTache/bg1.jpg"}
              alt="bg"
              width={554}
              height={554}
              className="duration-700 ease-in-out blur-0 grayscale-0 object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col pt-2 px-3">
            <div className="text-xl font-semibold group-hover:text-sky-700 transition line-clamp-1">
              {nom}
            </div>
            <div className="my-3 flex items-center gap-x-2 transition line-clamp-2">
              {rendre(description)}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
