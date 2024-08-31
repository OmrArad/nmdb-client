import { getActorDetails } from "@/app/api/actor/actorServices";
import ActorDetails from "@/app/components/actors/actorDetails";
// import ActorDetails from "@/app/components/actors/actorDetails2";

export default async function ActorPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const actor = await getActorDetails(id);

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ActorDetails actor={actor} />
        {/* Here you might include additional sections such as a forum link, etc */}
      </div>
    </div>
  );
}
