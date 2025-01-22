"use client";
import { deplaceList } from "@/action/tache/deplace-list";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const FormDeplace = ({
  boardId,
  listId,
  titre
}: {
  boardId: string;
  listId: string;
  titre: string;
}) => {
  const router = useRouter();
  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const boardId = formData.get("boardId") as string;
    const listId = formData.get("listId") as string;
    const list = await deplaceList(listId, boardId);

    console.log(list);
    toast.success(`Liste transférée avec succès`);
    router.push(`/tache/${boardId}`);
  };
  return (
    <form id={boardId} onSubmit={onsubmit}>
      <input hidden name="boardId" id="boardId" value={boardId} readOnly />
      <input hidden name="listId" id="listId" value={listId} readOnly />
      <Button className="w-full" variant={"ghost"} type="submit">
        <span>{titre}</span>
      </Button>
    </form>
  );
};
