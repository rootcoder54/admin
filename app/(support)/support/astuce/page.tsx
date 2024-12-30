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
    <div className="flex flex-col items-center gap-y-7">
      <div className="flex justify-between items-center w-full md:w-3/4 lg:w-3/5 px-3 py-1">
        <span className="text-4xl font-bold">Astuce Video</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        {videos.map((video, index) => (
          <CardVideo key={index} nom={video.nom} video={video.video} />
        ))}
      </div>
    </div>
  );
};

export default AstucePage;

const CardVideo = ({ nom, video }: { nom: string; video: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-[280px] cursor-pointer py-3">
          <CardHeader>
            <CardTitle>{nom}</CardTitle>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px] sm:max-h-[750px]">
        <DialogHeader>
          <DialogTitle>{nom}</DialogTitle>
        </DialogHeader>
        <video controls>
          <source src={video} type="video/mp4" />
        </video>
      </DialogContent>
    </Dialog>
  );
};
