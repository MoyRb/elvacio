"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

type HostPortalProps = {
  name: "Andrés" | "Iván";
  side: "left" | "right";
  href: string;
  label: string;
  description: string;
  imageSrc: string;
  animationSrc: string;
  external?: boolean;
  target?: string;
  rel?: string;
};

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return reducedMotion;
}

function usePrimaryHover() {
  const [primaryHover, setPrimaryHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePreference = () => setPrimaryHover(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return primaryHover;
}

export function HostPortal({
  name,
  side,
  href,
  label,
  description,
  imageSrc,
  animationSrc,
  external = false,
  target,
  rel,
}: HostPortalProps) {
  const [isActive, setIsActive] = useState(false);
  const [playbackKey, setPlaybackKey] = useState(0);
  const [animationFailed, setAnimationFailed] = useState(false);
  const lastPointerType = useRef<string | null>(null);
  const reducedMotion = useReducedMotion();
  const primaryHover = usePrimaryHover();
  const className = `host-portal host-portal--${side}`;
  const ariaLabel = `${name}: ${label}`;
  const canAnimate = !reducedMotion && !animationFailed;
  const showAnimation = canAnimate && isActive;

  useEffect(() => {
    if (!canAnimate || !primaryHover) {
      return;
    }

    const image = new window.Image();
    image.src = animationSrc;
  }, [animationSrc, canAnimate, primaryHover]);

  const activate = () => {
    if (!canAnimate) {
      return;
    }

    setPlaybackKey((currentKey) => currentKey + 1);
    setIsActive(true);
  };

  const deactivate = () => {
    setIsActive(false);
  };

  const content = (
    <>
      <span className="host-stage" aria-hidden="true">
        {showAnimation ? (
          <Image
            key={`${animationSrc}-${playbackKey}`}
            className="host-image host-image--animated"
            src={animationSrc}
            alt=""
            fill
            sizes="(max-width: 760px) 78vw, 24vw"
            unoptimized
            onError={() => {
              setAnimationFailed(true);
              setIsActive(false);

              if (process.env.NODE_ENV === "development") {
                console.info(`No se pudo cargar la animación oficial de ${name}: ${animationSrc}`);
              }
            }}
          />
        ) : (
          <Image
            key={imageSrc}
            className="host-image host-image--static"
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 760px) 78vw, 24vw"
            priority
          />
        )}
      </span>
      <span className="host-copy">
        <strong>{name}</strong>
        <span>{label}</span>
        <small>{description}</small>
      </span>
    </>
  );

  const interactionProps = {
    onPointerEnter: (event: PointerEvent<HTMLAnchorElement>) => {
      lastPointerType.current = event.pointerType;

      if (primaryHover && (event.pointerType === "mouse" || event.pointerType === "pen")) {
        activate();
      }
    },
    onPointerLeave: () => {
      deactivate();
    },
    onPointerDown: (event: PointerEvent<HTMLAnchorElement>) => {
      lastPointerType.current = event.pointerType;
    },
    onFocus: () => {
      if (lastPointerType.current !== "touch") {
        activate();
      }
    },
    onBlur: () => {
      deactivate();
    },
  };

  if (external) {
    return (
      <a className={className} href={href} target={target} rel={rel} aria-label={ariaLabel} {...interactionProps}>
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={href} aria-label={ariaLabel} {...interactionProps}>
      {content}
    </Link>
  );
}
