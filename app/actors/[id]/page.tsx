import {
  fetchMediaAppearances,
  getActorDetails,
} from "@/app/api/actor/actorServices";
import ActorDetails from "@/app/components/actors/actorDetails";

export default async function ActorPage({
  params,
}: {
  params: { id: string };
}) {
  const actor = await getActorDetails(params.id);
  const mediaAppearances = await fetchMediaAppearances(params.id);

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ActorDetails actor={actor} mediaAppearances={mediaAppearances} />
        {/* Here you might include additional sections such as a forum link, etc */}
      </div>
    </div>
  );
}
