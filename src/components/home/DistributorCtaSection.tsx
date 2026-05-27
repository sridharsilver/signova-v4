export function DistributorCtaSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-hero p-6 sm:p-10 md:p-16 text-white">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute -top-40 -right-40 size-96 rounded-full bg-lime-gradient opacity-30 blur-3xl" />
        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-lime font-semibold mb-4">
              Partner Programme
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Grow your business with{" "}
              <span className="text-gradient">India's premium agri-brand</span>
            </h2>
            <p className="text-white/75 mb-8 max-w-md">
              Industry-leading margins, exclusive territories, marketing
              collateral and full agronomy support.
            </p>
            <div className="space-y-3">
              {[
                "High margin structure",
                "Dedicated territory manager",
                "Co-branded marketing",
                "Tech & training support",
              ].map((b) => (
                <div key={b} className="flex items-center gap-3 text-sm">
                  <div className="size-6 rounded-full bg-lime-gradient grid place-items-center text-charcoal font-bold">
                    ✓
                  </div>
                  {b}
                </div>
              ))}
            </div>
          </div>
          <div className="glass-dark rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-5">Quick enquiry</h3>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                className="w-full bg-white/10 rounded-xl px-4 py-3 text-sm border border-white/15 placeholder:text-white/50 focus:outline-none focus:border-lime"
                placeholder="Your name"
              />
              <input
                className="w-full bg-white/10 rounded-xl px-4 py-3 text-sm border border-white/15 placeholder:text-white/50 focus:outline-none focus:border-lime"
                placeholder="Phone number"
              />
              <input
                className="w-full bg-white/10 rounded-xl px-4 py-3 text-sm border border-white/15 placeholder:text-white/50 focus:outline-none focus:border-lime"
                placeholder="District / State"
              />
              <button className="w-full px-5 py-3.5 rounded-xl bg-lime-gradient text-charcoal font-semibold hover:scale-[1.01] transition">
                Apply Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
