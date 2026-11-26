import { VALUES_ITEMS } from '@/lib/legal-data';

export function ValuesStrip() {
  return (
    <section
      aria-label="Valores institucionales"
      className="bg-[#EEEEEE] py-12 md:py-14 border-y border-[#555555]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES_ITEMS.map((value, index) => (
            <div
              key={value.title}
              className={`flex flex-col space-y-1.5 ${
                index > 0 ? 'lg:border-l lg:border-[#555555]/20 lg:pl-8' : ''
              }`}
            >
              <span className="text-xs font-semibold tracking-widest text-[#555555] tabular-nums">
                {value.number}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#080808]">
                {value.title}
              </h3>
              <p className="text-sm text-[#555555] leading-relaxed">
                {value.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
