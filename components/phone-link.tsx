import { cn } from "@/lib/utils";
import { SITE } from "@/lib/utils";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  display?: string;
  withDot?: boolean;
};

/**
 * Renders the business phone number. CallRail's swap.js (loaded from layout)
 * will hot-swap the visible text + href if NEXT_PUBLIC_CALLRAIL_SWAP_TARGET is set.
 *
 * The `swap-phone` class is what CallRail's UI lets you target by class — you
 * point a swap at it from the dashboard.
 */
export function PhoneLink({ className, display, withDot, children, ...props }: Props) {
  const tel = process.env.NEXT_PUBLIC_DEFAULT_PHONE ?? SITE.phoneFallbackTel;
  const text = display ?? process.env.NEXT_PUBLIC_DEFAULT_PHONE_DISPLAY ?? SITE.phoneFallbackDisplay;
  return (
    <a
      href={`tel:${tel}`}
      data-callrail-swap="true"
      className={cn("swap-phone inline-flex items-center gap-2", className)}
      {...props}
    >
      {withDot ? (
        <span className="relative inline-flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-success animate-pulseDot" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
        </span>
      ) : null}
      <span>{children ?? text}</span>
    </a>
  );
}
