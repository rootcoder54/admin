import {
  Card,
  CardDescription,
  CardTitle
} from "@/components/ui/card";
import Image from "next/image";
import { motion } from "motion/react";

const listes = [
  {
    titre: "Manuel d'utilisation de RHPaie",
    description: "Notre manuel pour vous aider à utiliser notre logiciel",
    image: "/rhpaie.png",
    lien: "https://malisystem.com/manual/RHPaie/index.html",
    blank: true
  },
  {
    titre: "Vos questions fréquentes",
    description:
      "Les thématiques qui reviennent le plus souvent dans vos interrogations",
    image: "/question.png",
    lien: "/support/question",
    blank: false
  },
  {
    titre: "Manuel d'utilisation de TimeSheet",
    description: "Notre manuel pour vous aider aavec votre pointage",
    image: "/timesheet.png",
    lien: "https://malisystem.com/manual/TMS/index.html",
    blank: true
  },
  {
    titre: "Les fiches pratiques",
    description:
      "Pleines d'informations utiles pour vous aider à utiliser votre plateforme",
    image: "/astuce.png",
    lien: "/support/astuce",
    blank: false
  },
  {
    titre: "Manuel de calcul des taxes",
    description: "Les formules de calcul des taxes ITS AMO INPS ...",
    image: "/taxe.png",
    lien: "https://malisystem.com/assets/docs/taxe.pdf",
    blank: true
  }
];

const CardItem = () => {
  return (
    <div className="flex flex-col gap-y-4">
      {listes.map((item, index) => (
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          key={index}
          href={item.lien}
          target={item.blank ? "_blank" : ""}
        >
          <Card className="lg:w-[1000px] flex items-center justify-start gap-x-4 p-6 hover:border-zinc-500 cursor-pointer">
            <Image src={item.image} alt="logo" width={40} height={30} />
            <div className="flex flex-col gap-y-3">
              <CardTitle className="text-zinc-800">{item.titre}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </div>
          </Card>
        </motion.a>
      ))}
    </div>
  );
};

export default CardItem;
