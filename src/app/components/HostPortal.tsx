import Image from "next/image";
import Link from "next/link";

type HostPortalProps = {
  name: "Andrés" | "Iván";
  side: "left" | "right";
  href: string;
  label: string;
  description: string;
  imageSrc: string;
};

export function HostPortal({ name, side, href, label, description, imageSrc }: HostPortalProps) {
  return (
    <Link className={`host-portal host-portal--${side}`} href={href} aria-label={`${name}: ${label}`}>
      <span className="host-stage" aria-hidden="true">
        <Image
          className="host-image"
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 760px) 78vw, 24vw"
          priority
        />
      </span>
      <span className="host-copy">
        <strong>{name}</strong>
        <span>{label}</span>
        <small>{description}</small>
      </span>
    </Link>
  );
}
