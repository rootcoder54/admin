import { BoardList } from "@/components/tache/listeTache/board-list";

const ListeTache = () => {
  return (
    <div
      className="bg-zinc-300 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1732621744357-91a8f654d2db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}
    >
      <BoardList />
    </div>
  );
};

export default ListeTache;
