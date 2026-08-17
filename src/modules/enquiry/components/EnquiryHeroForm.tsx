import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { COMPANY_INFO } from "../../../constants";
import { useCreateEnquiry } from "../hooks";
import { useActiveOccasions } from "../../collections/hooks";
import { DatePicker } from "../../../components/ui/date-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import type { CreateEnquiryPayload } from "../types";

export function EnquiryHeroForm() {
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get("product");

  const { mutate, isPending, isError, error, isSuccess, reset } = useCreateEnquiry();
  const { data: occasionsData, isLoading: isLoadingOccasions } = useActiveOccasions();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    message: productParam ? `I am interested in inquiring about "${productParam}".` : "",
  });

  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [occasionOpen, setOccasionOpen] = useState(false);

  useEffect(() => {
    if (productParam) {
      setForm((prev) => ({
        ...prev,
        message: prev.message || `I am interested in inquiring about "${productParam}".`,
      }));
    }
  }, [productParam]);

  // Live dynamic occasions list from API
  const occasions = occasionsData?.data ?? [];

  const toggleOccasion = (name: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name],
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    if (id === "phone") {
      // Remove all non-digits
      let digits = value.replace(/\D/g, "");
      // Remove leading zeros (e.g. 09304922632 -> 9304922632)
      digits = digits.replace(/^0+/, "");
      // If user pasted with 91 country code (12 digits), strip 91
      if (digits.startsWith("91") && digits.length > 10) {
        digits = digits.slice(2);
      }
      // Cap at 10 digits
      const cleaned = digits.slice(0, 10);
      setForm((prev) => ({ ...prev, phone: cleaned }));

      if (cleaned.length > 0 && cleaned.length < 10) {
        setPhoneError("Please enter a 10-digit mobile number");
      } else if (cleaned.length === 10 && !/^[6-9]\d{9}$/.test(cleaned)) {
        setPhoneError("Mobile number must start with 6, 7, 8, or 9");
      } else {
        setPhoneError(null);
      }
      return;
    }
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let cleanedPhone = form.phone.replace(/\D/g, "").replace(/^0+/, "");
    if (cleanedPhone.startsWith("91") && cleanedPhone.length > 10) {
      cleanedPhone = cleanedPhone.slice(2);
    }

    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      setPhoneError("Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9");
      return;
    }
    setPhoneError(null);

    // Validate future date if date is provided
    if (form.date) {
      const selected = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        return;
      }
    }

    const payload: CreateEnquiryPayload = {
      enquiryFullName: form.fullName.trim(),
      enquiryMobile: cleanedPhone,
      enquiryEmail: form.email.trim(),
      enquiryOccassion: selectedOccasions.length > 0 ? selectedOccasions.join(", ") : "Wedding",
      enquiryWeddingDate: form.date || undefined,
      enquiryMessage: form.message.trim() || undefined,
    };

    mutate(payload);
  };

  const handleSuccessDismiss = () => {
    reset();
    setPhoneError(null);
    setSelectedOccasions([]);
    setForm({ fullName: "", email: "", phone: "", date: "", message: "" });
  };

  return (
    <section className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      {/* Left: Editorial Image */}
      <div className="relative w-full h-[42rem] bg-surface-container-low dark:bg-surface-container-low overflow-hidden rounded-sm border border-outline-variant/15 dark:border-outline-variant/20 shadow-sm">
        <img
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
          alt="Bespoke luxury wedding invitation suite with wax seal and silk ribbon"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy-JHdOvkwbH478D6JUanbMkVPmnw8KJhX-_sfxKSJr5JdhrkHgYbGRz7cCDO6bNKPLPqiQgw4xSvJuhb6Nr86oiM513GS6c0hYXcfsCgWG5NKy46EtkocEFC1LMxRt_GpASk4TOpbU7S7V9_TYaQk8KFw4YKSS0te06J2BUOok9_XSW1VM546Imce78q8Fu7yfuWLZtHD4iDU4WP77BWZRAmq43IR1b8fmaSixm2K5kzYlPDWjmdC"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Right: Enquiry Form */}
      <div className="flex flex-col justify-center space-y-8">
        <div className="space-y-3">
          <span className="font-label text-xs text-secondary dark:text-primary tracking-[0.2em] uppercase font-semibold">
            COMMISSION INQUIRY
          </span>
          <h1 className="font-NeuMachina text-3xl sm:text-4xl md:text-5xl text-primary dark:text-on-surface font-bold">
            Start Your Story
          </h1>
          <p className="font-HelveticaNow text-base text-on-surface-variant font-light leading-relaxed max-w-md">
            We invite you to share the details of your upcoming celebration. Our studio takes on a limited number of commissions each year to ensure uncompromising quality.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-8 bg-surface-container-low dark:bg-surface-container-low border border-secondary/30 dark:border-primary/40 rounded-sm text-center space-y-3">
            <span className="material-symbols-outlined text-[40px] text-secondary dark:text-primary">
              check_circle
            </span>
            <h3 className="font-serif text-2xl text-primary dark:text-on-surface font-medium">
              Enquiry Received
            </h3>
            <p className="font-body text-sm text-on-surface-variant font-light">
              Thank you for reaching out to {COMPANY_INFO.name}. Our senior design team will review your details and contact you within 24 business hours.
            </p>
            <button
              type="button"
              onClick={handleSuccessDismiss}
              className="mt-4 inline-flex items-center gap-2 text-secondary dark:text-primary hover:underline font-label text-xs uppercase tracking-widest font-semibold cursor-pointer"
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="relative group">
                <input
                  required
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full bg-transparent border-0 border-b border-outline-variant/40 dark:border-outline-variant/30 focus:border-primary dark:focus:border-primary focus:ring-0 px-0 py-2.5 font-body text-base text-primary dark:text-on-surface placeholder-transparent peer focus:outline-none transition-colors"
                />
                <label
                  htmlFor="fullName"
                  className="absolute left-0 -top-4 font-label text-xs uppercase tracking-wider text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-on-surface-variant/60 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary dark:peer-focus:text-primary pointer-events-none font-semibold"
                >
                  Full Name
                </label>
              </div>

              {/* Email */}
              <div className="relative group">
                <input
                  required
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full bg-transparent border-0 border-b border-outline-variant/40 dark:border-outline-variant/30 focus:border-primary dark:focus:border-primary focus:ring-0 px-0 py-2.5 font-body text-base text-primary dark:text-on-surface placeholder-transparent peer focus:outline-none transition-colors"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-4 font-label text-xs uppercase tracking-wider text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-on-surface-variant/60 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary dark:peer-focus:text-primary pointer-events-none font-semibold"
                >
                  Email Address
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Phone */}
              <div className="relative group">
                <input
                  required
                  id="phone"
                  type="tel"
                  maxLength={15}
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (e.g. 9876543210)"
                  className="w-full bg-transparent border-0 border-b border-outline-variant/40 dark:border-outline-variant/30 focus:border-primary dark:focus:border-primary focus:ring-0 px-0 py-2.5 font-body text-base text-primary dark:text-on-surface placeholder-transparent peer focus:outline-none transition-colors"
                />
                <label
                  htmlFor="phone"
                  className="absolute left-0 -top-4 font-label text-xs uppercase tracking-wider text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-on-surface-variant/60 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary dark:peer-focus:text-primary pointer-events-none font-semibold"
                >
                  Mobile Number
                </label>
                {phoneError && (
                  <p className="mt-1 text-[11px] text-error font-body font-normal">
                    {phoneError}
                  </p>
                )}
              </div>

              {/* Multi-Select Occasion Dropdown from API */}
              <div className="relative group pt-1">
                <label
                  className="absolute left-0 -top-3 font-label text-xs uppercase tracking-wider text-on-surface-variant pointer-events-none font-semibold"
                >
                  Occasion (Multi-Select)
                </label>
                <Popover open={occasionOpen} onOpenChange={setOccasionOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="flex h-11 w-full items-center justify-between border-b border-outline-variant/40 dark:border-outline-variant/30 bg-transparent px-0 py-2 text-sm font-serif text-primary dark:text-on-surface hover:border-primary dark:hover:border-primary transition-colors cursor-pointer text-left focus:outline-none"
                    >
                      <span className="truncate">
                        {isLoadingOccasions ? (
                          "Loading occasions..."
                        ) : selectedOccasions.length > 0 ? (
                          <span className="font-semibold text-primary dark:text-primary">
                            {selectedOccasions.join(", ")}
                          </span>
                        ) : (
                          <span className="text-on-surface-variant/60 font-sans text-sm">
                            Select Occasions...
                          </span>
                        )}
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0">
                        arrow_drop_down
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-64 p-2 bg-surface-container-high dark:bg-surface-container-high border border-outline-variant/30 shadow-xl rounded-sm z-[110]"
                  >
                    <div className="space-y-1 max-h-60 overflow-y-auto custom-scrollbar">
                      {occasions.map((occ) => {
                        const isChecked = selectedOccasions.includes(occ.occasions);
                        return (
                          <label
                            key={occ.id}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-HelveticaNow text-on-surface hover:bg-surface/80 rounded-xs cursor-pointer select-none transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleOccasion(occ.occasions)}
                              className="accent-primary w-4 h-4 rounded-xs cursor-pointer"
                            />
                            <span className={isChecked ? "font-bold text-primary" : "font-normal"}>
                              {occ.occasions}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Shadcn Luxury DatePicker for Wedding Date - Future Dates Only */}
            <div className="relative group">
              <label className="absolute left-0 -top-4 font-label text-xs uppercase tracking-wider text-on-surface-variant pointer-events-none font-semibold">
                Event / Wedding Date (Future Only)
              </label>
              <DatePicker
                date={form.date}
                disablePastDates={true}
                onDateChange={(d) => setForm((prev) => ({ ...prev, date: d }))}
                placeholder="Select Future Date"
              />
            </div>

            {/* Message Area */}
            <div className="relative group pt-4">
              <textarea
                rows={3}
                id="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your vision"
                className="w-full bg-transparent border-0 border-b border-outline-variant/40 dark:border-outline-variant/30 focus:border-primary dark:focus:border-primary focus:ring-0 px-0 py-2.5 font-body text-base text-primary dark:text-on-surface placeholder-transparent peer resize-none focus:outline-none transition-colors"
              ></textarea>
              <label
                htmlFor="message"
                className="absolute left-0 -top-1 font-label text-xs uppercase tracking-wider text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-5 peer-placeholder-shown:text-on-surface-variant/60 peer-focus:-top-1 peer-focus:text-xs peer-focus:text-primary dark:peer-focus:text-primary pointer-events-none font-semibold"
              >
                Special Requirements / Message
              </label>
            </div>

            {/* Error Banner */}
            {isError && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-xs text-error font-body text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span>
                  {error?.message ?? "An error occurred while submitting your enquiry. Please try again."}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Submit Button with Text Flip */}
              <button
                type="submit"
                disabled={isPending}
                className="group/submit relative inline-flex justify-center items-center w-full sm:w-auto bg-primary text-on-primary dark:bg-primary-container dark:text-on-primary-container font-label text-xs uppercase tracking-widest px-8 py-4 hover:bg-secondary dark:hover:bg-primary transition-all duration-300 rounded-full font-semibold shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative inline-block overflow-hidden h-[18px] leading-[18px] whitespace-nowrap">
                  {isPending ? (
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      <span className="block transition-transform duration-300 ease-out group-hover/submit:-translate-y-full whitespace-nowrap">
                        Submit Enquiry
                      </span>
                      <span className="block absolute top-0 left-0 transition-transform duration-300 ease-out translate-y-full group-hover/submit:translate-y-0 text-on-secondary dark:text-on-primary font-bold whitespace-nowrap">
                        Submit Enquiry
                      </span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}