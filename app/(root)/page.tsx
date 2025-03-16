import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;
  const params = { search: query || null  };
  const session = await auth();
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params }) as unknown as { data: StartupCardType[] }
  console.log(posts)
  return (
    <>
      <section className="pink_container">
        <h3 className="heading">
          Ptch your startup, <br />
          Connect with Enterpreneurs
        </h3>
        <p className="sub-heading !max-w-3xl">
          Submit ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for ${query}` : 'All startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : <p>No products found!</p> }
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
