import { MediaDetails } from "@/app/components/media/mediaDetails";

export default async function TvShowPage(props: {
  params: Promise<{ id: string }>,
}) {
  const id = (await props.params).id;
  return (
    <div className="container mx-auto my-8 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <MediaDetails mediaId={id} isMovie={false} />
        {/* Here you might include additional sections such as a forum link, etc */}
      </div>
    </div>
  );
}
