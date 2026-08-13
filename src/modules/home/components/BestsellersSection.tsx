import { motion } from "framer-motion";
import { RevealSection } from "../../../components/common/RevealSection";

type Product = {
  id: number;
  category: string;
  title: string;
  price: string;
  image: string;
};

export function BestsellersSection() {
  const products: Product[] = [
    {
      id: 1,
      category: "HINDU WEDDING",
      title: "Pichwai Srinivasa Kalyanam",
      price: "From $12.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBImV8AoUl_87Y6GxRWRa6_VKVc9rnVhlj3pCHj4qM8GpONU9E4fuwjJoShVLnWzUqZYHdD0_HJAXxBUYSwH0-mn7yuuXz6L9NQsQQtEArZqoJFZcchj5lXGJGKcTrOPmLhzRoqZ0AaDHI6GZGL9qhGPH1Pk9aP_MnkKyRByes0VWp_3ntF-beznTBHRnLfFv2is0HeOZvGVRjqltL6t3_JToIHklBC0nBOoxHjDjXZZj2vmVsKWud_",
    },
    {
      id: 2,
      category: "CONTEMPORARY",
      title: "Powder Blue Pastel Elegance",
      price: "From $9.50",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCDvsUUQgyjUTLNNVbiPloM72Fr8OxdY7POcwC_qLD327MlQRXGYgnVIjJypr29HA8jYSUOwt93jW174Qqq1JrwLvdR_mBaAfft43qeucLBnQ6_d3e7J7wi4zTuAnDrFxA7WD4SUkhvze6AHrc4EkXpcPy44gHViGNJf7jiJBWAXMzVMe_rqBl8pPrphjE8V7giLAo1VO5YYtH770FtOqeopZ-OEkHVDfZfLbRMVq_migjxjyNX3gWW",
    },
    {
      id: 3,
      category: "LUXURY BOX",
      title: "Royal Velvet Monogram Box",
      price: "From $35.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB6SG7ox6RF12QAjBSJS4G4ghduJyEDEOO_ACylYYL0Vxzg9Xisyn_MrkHQebdxE4xeNxf8U4rD1KaEQ1w4T4Qbjb4c-0aEurBxf6qDKHgLKHvQLrpTMzwcYsomWjojBuM_QmVlodMwhKK1YmEqzrA6U4LzzxAC2e9RxhxXEPuV2sS9gH_S9ZCFkgLPi-HcGg5ZN9cdxhWNEN-TrEjpgb3NKJZP7hFEXXYokYSGGX4eEDTjScgFexTy",
    },
    {
      id: 4,
      category: "LASER CUT",
      title: "Intricate Floral Filigree",
      price: "From $15.50",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAf2tPMfi2Aqtzp_A5Tf4TNSn4LB-P8bcbVznEwhKGoLs_HoeeVXkEZp1CRFm-lKFnC4FLyJ4uXRhwgpuL6iGQBM2UC_iygVffbp0tQaeOKR_3Bk6ApCNkBk2RuIFTGPN5zQSShWA5sWRm53N-FpGcRHz9ydfR9ONBorfJsL3BNwdyTH3vltiAOZ9A4b2PWmyP54SHck11bR4ZUQO1ty7B5d_jSoobSqMkNjI9ks-NTt5SDeYLqYsiY",
    },
  ];

  return (
    <section className="py-24 max-w-[1280px] mx-auto px-6 md:px-16 overflow-hidden">
      <RevealSection>
        <div className="flex justify-between items-end mb-16 border-b border-outline-variant/20 pb-4">
          <div>
            <h2 className="font-NeuMachina text-3xl md:text-4xl text-primary mb-2 font-semibold">
              Curated Bestsellers
            </h2>
            <p className="font-HelveticaNow text-base text-on-surface-variant font-normal">
              Our most sought-after designs, meticulously crafted.
            </p>
          </div>
          <a
            className="group relative inline-flex flex-col font-label text-xs text-primary dark:text-on-surface hover:text-secondary dark:hover:text-primary transition-colors uppercase tracking-widest font-semibold hidden md:inline-block"
            href="/collections"
          >
            <span className="relative inline-block overflow-hidden h-[18px] leading-[18px] whitespace-nowrap border-b border-primary dark:border-on-surface">
              <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full whitespace-nowrap">
                View All Designs
              </span>
              <span className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 text-secondary dark:text-primary font-bold whitespace-nowrap">
                View All Designs
              </span>
            </span>
          </a>
        </div>
      </RevealSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product, idx) => (
          <RevealSection key={product.id} delay={idx * 0.1}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group bg-surface-container border border-outline-variant/20 hover:border-primary/50 transition-colors duration-300 flex flex-col h-full rounded-sm overflow-hidden shadow-xs hover:shadow-lg cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-surface p-4">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={product.title}
                  src={product.image}
                />
              </div>
              <div className="p-6 flex font-HelveticaNow flex-col justify-between flex-1">
                <div>
                  <span className="font-label text-[10px] text-on-surface-variant block tracking-widest uppercase font-semibold">
                    {product.category}
                  </span>
                  <h3 className=" text-xl text-on-surface mb-2 font-medium line-clamp-2">
                    {product.title}
                  </h3>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
                  <span className=" text-sm text-primary font-semibold">
                    {product.price}
                  </span>
                  <button
                    className="text-primary hover:text-primary-container transition-colors p-1 cursor-pointer"
                    aria-label="View product details"
                  >
                    <span className="material-symbols-outlined text-[20px] inline-block transition-transform duration-300 group-hover:-rotate-[35deg]">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}
