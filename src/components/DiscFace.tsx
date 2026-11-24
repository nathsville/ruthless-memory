import { useId } from "react";
import type { CSSProperties } from "react";
import type { Edition } from "../data";

export function DiscFace({
  edition,
  className = "",
  silver = false,
}: {
  edition: Edition;
  className?: string;
  silver?: boolean;
}) {
  const id = useId().replaceAll(":", "");
  return (
    <div
      className={`disc-face ${className} ${silver ? "is-silver" : ""}`}
      style={
        {
          "--disc-color": edition.color,
          "--disc-ink": edition.ink,
        } as CSSProperties
      }
    >
      <img
        className="disc-silver"
        src="/images/disc-surface.webp"
        alt=""
        width="1024"
        height="1024"
        draggable="false"
      />
      {!silver && (
        <svg className="disc-label" viewBox="0 0 500 500" aria-hidden="true">
          <defs>
            <mask id={`hole-${id}`}>
              <circle cx="250" cy="250" r="233" fill="white" />
              <circle cx="250" cy="250" r="34" fill="black" />
            </mask>
            <path
              id={`arc-${id}`}
              d="M 83,250 a 167,167 0 1,1 334,0 a 167,167 0 1,1 -334,0"
            />
          </defs>
          <g mask={`url(#hole-${id})`}>
            <circle cx="250" cy="250" r="233" fill={edition.color} />
            <circle
              cx="250"
              cy="250"
              r="217"
              fill="none"
              stroke={edition.ink}
              strokeWidth="1.5"
            />
            <text className="disc-orbit" fill={edition.ink}>
              <textPath href={`#arc-${id}`} startOffset="6%">
                INDEPENDENT MEMORIES ★ YOURS TO KEEP ★ {edition.capacity} ★
              </textPath>
            </text>
            <text
              x="250"
              y="180"
              className="disc-brand"
              textAnchor="middle"
              fill={edition.ink}
            >
              RUTHLESS
            </text>
            <text
              x="250"
              y="218"
              className="disc-format"
              textAnchor="middle"
              fill={edition.ink}
            >
              {edition.type}
            </text>
            <text
              x="250"
              y="322"
              className="disc-name"
              textAnchor="middle"
              fill={edition.ink}
            >
              {edition.name.split(" ")[0]}
            </text>
            {edition.name.includes(" ") && (
              <text
                x="250"
                y="367"
                className="disc-name"
                textAnchor="middle"
                fill={edition.ink}
              >
                {edition.name.split(" ").slice(1).join(" ")}
              </text>
            )}
            <text
              x="250"
              y="410"
              className="disc-small"
              textAnchor="middle"
              fill={edition.ink}
            >
              MAKE IT LAST. PLAY IT LOUD.
            </text>
            <circle
              cx="250"
              cy="250"
              r="49"
              fill="none"
              stroke={edition.ink}
              strokeWidth="1"
              opacity=".55"
            />
            <path
              d="M110 105h17m-8-8v17M373 383h17m-8-8v17"
              stroke={edition.ink}
              strokeWidth="3"
            />
          </g>
        </svg>
      )}
    </div>
  );
}
