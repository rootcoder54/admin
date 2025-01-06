import { getBoards } from "@/lib/get-boards";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { deplaceList } from "@/action/tache/deplace-list";
import { on } from "events";
import { FormDeplace } from "../form/form-deplace";

export const ListBoard = async ({
  item,
  listId
}: {
  item: string;
  listId: string;
}) => {
  const boards = await getBoards();

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Liste des tableaux</DialogTitle>
          <DialogDescription>
            {item} {listId}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {boards.map((board) => (
            <div key={board.id}>
              <FormDeplace listId={listId} boardId={board.id} titre={board.title} />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
