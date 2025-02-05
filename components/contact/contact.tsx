"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { fetcher } from "@/lib/fetcher";
import { Contact } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "../spinner";
import { AddContact } from "./addContact";
import { useRouter } from "next/navigation";

export const ContactList = ({ clientId }: { clientId: string }) => {
  const router = useRouter();
  const { data,refetch } = useQuery<Contact[]>({
    queryKey: ["contactId", clientId],
    queryFn: () => fetcher(`/api/contact/${clientId}`)
  });
  if (!data) {
    return (
      <div className="w-full flex items-center justify-center p-6">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col space-y-2 p-5 border rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400">
          Contact
        </h2>
        <AddContact clientId={clientId} reload={() => refetch()} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Telephone</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.nom}</TableCell>
              <TableCell>{item.telephone}</TableCell>
              <TableCell>{item.email}</TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Pas de contact
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
