import { Float, Html, Plane } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';

export function FloatLogo({
  position = [0, 0, 0],
  src,
  time,
  role,
  company,
  href,
}: {
  position?: Vector3;
  src: string;
  time: string;
  role: string;
  company: string;
  href: string;
}) {
  return (
    <Float floatIntensity={4} rotationIntensity={2}>
      <Html transform position={position} prepend>
        <a href={href} target="_blank">
          <div className="flex gap-2 p-2 rounded-full overflow-hidden bg-background hover:bg-secondary">
            <div className="rounded-full w-10 h-10 overflow-hidden bg-background">
              <img src={src} alt={company} />
            </div>
            <div className="mr-4 flex flex-col">
              <h2 className="text-xs text-foreground font-medium">{company}</h2>
              <p className="text-[8px] text-foreground/80">
                <span>{role}</span>
              </p>
              <p className="text-[8px] inline-flex justify-between items-center text-foreground/80 mt-auto">
                <small>{time}</small>{' '}
                <small className="relative inline-flex items-center justify-center gap-1">
                  Visit
                  <span className="flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-primary/50" />
                    <span className="relative inline-flex justify-center items-center rounded-full h-1 text-base w-1 bg-primary/70 group-hover:bg-primary/90" />
                  </span>
                </small>
              </p>
            </div>
          </div>
        </a>
      </Html>
    </Float>
  );
}
