const Partners = () => {
  const partners = [
    { name: "BLASTER", logo: "🚀" },
    { name: "Hyperlock", logo: "🔒" },
    { name: "Ring", logo: "⭕" },
    { name: "THRUSTER", logo: "⚡" },
  ];

  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-12">
            Trusted by partners across the AI ecosystem.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {partner.logo}
              </span>
              <span className="text-lg font-medium">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;