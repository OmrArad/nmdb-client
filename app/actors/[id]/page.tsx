import {
  fetchMediaAppearances,
  getActorDetails,
} from "@/app/api/actor/actorServices";
import ActorDetails from "@/app/components/actors/actorDetails";

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ActorPage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
  console.log (slug, query)
  const id = params.slug
  const actor = await getActorDetails(id);
  const mediaAppearances = await fetchMediaAppearances(id);

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ActorDetails actor={actor} mediaAppearances={mediaAppearances} />
      </div>
    </div>
  );
}
