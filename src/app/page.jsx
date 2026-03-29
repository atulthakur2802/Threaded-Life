"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/formatters';
import useCartStore from '@/store/useCartStore';
import toast from 'react-hot-toast';
import NewsletterSignup from '@/components/NewsletterSignup';

const sunnyTheGiraffe = {
  _id: 'featured-sunny-giraffe',
  name: 'Sunny the Giraffe',
  price: 1299,
  description: 'Perfect companion for little dreamers.',
  category: 'Soft Toys & Amigurumi',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT5BKWQ82_gdbo8ZLGshTc85kQTCHc06lNNlF-TDbsbNF86JHd8uZFYypXYn5D6Uovts2I0rfnFh1kJW8jSnms7wsYb_J8Worx79cB8N5TgdxRimY-LPNK29h3PjOuqYRGmjC3pBixYq04x9L3CU0JdMbxPe9hFknaJbshTXsa70lFcl40oTcmhLW8VctdEIbzHXy7V9yVwef4a6wI0IO3Pg0dfdqp7ADT7HGq-DESZeu9TNlMlMunK9pOaV0UchCyOGNDOX1t3KdE',
  rating: 4.8,
};

export default function Home() {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to your basket`);
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">
        <section className="relative mx-auto max-w-7xl overflow-hidden px-6 py-12 md:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="order-2 z-10 lg:order-1">
              <span className="mb-4 block text-xl font-serif italic text-primary">Handmade with love</span>
              <h1 className="mb-8 font-serif text-5xl font-bold leading-tight tracking-tight text-on-surface md:text-7xl">
                The Art of <br /> <span className="italic text-primary">Threaded</span> Living.
              </h1>
              <p className="mb-10 max-w-md text-lg leading-relaxed text-on-surface-variant">
                Discover artisanal crochet pieces designed to bring warmth, texture, and a touch of Indian heritage to your modern life.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/shop" className="rounded-xl bg-primary px-10 py-4 font-semibold text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95">
                  Shop Now
                </Link>
                <Link href="/about" className="group flex items-center gap-2 font-bold text-primary">
                  Our Story
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="relative order-1 h-[400px] lg:order-2 md:h-[600px]">
              <div className="absolute inset-0 -z-10 translate-x-4 rotate-3 rounded-[3rem] bg-surface-container-high"></div>
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-CA3992NV461miu0hsk42sf1xviMgbwA-OmG1Phq_8vhdUZl9qfyS4nGHoiHXJgX22dKPy1H397aX0RBgT21W05gm7V6tDRJMD3mPXHCz54CVGI3UMHahrjfnPCIM5kR4u2keff8lWOC9ncnOlXnFza5VPmbLuOw6Dfh912oBFnkbuhf9SFvryPJuVID0pLlossU3Zpb9S7kHBhyKXo-vh9LmghJoh_TOdDu2leF2C57Udj3szaslxBtHnMAheQmw9e4svj7VoffN"
                alt="Crochet setup"
                fill
                className="rounded-[3rem] object-cover shadow-2xl"
                unoptimized
              />
              <div className="absolute -bottom-6 -left-6 flex items-center gap-4 rounded-2xl border border-white/50 bg-white/90 px-6 py-4 shadow-xl backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Best Seller</p>
                  <p className="font-serif text-on-surface">Mini Bunny Amigurumi</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-surface-container-low px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="mb-4 font-serif text-4xl font-bold text-on-surface">Our Favorites</h2>
                <p className="max-w-sm text-on-surface-variant">Curated treasures from our loom to your home. Each stitch tells a story.</p>
              </div>
              <Link href="/shop" className="border-b-2 border-primary pb-1 font-bold text-primary transition-colors hover:text-primary-dim">
                View All Collection
              </Link>
            </div>

            <div className="grid h-auto grid-cols-1 gap-6 md:h-[700px] md:grid-cols-4 md:grid-rows-2">
              <Link href="/shop" className="group relative block overflow-hidden rounded-3xl bg-surface md:col-span-2 md:row-span-2">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuMzrB4D3blRcmYrTgl5DkPgdNC1sSQb58XjQRcP0lDBPlM-W_YlI9vehNG59k3np6_ohbxjDE9pF4SqjkJYz-UbXYhZro7FZp5OACbdOZBPf416em7DtsO5062BwMaHOfeKZMkOYPGBarE4Jq4VxavG4P-nGj6cgzvsBXP4twJDvl0NYwJxUBz9vUSrwkIlClt5d_ctfbNUl5nZ7Ua5X-UVT_bfbzO3amGQKX5f1DlbyV2FJ2CPM_IsU--El1eZ_3THfpZKQb68j_"
                  alt="Artisanal bag"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-8 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <h3 className="mb-2 font-serif text-2xl">The Earthy Tote</h3>
                  <p className="mb-4 text-white/80">Hand-woven cotton fibers, durable and elegant.</p>
                  <span className="text-xl font-bold">{formatPrice(2499)}</span>
                </div>
                <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-primary shadow-sm">New Arrival</div>
              </Link>

              <div className="group flex flex-row items-center justify-between overflow-hidden rounded-3xl bg-surface-container-highest p-8 md:col-span-2 md:row-span-1">
                <div className="z-10 max-w-[50%]">
                  <h3 className="mb-2 font-serif text-2xl text-on-surface">Sunny the Giraffe</h3>
                  <p className="mb-4 text-sm text-on-surface-variant">Perfect companion for little dreamers.</p>
                  <p className="mb-4 text-xl font-bold text-primary">{formatPrice(1299)}</p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(sunnyTheGiraffe)}
                      className="rounded-full bg-primary p-2 text-on-primary shadow-md transition-transform hover:scale-110 active:scale-95"
                      aria-label={`Add ${sunnyTheGiraffe.name} to basket`}
                    >
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                    <Link
                      href="/shop"
                      className="text-sm font-semibold text-primary underline underline-offset-2 hover:opacity-75 transition-opacity"
                      aria-label="View Sunny the Giraffe product page"
                    >
                      View product
                    </Link>
                  </div>
                </div>
                <div className="relative h-full min-h-[150px] w-1/2">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT5BKWQ82_gdbo8ZLGshTc85kQTCHc06lNNlF-TDbsbNF86JHd8uZFYypXYn5D6Uovts2I0rfnFh1kJW8jSnms7wsYb_J8Worx79cB8N5TgdxRimY-LPNK29h3PjOuqYRGmjC3pBixYq04x9L3CU0JdMbxPe9hFknaJbshTXsa70lFcl40oTcmhLW8VctdEIbzHXy7V9yVwef4a6wI0IO3Pg0dfdqp7ADT7HGq-DESZeu9TNlMlMunK9pOaV0UchCyOGNDOX1t3KdE"
                    alt="Giraffe amigurumi"
                    fill
                    className="object-contain transition-transform group-hover:scale-105"
                    unoptimized
                  />
                </div>
              </div>

              <div className="group flex flex-col items-center justify-center rounded-3xl bg-primary-container/30 p-6 text-center md:col-span-1 md:row-span-1">
                <div className="relative mb-4 h-24 w-24">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFHwQhvtgbbh4QiJVecvAPtBvexZTzRilsj8_lF0KV5mI2QxNPW93B_w_bHJKnEfaO57eBtwp40D-_d3t52no6Alv8PUT49thLWSJDp-jIoYs41BN470oJ9GrolHMl910uxInSRau2MH46W3bp8GA4HWnNl0Op-xaz5vyBjzXCgzBdyu7DvGoooKrvEasUpdjQb-BImkdpryaM0B20BgZtixi-5kUpdU-mNOgBOjXQqRzYOV6QGufRyJtwVOhrYONdvoq-KBMfhKaT"
                    alt="Crochet bear"
                    fill
                    className="rounded-full object-cover shadow-lg transition-transform group-hover:rotate-12"
                    unoptimized
                  />
                </div>
                <h4 className="font-serif text-lg font-bold">Coco Bear</h4>
                <p className="font-bold text-primary">{formatPrice(899)}</p>
              </div>

              <div className="group flex flex-col items-center justify-center rounded-3xl border border-white/20 bg-tertiary-container p-6 text-center md:col-span-1 md:row-span-1">
                <div className="relative mb-4 h-24 w-24">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbDTo0n6t-o96OsawkwSwSreEovBs_SpLWOExoNgYmdlx5O43pBsTidk4ry6YFB3GAh-gS8PJCtC4biFCQT-ynsQfpr2JrTBW9DsPVxuCndHfTpXeBajHf0jmR-RwvkOw0dBPYZfrrN69xUSxQNnj2_sWO8VAN1EVwEYLiTu2C85SCMIpsdeCh_bWKZG9HNHcJoSkA_O5LPDticsfZ8X8YqUlqKSjMFXD2xV9nQV3xCqy9ehoVGc-pUeuTJbqGgj-2WIgNIe3dELv1"
                    alt="Crochet flower"
                    fill
                    className="rounded-full object-cover shadow-lg transition-transform group-hover:-rotate-12"
                    unoptimized
                  />
                </div>
                <h4 className="font-serif text-lg font-bold">Loom Blooms</h4>
                <p className="font-bold text-tertiary">{formatPrice(499)}</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-7xl overflow-hidden px-6 py-24"
        >
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="relative w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-64 w-full -rotate-2">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFy02N6a8e_MUwSqpFG5OBuMWJof4l-3FhSV_NJ5-2nA7yhsDe1bsAjcswOmSLip64RkrTOdeKjvJ_FH8ruvRJCLksh3-1eiQ0WfceAJPrtqE5OqgRXVr8ZKXLBchFUI5EyXoj2UscR_Scwv6FEHsjPpPW9Aip6XtWop__feTHfvlluMNXHeMNxTP7hZGh2_cXZhvTYqWMRRTdvBS-q5SK10MkMUPo8qmTHTgcuEmduW0Cho8ozHzuCBLXaIUzfv1XrVG1CckjIB1C" alt="Hands crafting" fill className="rounded-2xl object-cover shadow-md" unoptimized />
                </div>
                <div className="relative h-80 w-full translate-y-12 rotate-3">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9jS3CBqkp02Y6f55LOhcpBlaBy-rPbDxHnHbj7pLajDpPA1yNe6QuQyaNQ7c9ut5KFBY0kTK_GCxGyeU0QiGT4nRMfDyOkR1nHR_87pkmsrYOii8dNBrS7eRYiK_Lv_g_DKd8mw-TT8GfOx3sT7P1rVlvvhFRKBkLebiFmT5gGSlqKNZwslkvVAVXFv9FtnKXJw292j6dkgyaIiXkazam219bcVLWAcfaaWt__cX56W3SXM-_l0ZEkjlHLUNJEbqxv_CeQ4GxVdVI" alt="Studio vibe" fill className="rounded-2xl object-cover shadow-xl" unoptimized />
                </div>
              </div>
            </div>

            <div className="mt-12 w-full lg:mt-0 lg:w-1/2 lg:pl-12">
              <h6 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Our Heritage</h6>
              <h2 className="mb-8 font-serif text-4xl font-bold leading-tight text-on-surface md:text-5xl">
                The Story of Every <span className="italic underline decoration-primary-container decoration-8 underline-offset-4">Single Loop</span>.
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-on-surface-variant">
                <p>Threaded Life began as a quiet conversation between a grandmother&apos;s nimble fingers and a granddaughter&apos;s modern vision. We believe that in a world of fast-fashion and factory lines, something truly special happens when you slow down.</p>
                <p>Our studio in the heart of India is a sanctuary where traditional techniques meet contemporary aesthetics. Every piece you hold has spent hours in our hands before it finds a home in yours.</p>
              </div>

              <div className="mt-10 flex items-center gap-4 rounded-2xl border-l-4 border-primary bg-surface-container p-6">
                <span className="material-symbols-outlined text-4xl text-primary">psychology_alt</span>
                <p className="font-serif italic text-on-primary-container">&quot;We don&apos;t just sell crochet; we sell a legacy of patience and warmth.&quot;</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white px-6 py-24 shadow-sm"
        >
          <div className="mx-auto mb-16 max-w-7xl text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-on-surface">Why Threaded Life?</h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-primary"></div>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group rounded-3xl bg-surface-container-low p-10 transition-all hover:bg-surface-container-highest">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <h3 className="mb-4 font-serif text-2xl font-bold text-on-surface">Exceptional Quality</h3>
              <p className="leading-relaxed text-on-surface-variant">We source premium, eco-friendly cotton and wool yarns that are soft to the touch and built to last generations.</p>
            </div>

            <div className="group translate-y-0 rounded-3xl bg-surface-container-high/50 p-10 transition-all hover:bg-surface-container-highest md:translate-y-8">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-3xl">pan_tool_alt</span>
              </div>
              <h3 className="mb-4 font-serif text-2xl font-bold text-on-surface">100% Handmade</h3>
              <p className="leading-relaxed text-on-surface-variant">No machines. No shortcuts. Every knot and loop is crafted manually by local artisans with precision and care.</p>
            </div>

            <div className="group rounded-3xl bg-surface-container-low p-10 transition-all hover:bg-surface-container-highest">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-3xl">temple_hindu</span>
              </div>
              <h3 className="mb-4 font-serif text-2xl font-bold text-on-surface">Indian Roots</h3>
              <p className="leading-relaxed text-on-surface-variant">Celebrating Bharat&apos;s rich artisanal heritage while empowering local women craftspeople through fair-trade practices.</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-6 py-24"
        >
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] bg-primary p-12 text-center text-on-primary shadow-xl md:p-20">
            <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-64 w-64 rounded-full bg-black/10 blur-3xl"></div>

            <h2 className="relative mb-6 font-serif text-3xl font-bold md:text-5xl">Join the Threaded Family</h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-primary-fixed">Receive exclusive early access to new collections and soulful stories from our atelier.</p>

            <NewsletterSignup />
          </div>
        </motion.section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
