"use client";
import { Spinner } from "@/components/spinner";
import { fetcher } from "@/lib/fetcher";
import { ClientList } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const ClientComponent = ({ clientId }: { clientId: string }) => {
  const {
    data: client,
  } = useQuery<ClientList>({
    queryKey: ["clientId"],
    queryFn: () => fetcher(`/api/client/${clientId}`)
  });

  if (!client) {
    <div className="flex justify-center items-center">
      <Spinner />
    </div>;
  }
  return <div>{client?.nomClient}</div>;
};
