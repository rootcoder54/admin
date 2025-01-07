import { logiciels } from "@/data/type/logiciels";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex-1">
      <div className="flex flex-col items-center justify-center h-full py-8">
        <Image src={"/icon/rhpaie.png"} alt="rhpaie" width={80} height={120} />
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 ">
          Télècharger et installer Le logiciel RHPaie et ses complements{" "}
        </h1>
        <p className="mt-4 text-gray-600">
          Retrouvez ici les différents logiciels disponibles en téléchargement.
        </p>
        <div className="flex flex-col mt-8 space-y-4">
          {logiciels.map((logiciel) => (
            <div
              key={logiciel.name}
              className="flex items-center justify-between sm:w-full md:w-[700px] lg:w-[950px] xl:w-[1150px]"
            >
              <div className="flex items-center space-x-7 border-b-2 border-zinc-300 py-4">
                <Image
                  src={logiciel.image}
                  alt={logiciel.name}
                  width={154}
                  height={45}
                />
                <div className="space-y-2">
                  <Link href={`/telechargement/${logiciel.id}`}>
                    <h2 className="text-lg font-semibold text-blue-600">
                      {logiciel.name} - (
                      <span className="text-zinc-800">
                        version {logiciel.version}
                      </span>
                      )
                    </h2>
                  </Link>
                  <p>{logiciel.description|| "Description indisponible"}</p>
                  <p className="text-sm text-gray-700">
                    Date : {logiciel.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
