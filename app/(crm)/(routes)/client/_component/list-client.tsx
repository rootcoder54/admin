"use client";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./colums";
import DataTable from "./data-table";
import { fetcher } from "@/lib/fetcher";
import { ClientList } from "@/types";
import { Spinner } from "@/components/spinner";
import { Skeleton } from "@/components/ui/skeleton";

export const ListClient = () => {
  const {
    data: clientList,
    isLoading
  } = useQuery<ClientList[]>({
    queryKey: ["clients"],
    queryFn: () => fetcher(`/api/client`)
  });
  if (isLoading) {
    <div className="flex justify-center items-center">
      <Spinner />
    </div>;
  }
  if (!clientList) {
    return (
      <div className="flex justify-center items-center">
        <SkeletonDemo />
      </div>
    );
  }
  const client = clientList.map(
    ({ id, nomClient, adresse, activite, dateInscription }) => ({
      id,
      nomClient,
      adresse,
      activite,
      dateInscription
    })
  );
  
  return (
    <div className="">
      <DataTable columns={columns} data={client} />
    </div>
  );
};

function SkeletonDemo({ rows = 5, columns = 4 }) {
  return (
    <div className="space-y-2 py-4">
      {/* En-tête du tableau */}
      <div className="flex items-center space-x-2">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-8 w-[250px]" />
        ))}
      </div>

      {/* Corps du tableau */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex items-center space-x-2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-8 w-[250px]" />
          ))}
        </div>
      ))}
    </div>
  );
}
