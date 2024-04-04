import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const getMostPopularProducts = cache(
  () => {
    // await wait(1000);
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
);
const getNewestProducts = cache(() => {
  // await wait(2000);
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}, ["/", "getNewestProducts"]);

function HomePage() {
  return (
    <main className="space-y-12">
      <ProductGridSection
        title="Most Popular"
        productFetcher={getMostPopularProducts}
      />
      <ProductGridSection title="Newest" productFetcher={getNewestProducts} />
    </main>
  );
}
export default HomePage;

type ProductGridSectionProps = {
  productFetcher: () => Promise<Product[]>;
  title: string;
};

const ProductGridSection = ({
  productFetcher,
  title,
}: ProductGridSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productFetcher={productFetcher} />
        </Suspense>
      </div>
    </div>
  );
};

// w/o this func Suspense will not work
const ProductSuspense = async ({
  productFetcher,
}: {
  productFetcher: () => Promise<Product[]>;
}) => {
  return (await productFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
};

//for testing
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// TODO remove wait function and trails
