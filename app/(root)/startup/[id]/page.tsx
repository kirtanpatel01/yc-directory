import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupCardType } from '@/components/StartupCard';

// export const experimental_ppr = true;
const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { 
      slug: 'editor-picks-new' })
  ])

  // const post = await client.fetch(STARTUP_BY_ID, { id });

  const parseContent = md.render(post?.pitch || '');

  // const { select: editorPosts } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks-new' });

  if (!post) return notFound();
  return (
    <div>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className='heading'>{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>

      <section className="section_container">
        <img src={post.image ?? ''} alt="thumbnail" className='w-full h-auto' />

        <div className="space-y-10 mt-10 mx-auto max-w-4xl">
          <div className="flex-between gap-5">
            <Link href={`/users/${post?.author?._id}`} className='flex gap-2 items-center mb-3'>
              <Image src={post?.author?.image ?? ''} alt='profile' height={64} width={64} className='rounded-full drop-shadow-lg' />

              <div>
                <p className="text-20-medium">{post?.author?.name}</p>
                <p className="text-16-medium !text-black-300">@{post?.author?.username}</p>
              </div>

            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parseContent ? (
            <article
              className='prose max-w-4xl font-work-san break-all'
              dangerouslySetInnerHTML={{ __html: parseContent }} />
          ) : (
            <p className="no-result">
              No result provided!
            </p>
          )}
        </div>

        <hr className="divider" />

        {editorPosts?.length > 0 && (
          <div className='max-w-4xl mx-auto'>
            <p className="text-30-semibold">Edito Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupCardType, index: number) => (
                <StartupCard key={index} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className='view_skeleton' />}>
          <View id={id} />
        </Suspense>
      </section>
    </div>
  )
}

export default page