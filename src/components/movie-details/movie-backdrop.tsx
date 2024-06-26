import Image from "next/image";

const MovieBackdrop = ({
  src,
  alt,
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <Image
        src={src as string}
        alt={alt as string}
        className="w-full h-full object-cover"
        fill
        priority
      />
    </div>
  );
};

export default MovieBackdrop;
