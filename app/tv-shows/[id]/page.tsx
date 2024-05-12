import { TvShowDetails } from "@/app/components/tvSeries/tvShowDetails";

export default async function TvShowPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto my-8 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <TvShowDetails tvShowId={id} />
        {/* Here you might include additional sections such as a forum link, etc */}
      </div>
    </div>
  );
}
