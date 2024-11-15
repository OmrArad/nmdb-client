import { MediaDetails } from "@/app/components/media/mediaDetails";

type Params = Promise<{ slug: string }>

export default async function MoviePage(props: {
  params: Params,
}) {
  const params = await props.params
  const id = params.slug;
  return (
    <div className="container mx-auto my-8 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <MediaDetails mediaId={id} isMovie={true} />
        {/* Here you might include additional sections such as a forum link, etc */}
      </div>
    </div>
  );
}
