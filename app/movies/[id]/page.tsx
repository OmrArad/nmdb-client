import { MediaDetails } from "@/app/components/media/mediaDetails";

export default async function MoviePage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto my-8 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <MediaDetails mediaId={id} isMovie={true} />
        {/* Here you might include additional sections such as a forum link, etc */}
      </div>
    </div>
  );
}
