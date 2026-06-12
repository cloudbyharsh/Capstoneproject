const testimonials = [
  {
    quote: "We had Pandit Ravi perform our son's Namkaran ceremony. Every detail was perfect — from the mantras to the explanation for our non-Indian guests. Setu made it effortless to book.",
    author: "Anita Sharma",
    role: "Mother, Griha Pravesh & Namkaran",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    rating: 5,
  },
  {
    quote: "I've been living in Canada for 15 years and always struggled to find authentic spiritual practitioners. Setu changed that completely. The astrology session with Acharya Deepak was life-changing.",
    author: "Rahul Bhatia",
    role: "Vedic Astrology Consultation",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    rating: 5,
  },
  {
    quote: "Swami Prakash's Diwali havan brought our whole family together in a way we hadn't experienced since moving here. This is exactly what the diaspora needs.",
    author: "Kavitha Menon",
    role: "Diwali Havan Ceremony",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
    rating: 5,
  },
  {
    quote: "The Vastu consultation for our new office was incredibly practical. Meena Ji explained everything in terms that made sense and the changes we made really shifted the energy of the space.",
    author: "Vijay Nair",
    role: "Office Vastu Assessment",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-pad bg-ivory">
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <div className="text-center mb-12">
          <p className="font-label text-label-sm text-saffron uppercase tracking-widest mb-2">Community voices</p>
          <h2 className="font-headline font-bold text-heading-lg text-charcoal">Stories from our Families</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-card p-8 shadow-card">
              <div className="flex gap-0.5 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-gold">★</span>
                ))}
              </div>
              <blockquote className="font-body text-body-md text-charcoal-muted leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-ivory-dark">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-headline font-semibold text-label-md text-charcoal">{t.author}</div>
                  <div className="font-label text-label-sm text-charcoal-subtle">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
