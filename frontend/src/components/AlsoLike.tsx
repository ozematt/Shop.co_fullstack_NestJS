import { useEffect, useState } from 'react';
import Product from './Product';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductItemSchema, Products } from '../lib/types';
import { getAllProducts } from '../api/queries';
import { SectionTitle } from '.';

const AlsoLike = () => {
  //
  ////DATA
  const { category } = useParams();
  //extracted id from ulr
  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get('id')) || 1;

  //products to show in this component, array with 4 elements
  const [productsToShow, setProductsToShow] = useState<ProductItemSchema[]>([]);

  // fetched products
  const { data: products } = useQuery<Products>({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  ////LOGIC
  //when products are fetched, add to state
  useEffect(() => {
    if (products) {
      const productsWithCategory = products.products
        .filter(
          (product) =>
            product.category === category && product.id !== productId,
        )
        .slice(0, 4);
      setProductsToShow(productsWithCategory);
    }
    return;
  }, [products, productId]);

  ////UI
  return (
    <section className="mt-[50px] flex w-full max-w-[1400px] flex-col items-center sm:mt-[72px]">
      <SectionTitle title="You might also like" center />
      <div className="scrollbar-hide flex h-[420px] w-full snap-x snap-mandatory gap-4 scroll-smooth max-xl:overflow-x-auto max-sm:mt-[-32px] sm:mt-[55px] sm:gap-5">
        {' '}
        {productsToShow?.map((product) => (
          <div
            key={product.id}
            className="scrollbar-hide flex-shrink-0 scale-75 snap-start overflow-hidden max-sm:mx-[-35px] sm:scale-100"
          >
            <Product {...product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlsoLike;
