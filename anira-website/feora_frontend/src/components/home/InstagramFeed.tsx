import { InstagramIcon } from '@/components/common/SocialIcons'
import { INSTAGRAM_POSTS } from '@/data/homeData'

export function InstagramFeed() {
  return (
    <section className="w-full bg-background-50 py-12 md:py-16 lg:py-20">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="mb-8 text-center md:mb-12">
          <p className="mb-2 font-body text-xs uppercase tracking-[0.2em] text-foreground-500 md:text-sm">
            Follow Along
          </p>
          <h2 className="mb-3 font-heading text-2xl font-semibold text-foreground-900 md:text-3xl lg:text-4xl">
            @anira.theethinicstudio
          </h2>
          <a
            href="https://instagram.com/anira.theethinicstudio"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-primary-500 transition-colors hover:text-primary-600"
          >
            <InstagramIcon className="size-5" />
            Follow us on Instagram
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-background-100 md:rounded-xl"
            >
              <img
                src={post.image}
                alt="ANIRA Instagram post"
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-primary-500/0 transition-colors group-hover:bg-primary-500/40">
                <InstagramIcon className="size-6 text-background-50 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
