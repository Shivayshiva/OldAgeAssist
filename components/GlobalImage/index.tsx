import Image, { ImageProps } from "next/image";

type GlobalImageProps = {
  src: string;
  alt?: string;

  /** Fixed size */
  width?: number;
  height?: number;

  /** Full container image */
  fill?: boolean;

  /** Optional fallback image */
  fallbackSrc?: string;

  /** Priority loading (LCP images) */
  priority?: boolean;

  /** Custom class */
  className?: string;

  /** Inline styles */
  style?: React.CSSProperties;

  /** Object fit */
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";

  /** Image quality */
  quality?: number;

  /** Sizes for responsive images */
  sizes?: string;
} & Omit<ImageProps, "src" | "alt" | "width" | "height" | "fill">;

export default function GlobalImage({
  src,
  alt = "image",
  width,
  height,
  fill = false,
  fallbackSrc = "/placeholder.svg",
  priority = false,
  className,
  style,
  objectFit = "cover",
  quality = 75,
  sizes,
  ...rest
}: GlobalImageProps) {
  return (
    <Image
      src={src || fallbackSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      quality={quality}
      sizes={sizes}
      className={className}
      style={{
        objectFit,
        ...style,
      }}
      {...rest}
    />
  );
}
