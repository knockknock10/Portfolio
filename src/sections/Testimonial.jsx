import { twMerge } from "tailwind-merge";
import Marquee from "../components/Marquee";
import { testimonials } from "../data/profile";

const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={twMerge(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6 border-neutral-850 bg-bg-card backdrop-blur-md transition-all duration-300 hover:border-purple-500/25 select-none shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img
          className="rounded-full bg-bg-darker border border-neutral-850 p-1.5 size-10 object-contain"
          alt={name}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-bold text-neutral-200">
            {name}
          </figcaption>
          <p className="text-[10px] font-semibold text-purple-400 mono-font">{username}</p>
        </div>
      </div>
      <blockquote className="mt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed font-medium">
        "{body}"
      </blockquote>
    </figure>
  );
};

export default function Testimonial() {
  return (
    <section id="verifications" className="w-full py-32 sm:py-40 bg-bg-primary border-b border-border-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Title */}
        <div className="mb-24 text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full border border-purple-500/10 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-wider uppercase mono-font mb-4">
            Endorsements
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
            Verifications & Peer Reviews
          </h2>
          <p className="text-base text-neutral-400 mt-4 leading-relaxed">
            Real feedback and technical validations from open source and platform assessments.
          </p>
        </div>

        {/* Scrolling Marquees */}
        <div className="relative flex flex-col items-center justify-center w-full mt-10 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:28s] py-2">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          {secondRow.length > 0 && (
            <Marquee reverse pauseOnHover className="[--duration:28s] py-2">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
          )}
          {/* Side Gradients using CSS variable fallback */}
          <div className="absolute inset-y-0 left-0 w-1/5 pointer-events-none bg-gradient-to-r from-bg-primary via-bg-primary/80 to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-1/5 pointer-events-none bg-gradient-to-l from-bg-primary via-bg-primary/80 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
