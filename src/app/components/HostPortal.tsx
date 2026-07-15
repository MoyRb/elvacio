import Link from "next/link";

type HostPortalProps = {
  name: "Andrés" | "Iván";
  side: "left" | "right";
  href: string;
  label: string;
  description: string;
};

export function HostPortal({ name, side, href, label, description }: HostPortalProps) {
  return (
    <Link className={`host-portal host-portal--${side}`} href={href} aria-label={`${name}: ${label}`}>
      <span className="host-signal" aria-hidden="true">
        <span className="host-body" />
      </span>
      <span className="host-copy">
        <strong>{name}</strong>
        <span>{label}</span>
        <small>{description}</small>
      </span>
    </Link>
  );
}
