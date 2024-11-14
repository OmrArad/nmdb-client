import {
  fetchMediaAppearances,
  getActorDetails,
} from "@/app/api/actor/actorServices";
import ActorDetails from "@/app/components/actors/actorDetails";

export default async function ActorPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const actor = await getActorDetails(id);
  const mediaAppearances = await fetchMediaAppearances(id);

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ActorDetails actor={actor} mediaAppearances={mediaAppearances} />
        {/* Here you might include additional sections such as a forum link, etc */}
      </div>
    </div>
  );
}
