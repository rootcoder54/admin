"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";

const videos = [
  {
    nom: "Creation d'un employé dans le logiciel RHPaie",
    video: "/astuce/Ajouter un employé.mp4"
  },
  {
    nom: "Ajouter une prime à un employé dans le logiciel RHPaie",
    video: "/astuce/Ajouter une prime à un employé.mp4"
  },
  {
    nom: "Ajouter un compte bancaire à employé dans le logiciel RHPaie",
    video: "/astuce/Ajouter un compte bancaire chez un employé.mp4"
  },
  {
    nom: "Calcul individuel de la paie dans le logiciel RHPaie",
    video: "/astuce/Calcul individuel de la paie.mp4"
  },
  {
    nom: "Opération à faire sur un nouveau mois dans le logiciel RHPaie",
    video: "/astuce/Operation à faire sur un nouveau Mois.mp4"
  },
  {
    nom: "Recherche et modification d'un employé dans le logiciel RHPaie",
    video: "/astuce/Recherche et modification d'un employé.mp4"
  }
];

const AstucePage = () => {
  return (
    <div className="container px-9">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center gap-y-7">
          <div className="flex items-center w-full  py-1">
            <span className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold">Astuce Video</span>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            <CardVideo link="/support" />
            <CardVideo link="/support" />
            <CardVideo link="/support" />
            <CardVideo link="/support" />
            <CardVideo link="/support" />
            <CardVideo link="/support" />
            <CardVideo link="/support" />
            <CardVideo link="/support" />
            <CardVideo link="/support" />
            <CardVideo link="/support" />
            <CardVideo link="/support" />
            <CardVideo link="/support" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstucePage;

const CardVideo = ({ link }: { link: string }) => {
  return (
    <Link href={link}>
      <Card className="group hover:shadow-sm border transition overflow-hidden rounded-lg h-full flex flex-col bg-white">
        <div className="flex-1">
          <div className="relative w-full aspect-video rounded-t-md overflow-hidden border-b">
            <img
              src={"/bgTache/bg1.jpg"}
              alt="bg"
              className="duration-700 ease-in-out  blur-0 grayscale-0 object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col pt-2 px-3">
            <div className="text-sm md:text-base font-medium group-hover:text-sky-700 transition line-clamp-1">
              Build a Google Docs Clone
            </div>
            <div className="my-3 flex items-center gap-x-2 text-xs">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Reiciendis vel at aperiam maiores .
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
