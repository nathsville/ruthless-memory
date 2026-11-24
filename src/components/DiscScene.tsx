import { lazy, Suspense } from "react";
import type { Edition } from "../data";
import { DiscFace } from "./DiscFace";

const Scene = lazy(() => import("./Disc3D"));

export default function DiscScene({
  edition,
  className = "",
  interactive = true,
}: {
  edition: Edition;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <Suspense
      fallback={
        <div className={`disc-3d ${className}`}>
          <div className="disc-fallback">
            <DiscFace edition={edition} />
          </div>
        </div>
      }
    >
      <Scene
        edition={edition}
        className={className}
        interactive={interactive}
      />
    </Suspense>
  );
}
