"use client";

import { Card } from "@/components/ui/card";
import { videos } from "@/data/type/videoAstuce";
import Image from "next/image";
import { motion } from "motion/react";

import Link from "next/link";

const rendre = (texte: string) => {
  return texte.length > 60 ? texte.slice(0, 60) + "..." : texte;
};

const AstucePage = () => {
  return (
    <div className="container px-9">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center gap-y-7">
          <div className="flex items-center w-full  py-1">
            <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
              <span className="">
                {"Astuce_Video".split("").map((word, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: idx * 0.04 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </p>
          </div>
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
