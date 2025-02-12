import { SkeletonMainImage } from '.';

type ProductImageMainProps = {
  image: string | undefined;
  onLoad: () => void;
  loaded: boolean;
};

const ProductImageMain = ({ image, onLoad, loaded }: ProductImageMainProps) => {
  //
  //UI
  return (
    <div className="relative flex h-full w-full max-w-[644px] items-center justify-center overflow-hidden rounded-[20px] bg-grayBG object-contain max-xl:max-h-[330px] dark:bg-zinc-900">
      {!loaded && <SkeletonMainImage />}
      <img
        src={image}
        alt="main product image"
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={onLoad}
      />
    </div>
  );
};

export default ProductImageMain;
