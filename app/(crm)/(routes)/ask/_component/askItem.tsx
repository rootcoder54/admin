import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
interface itemProps {
  id: string;
  titre: string;
  observation: string | null;
  image: string | null;
}

export const AskItem = ({ id, titre, observation, image }: itemProps) => {
  return (
    <Link href={`/ask/${id}`}>
      <Card className="lg:w-[1000px] flex items-center justify-start gap-x-4 p-6 hover:border-blue-500 cursor-pointer">
        {image && <Image src={image} alt="logo" width={40} height={30} />}
        <div className="flex flex-col gap-y-3">
          <CardTitle className="text-lg">{titre}</CardTitle>
          <CardDescription>{observation}</CardDescription>
        </div>
      </Card>
    </Link>
  );
};
