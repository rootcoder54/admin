"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { fetcher } from "@/lib/fetcher";
import { Base, Client, Logiciel } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import "../../_component/style.css";

const Licence = ({ idClient }: { idClient: string }) => {
  const { data: logiciels } = useQuery<Logiciel[]>({
    queryKey: ["logicielId", idClient],
    queryFn: () => fetcher(`/api/logiciel/${idClient}`)
  });

  const { data: client } = useQuery<Client>({
    queryKey: ["clientId", idClient],
    queryFn: () => fetcher(`/api/client/${idClient}`)
  });

  const { data: bases } = useQuery<Base[]>({
    queryKey: ["baseId", idClient],
    queryFn: () => fetcher(`/api/base/${idClient}`)
  });

  const handlePrint = () => {
    window.print();
  };

  if (!logiciels || !bases || !client) {
    return (
      <div className="w-full flex items-center justify-center p-6">
        <Spinner size={"icon"} />
      </div>
    );
  }
  if (logiciels.length < 1 && bases.length < 1) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <span className="text-2xl font-extrabold">Pas de licence</span>
      </div>
    );
  }
  const mostRecentItem =
    bases.length >= 1
      ? bases.reduce((latest, item) =>
          new Date(item.updatedAt) > new Date(latest.updatedAt) ? item : latest
        )
      : null;

  return (
    <div>
      <div>
        <Button variant={"outline"} onClick={handlePrint} className="no-print">
          Imprimer
        </Button>
      </div>
      <div className="flex flex-col space-y-5 p-5 rounded-md">
        <div className="flex flex-row justify-between border-b-2 border-black">
          <h2 className="uppercase font-bold">
            NOM CLIENT : {client.nomClient}
          </h2>
          <span>
            DATE ACHAT :{" "}
            {client.dateInscription &&
              format(client.dateInscription, "dd/MM/yyyy")}
          </span>
        </div>

        <Table className="w-full mt-5">
          <TableHeader>
            <TableRow className="border-b-2 ">
              <TableHead className="border-2 text-black">LOGICIEL</TableHead>
              <TableHead className="border-2 text-black">
                VERSION INTERNE
              </TableHead>
              <TableHead className="border-2 text-black">
                MULTI/MONO SOCIETE
              </TableHead>
              <TableHead className="border-2 text-black">NB POSTES</TableHead>
              <TableHead className="border-2 text-black">NB EMPLOYES</TableHead>
              <TableHead className="border-2 text-black">
                CLIENT/SERVEUR
              </TableHead>
              <TableHead className="border-2 text-black">TYPE</TableHead>
              <TableHead className="border-2 text-black">DATE ACHAT</TableHead>
              <TableHead className="border-2 text-black">
                DOSSIER D&apos;INSTALLATION
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b-2">
            {logiciels.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium border-2">
                  {item.nom} - {item.version}
                </TableCell>
                <TableCell className="border-2">
                  {item.versionInterne}
                </TableCell>
                <TableCell>
                  {item.societe ? <span>Oui</span> : <span>Non</span>}
                </TableCell>
                <TableCell className="border-2">{item.poste}</TableCell>
                <TableCell className="border-2">{item.employe}</TableCell>
                <TableCell className="border-2">
                  {item.clientServeur ? <span>Oui</span> : <span>Non</span>}
                </TableCell>
                <TableCell className="border-2">{item.type}</TableCell>
                <TableCell className="border-2">
                  {format(item.dateAchat, "yyyy-mm-dd")}
                </TableCell>
                <TableCell className="border-2">{item.dossier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Table className="w-full mt-5">
          <TableHeader className="bg-black hover:bg-black text-white">
            <TableRow className="border-b-2 font-semibold text-black">
              <TableHead className="border-2  text-white">
                BASE DE DONNEES
              </TableHead>
              <TableHead className="border-2  text-white">SOCIETE</TableHead>
              <TableHead className="border-2  text-white">CONVENTION</TableHead>
              <TableHead className="border-2  text-white">NB POSTES</TableHead>
              <TableHead className="border-2  text-white">
                NB EMPLOYES
              </TableHead>
              <TableHead className="border-2  text-white">DATE</TableHead>
              <TableHead className="border-2  text-white">
                COMMENTAIRE
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b-2">
            {bases.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium border-2">
                  {item.chemin}
                </TableCell>
                <TableCell className="border-2">{item.societe}</TableCell>
                <TableCell>{item.convention}</TableCell>
                <TableCell className="border-2">{item.poste}</TableCell>
                <TableCell className="border-2">{item.employe}</TableCell>
                <TableCell className="border-2">
                  {format(item.date, " yyyy-mm-dd")}
                </TableCell>
                <TableCell className="border-2">{item.commentaire}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="w-full flex flex-row justify-between border-t-2 border-b-2 px-5 py-1">
          <span>DERNIER MISE A JOUR /ACHAT/EXTENSION</span>
          <span>
            DATE :{" "}
            {mostRecentItem && format(mostRecentItem.updatedAt, "dd/MM/yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Licence;
