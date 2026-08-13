import { motion } from "framer-motion";

export function CategoriesSection() {
  return (
    <section
      id="collections"
      className="py-24 bg-surface-container-low border-y border-outline-variant/20"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[1280px] mx-auto px-6 md:px-16"
      >
        <div className="text-center mb-16">
          <h2 className="font-NeuMachina text-3xl md:text-4xl text-primary mb-4 font-semibold">
            Explore by Category
          </h2>
          <p className="font-HelveticaNow text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto font-normal">
            Discover collections tailored to distinct traditions and contemporary aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {/* Large Feature */}
          <motion.a
            whileHover={{ scale: 1.01 }}
            className="group relative md:col-span-2 md:row-span-2 overflow-hidden bg-surface block rounded-sm border border-outline-variant/15"
            href="/collections"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-70 group-hover:opacity-50"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7JX3Vz0lmO4xTeViEBHx7-GR6UuyZqBqr5S2EiaE1ec1Wk7mq1h3PEpNE7a_gx2X9OnqyrYLz_O1q8B-WGKPQGsV5pYHQ_dLcJUvBPR8r-TzqTfYIIvoZmTpXeqRK8XIT4IfHbJQHFTC4FKdOqsEIJ29cOGY3yUZasXDxI3QoRqvG2uRvYBh96OXfi5cZ3PGpUb7uNN6BX7tw-RSHxtscVk6g6gRtDRAJ61DWNDR9WkIoRpmu6kT2')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="font-HelveticaNow text-3xl sm:text-4xl text-primary mb-2 font-bold">
                Hindu Weddings
              </h3>
              <p className="font-body text-base text-on-surface max-w-md font-light">
                Rich traditions embodied in vibrant colors and sacred motifs.
              </p>
              <span className="mt-4 font-label text-xs uppercase tracking-widest text-primary border-b border-primary w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                Explore Collection
              </span>
            </div>
          </motion.a>

          {/* Standard Feature 1 */}
          <motion.a
            whileHover={{ scale: 1.01 }}
            className="group relative overflow-hidden bg-surface block rounded-sm border border-outline-variant/15"
            href="/collections"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-70 group-hover:opacity-50"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTfI5MxlySEqv5oRIgc2byuKUBdSJ8HgmdFNz9AQgshCQJLd60_EHwTBmbrBDvDgPbReDXIKaT-s_iluXlrNZJBM_r4L4mZX7cz3sj-i_0c00a3cM7zH2Eg4cVGZulZi9L-oHOPDXkm3CVXaUFtsia-TUI4AhF1QmHAie9EVhY_qQWgOduibXZQ4yojXQMdSyR8MlggSzfidLFOz81FCx9ayCKeADmSJRw6FXd5FXO_8fo6cQtRHRG')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="font-HelveticaNow text-2xl text-primary mb-1 font-semibold">
                Muslim Weddings
              </h3>
              <p className="font-body text-xs text-on-surface font-light">
                Elegant calligraphy and geometric perfection.
              </p>
            </div>
          </motion.a>

          {/* Standard Feature 2 */}
          <motion.a
            whileHover={{ scale: 1.01 }}
            className="group relative overflow-hidden bg-surface block rounded-sm border border-outline-variant/15"
            href="/collections"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-70 group-hover:opacity-50"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMl9zKhsmPd8xq4cvaG3pLZvvt933DR9y5wdXz0T_m5E7f-95odZvzbpAih-k6hsMkxUJ2ugTB4ucFo9zTcTqa-FkA8vzZ1ecOuQ_CES-bUcJRAXx0x36M-cXA13dqCpRwsVfyCbzevB71UI3clDx5rrk9uQNVevimH8WYpDHCv9pkv9kvrs4NtcEvVnmJCRZ1bdK2_P0UBOXYCW8DNpxn9mRHjgxLrQwSKaBBaSuoCxd_lLEkBNTl')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="font-HelveticaNow text-2xl text-primary mb-1 font-semibold">
                Christian Weddings
              </h3>
              <p className="font-body text-xs text-on-surface font-light">
                Classic elegance and minimalist sophistication.
              </p>
            </div>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
