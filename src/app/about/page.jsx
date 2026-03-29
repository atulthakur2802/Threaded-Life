import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import Image from 'next/image';
import InquiryForm from '@/components/InquiryForm';

export const metadata = {
  title: 'About | Threaded Life',
};

const values = [
  {
    title: 'Sustainably Sourced',
    copy: 'We use natural fibers that are kind to the earth and your skin. No synthetic waste, just pure comfort.',
    eyebrow: 'Materials',
  },
  {
    title: 'Empowering Women',
    copy: 'Our startup provides fair-wage opportunities to women artisans, helping them build financial independence through craft.',
    eyebrow: 'Community',
  },
  {
    title: 'Unique Every Time',
    copy: 'Because every item is handmade, no two pieces are identical. Your Threaded Life piece is as unique as you are.',
    eyebrow: 'Made by Hand',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-7xl space-y-24 px-6 pb-16 pt-24">
        <section className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-secondary-fixed opacity-30 blur-3xl mix-blend-multiply"></div>
            <div className="relative z-10 h-[500px] rotate-2 overflow-hidden rounded-xl shadow-2xl transition-transform duration-500 hover:rotate-0">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmefCtkZMrjptQncNvMVNqpGKco74qt-SD8Rvm5kVq29MWek-qkEZz9rDPWHYPBqxlQVxewGYbwz7Vxe1lU47yK064GO4PlWbG8pjh6YZcHGKvHgA48L--fNPsDMMRqkICoNtmIiUyi1y94_mlNC-cnKqVNEiqsE6yHtRt2zVSpiRIMP1pBPhUDdqSSTtd7w5snA4uBAbvZxINz7b0Z0gNu5gRsHbv9IYPyaM7rkBTgDuMiQXa-bcMitHTTSkNkChPveT5KTQPPSd3"
                alt="Artisan hands crocheting"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="absolute -bottom-6 -right-6 max-w-xs rounded-xl bg-surface-container-low p-6 shadow-lg">
              <p className="font-serif italic leading-relaxed text-primary">&quot;Every loop is a promise of comfort, every stitch a story of heritage.&quot;</p>
            </div>
          </div>

          <div className="order-1 space-y-8 lg:order-2">
            <div className="space-y-2">
              <span className="text-sm font-serif uppercase tracking-widest text-outline">Our Heritage</span>
              <h1 className="font-serif text-5xl font-bold leading-tight text-on-surface">Born in the heart of India.</h1>
            </div>

            <p className="font-body text-lg leading-relaxed text-on-surface-variant">
              Threaded Life began as a quiet dream in a small sun-drenched studio. We are an Indian startup dedicated to reviving the slow, rhythmic art of crochet. In a world of fast fashion, we choose the patient path.
            </p>

            <p className="font-body text-lg leading-relaxed text-on-surface-variant">
              Our mission is to bring <span className="font-semibold italic text-primary">handmade joy</span> to your everyday life. Each piece is crafted by local artisans who pour their soul into the yarn, ensuring that what you wear feels like a warm embrace.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="h-px w-12 bg-outline-variant"></div>
              <span className="text-xl font-serif italic text-primary">Handmade with love</span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-8 rounded-3xl bg-surface-container-low/50 p-8 shadow-sm backdrop-blur-sm md:p-12 lg:col-span-7">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-bold text-on-surface">Reach out to us</h2>
              <p className="text-on-surface-variant">We&apos;d love to hear your thoughts or help with an order.</p>
            </div>

            <InquiryForm defaultTopic="General inquiry" submitLabel="Send Message" className="space-y-6" compact />
          </div>

          <div className="flex flex-col justify-between space-y-8 lg:col-span-5">
            <div className="space-y-8 rounded-3xl border border-primary-fixed/30 bg-primary-fixed/10 p-8 shadow-sm">
              <h3 className="text-2xl font-serif font-bold text-on-primary-container">Get in touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-white p-3 text-primary shadow-sm">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">Email Support</p>
                    <p className="text-on-surface-variant">hello@threadedlife.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-white p-3 text-primary shadow-sm">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">WhatsApp</p>
                    <p className="text-on-surface-variant">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-white p-3 text-primary shadow-sm">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">Instagram</p>
                    <a href="https://instagram.com/threadedlife.in" className="font-medium text-primary hover:underline">@threadedlife.in</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 rounded-3xl border-2 border-dashed border-primary-fixed bg-surface-container-high p-8">
              <div className="relative h-20 w-20 flex-shrink-0">
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary-fixed-dim opacity-50"></div>
                <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-inner">
                  <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold text-on-primary-container">Worldwide Delivery</h4>
                <p className="mt-1 text-sm font-medium text-on-surface-variant">Delivering artisanal joy globally.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-center font-serif text-4xl font-bold">Our Conscious Process</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`space-y-4 rounded-2xl p-8 shadow-sm ${index === 0 ? 'translate-y-4 bg-secondary-fixed/30' : ''} ${index === 1 ? 'border border-primary-fixed/50 bg-primary-fixed/30' : ''} ${index === 2 ? 'translate-y-8 bg-tertiary-fixed/30' : ''}`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{value.eyebrow}</p>
                <h3 className="font-serif text-xl font-bold">{value.title}</h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">{value.copy}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
