interface MapProps {
  src: string;
  title: string;
}

export function Map({ src, title }: MapProps) {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden">
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="w-full h-full"
      />
    </div>
  );
}
