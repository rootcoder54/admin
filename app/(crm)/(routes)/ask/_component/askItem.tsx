import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
interface itemProps {
  titre: string;
  observation: string | null;
  image: string | null;
  href:string
}

export const AskItem = ({  titre, observation, image,href }: itemProps) => {
  return (
    <Link href={href}>
      <Card className="lg:w-[1000px] flex items-center justify-start gap-x-4 p-2 px-6 hover:bg-blue-400/10 group hover:border-blue-300 border cursor-pointer">
        {image && <Image src={image} alt="logo" width={40} height={30} />}
        <div className="flex flex-col gap-y-3">
          <CardTitle className="text-lg group-hover:text-blue-500">{titre}</CardTitle>
          <CardDescription>{observation}</CardDescription>
        </div>
      </Card>
    </Link>
  );
};
