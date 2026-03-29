import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import InquiryForm from '@/components/InquiryForm';

export const metadata = {
  title: 'Contact | Threaded Life',
  description: 'Get in touch with Threaded Life for order help, gifting, and custom requests.',
};

const contactMethods = [
  {
    icon: 'mail',
    title: 'Email support',
    detail: 'hello@threadedlife.in',
    helper: 'Best for order updates and gifting questions.',
  },
  {
    icon: 'call',
    title: 'Call the studio',
    detail: '+91 98765 43210',
    helper: 'Available Monday to Saturday, 10 AM to 6 PM.',
  },
  {
    icon: 'photo_camera',
    title: 'Instagram',
    detail: '@threadedlife.in',
    helper: 'See behind-the-scenes craft stories and new drops.',
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <section className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] bg-primary px-8 py-10 text-on-primary shadow-2xl shadow-primary/20">
              <p className="text-sm uppercase tracking-[0.28em] text-primary-fixed">
                Contact Threaded Life
              </p>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
                Reach the studio behind every stitch.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-primary-fixed">
                Whether you are choosing a gift, checking on an order, or exploring a custom crochet piece,
                we are happy to help.
              </p>

              <div className="mt-10 space-y-4">
                {contactMethods.map((method) => (
                  <div
                    key={method.title}
                    className="rounded-3xl border border-white/15 bg-white/10 px-5 py-5 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined rounded-2xl bg-white/15 p-3">
                        {method.icon}
                      </span>
                      <div>
                        <h2 className="font-semibold">{method.title}</h2>
                        <p className="mt-1 text-lg font-medium">{method.detail}</p>
                        <p className="mt-1 text-sm text-primary-fixed">{method.helper}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-surface-container-low px-8 py-10 shadow-lg shadow-primary/10">
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.28em] text-primary">Send a note</p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-on-surface">We usually reply within one business day</h2>
              </div>

              <InquiryForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
