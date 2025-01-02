
import { BoardList } from "@/components/tache/listeTache/board-list";

const bgs = [
  {
    id: 1,
    src: "/bgTache/bg1.jpg"
  },
  {
    id: 2,
    src: "/bgTache/bg2.jpg"
  },
  {
    id: 3,
    src: "/bgTache/bg3.jpg"
  },
  {
    id: 4,
    src: "/bgTache/bg4.jpg"
  },
  {
    id: 5,
    src: "/bgTache/bg5.jpg"
  },
  {
    id: 6,
    src: "/bgTache/bg6.jpg"
  },
  {
    id: 7,
    src: "/bgTache/bg7.jpg"
  },
  {
    id: 8,
    src: "/bgTache/bg8.jpg"
  }
];

const ListeTache = () => {
  const randomIndex = Math.floor(Math.random() * bgs.length);
  return (
    <div
      className="bg-zinc-300 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgs[randomIndex].src})` }}
    >
      <BoardList />
    </div>
  );
};

export default ListeTache;
