import { videos } from "@/data/type/videoAstuce";

const Page = ({ params }: { params: { id: string } }) => {
  const video = videos.find((item) => item.id === params.id);

  if (!video) return <div>Logiciel introuvable</div>;

  return (
    <div className="flex flex-col items-center gap-4">
      <video controls className="" poster={video.image}>
        <source src={video.video} type="video/mp4" />
      </video>
      <div className="flex flex-col bg-zinc-100 border shadow-md rounded-md p-6 sm:w-full md:w-[700px] lg:w-[950px] xl:w-[1150px]">
        <h2 className="text-2xl font-semibold text-zinc-700">{video.nom}</h2>
        <div dangerouslySetInnerHTML={{ __html: video.detail }} />
      </div>
    </div>
  );
};

export default Page;
