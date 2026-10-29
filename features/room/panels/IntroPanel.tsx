import Image from "next/image";
import type { Profile } from "@/domain/content/types";
import type { Dictionary } from "@/i18n/get-dictionary";

// In 3D the photo stands on the desk and the copy sits straight on the room;
// in 2D the photo sits beside the copy.
export default function IntroPanel({
  profile,
  dict,
  scrollHint,
}: Readonly<{
  profile: Profile;
  dict: Dictionary["intro"];
  scrollHint: string;
}>) {
  return (
    <div className="grid gap-10 md:group-data-[immersive=false]:min-h-[calc(100svh-12rem)] md:group-data-[immersive=false]:grid-cols-[1fr_minmax(0,380px)] md:group-data-[immersive=false]:items-center">
      <div className="flex flex-col gap-5">
        <h1 className="text-[clamp(3.25rem,9vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.035em]">
          {profile.name}
        </h1>
        <p className="text-xl sm:text-2xl leading-snug max-w-[26ch]">{profile.headline}</p>
        <p className="text-fog max-w-[48ch]">{profile.summary}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="#experience"
            className="group/cta inline-flex items-center gap-3 rounded-md bg-ink py-1.5 pl-5 pr-1.5 font-semibold text-night transition-colors hover:bg-white"
          >
            {dict.ctaExperience}
            <span
              aria-hidden
              className="grid size-9 place-items-center rounded-[5px] bg-sodium transition-transform group-hover/cta:translate-x-0.5"
            >
              <i className="ri-arrow-right-line text-lg" />
            </span>
          </a>
          <a
            href="#about"
            className="inline-flex items-center rounded-md border border-line bg-night/40 px-5 py-3 backdrop-blur transition-colors hover:border-fog"
          >
            {dict.ctaAbout}
          </a>
        </div>
        <p className="hidden items-center gap-2 pt-4 text-sm text-fog group-data-[immersive=true]:md:flex">
          <i aria-hidden className="ri-mouse-line text-lg motion-safe:animate-bounce" />
          {scrollHint}
        </p>
      </div>
      <div className="relative hidden aspect-[3/4] w-full max-w-[380px] overflow-hidden rounded-sm group-data-[immersive=false]:block">
        <Image
          src={profile.photo.src}
          alt={profile.photo.alt}
          fill
          priority
          sizes="(min-width: 768px) 380px, 100vw"
          className="object-cover object-[50%_55%]"
        />
      </div>
    </div>
  );
}
