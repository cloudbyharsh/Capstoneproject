"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { Service, Provider } from "@/lib/types";
import Button from "@/components/ui/Button";

const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

function getDatesForNext14Days() {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

interface BookingClientProps {
  service: Service;
  provider: Provider | undefined;
}

export default function BookingClient({ service, provider }: BookingClientProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const dates = getDatesForNext14Days();

  const canProceedStep1 = selectedDate && selectedTime;
  const canProceedStep2 = form.name && form.email && form.phone && form.address;

  function formatDate(d: Date) {
    return d.toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" });
  }

  function handleSubmit() {
    const ref = "DEV-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    router.push(
      `/confirmation?ref=${ref}&service=${encodeURIComponent(service.title)}&date=${encodeURIComponent(formatDate(selectedDate!))}&time=${encodeURIComponent(selectedTime!)}&name=${encodeURIComponent(form.name)}&price=${service.price}`
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label text-label-md border-2 transition-all duration-300 ${
                step > s
                  ? "bg-maroon border-maroon text-ivory"
                  : step === s
                  ? "bg-maroon border-maroon text-ivory"
                  : "bg-white border-ivory-dark text-charcoal-subtle"
              }`}>
                {step > s ? <CheckCircle2 size={16} /> : s}
              </div>
              <span className={`font-label text-label-md ${step >= s ? "text-charcoal" : "text-charcoal-subtle"}`}>
                {s === 1 ? "Date & Time" : s === 2 ? "Your Details" : "Review"}
              </span>
              {s < 3 && <ChevronRight size={16} className="text-charcoal-subtle ml-1" />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <div className="bg-white rounded-card shadow-card p-6 mb-6">
              <h2 className="font-headline font-semibold text-heading-md text-charcoal mb-5">Select a Date</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {dates.map((d, i) => {
                  const isSelected = selectedDate?.toDateString() === d.toDateString();
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(d)}
                      className={`flex flex-col items-center p-3 rounded-btn border transition-all duration-300 ${
                        isSelected
                          ? "bg-maroon border-maroon text-ivory"
                          : "bg-white border-ivory-dark hover:border-saffron/40 text-charcoal"
                      }`}
                    >
                      <span className="font-label text-label-sm mb-0.5">
                        {d.toLocaleDateString("en-CA", { weekday: "short" })}
                      </span>
                      <span className="font-headline font-bold text-heading-md">
                        {d.getDate()}
                      </span>
                      <span className="font-label text-label-sm">
                        {d.toLocaleDateString("en-CA", { month: "short" })}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedDate && (
              <div className="bg-white rounded-card shadow-card p-6 mb-6">
                <h2 className="font-headline font-semibold text-heading-md text-charcoal mb-5">Select a Time</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-3 rounded-btn border font-label text-label-md transition-all duration-300 ${
                        selectedTime === t
                          ? "bg-maroon border-maroon text-ivory"
                          : "bg-white border-ivory-dark hover:border-saffron/40 text-charcoal"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={() => setStep(2)}
              disabled={!canProceedStep1}
              size="lg"
              className={!canProceedStep1 ? "opacity-40 cursor-not-allowed" : ""}
            >
              Continue
              <ChevronRight size={18} />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="bg-white rounded-card shadow-card p-6 mb-6">
              <h2 className="font-headline font-semibold text-heading-md text-charcoal mb-5">Your Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {(["name", "email", "phone"] as const).map((field) => (
                  <div key={field}>
                    <label className="block font-label text-label-md text-charcoal-muted mb-1.5 capitalize">
                      {field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Phone Number"}
                      <span className="text-error ml-0.5">*</span>
                    </label>
                    <input
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      placeholder={field === "name" ? "Priya Sharma" : field === "email" ? "priya@email.com" : "+1 (416) 000-0000"}
                      className="w-full px-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                    Service Address <span className="text-error ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="123 Main St, Toronto, ON M5V 1A1"
                    className="w-full px-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                    Special Requests <span className="text-charcoal-subtle font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    placeholder="Any specific requirements, dietary needs, or notes for the practitioner..."
                    className="w-full px-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setStep(1)} size="lg">
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                size="lg"
                className={!canProceedStep2 ? "opacity-40 cursor-not-allowed" : ""}
              >
                Review Booking
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="bg-white rounded-card shadow-card p-6 mb-6">
              <h2 className="font-headline font-semibold text-heading-md text-charcoal mb-5">Review your booking</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-ivory-dark">
                  <img src={service.image} alt={service.title} className="w-16 h-16 rounded-btn object-cover" />
                  <div>
                    <div className="font-headline font-semibold text-label-md text-charcoal">{service.title}</div>
                    {provider && <div className="font-label text-label-sm text-charcoal-subtle">{provider.name}</div>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-label-md">
                  {[
                    { label: "Date", value: formatDate(selectedDate!) },
                    { label: "Time", value: selectedTime! },
                    { label: "Name", value: form.name },
                    { label: "Email", value: form.email },
                    { label: "Phone", value: form.phone },
                    { label: "Address", value: form.address },
                  ].map((row) => (
                    <div key={row.label}>
                      <span className="font-label text-charcoal-subtle">{row.label}: </span>
                      <span className="font-label text-charcoal font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
                {form.notes && (
                  <div className="pt-3 border-t border-ivory-dark">
                    <span className="font-label text-charcoal-subtle text-label-md">Notes: </span>
                    <span className="font-label text-charcoal text-label-md">{form.notes}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-saffron-tint border border-saffron/20 rounded-card p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-headline font-semibold text-heading-md text-charcoal">Total</span>
                <span className="font-headline font-bold text-heading-lg text-charcoal">${service.price}</span>
              </div>
              <p className="font-label text-label-sm text-charcoal-subtle mt-1">Payment collected on the day of service</p>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setStep(2)} size="lg">
                Back
              </Button>
              <Button onClick={handleSubmit} size="lg">
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 bg-white rounded-card shadow-card p-6">
          <img src={service.image} alt={service.title} className="w-full h-36 object-cover rounded-btn mb-4" />
          <h3 className="font-headline font-semibold text-heading-md text-charcoal mb-1">{service.title}</h3>
          {provider && (
            <div className="flex items-center gap-2 mb-3">
              <img src={provider.photo} alt={provider.name} className="w-6 h-6 rounded-full object-cover" />
              <span className="font-label text-label-sm text-charcoal-muted">{provider.name}</span>
            </div>
          )}
          <div className="border-t border-ivory-dark pt-4 space-y-2">
            <div className="flex justify-between font-label text-label-md">
              <span className="text-charcoal-muted">Duration</span>
              <span className="text-charcoal">{service.duration}</span>
            </div>
            <div className="flex justify-between font-label text-label-md">
              <span className="text-charcoal-muted">Price</span>
              <span className="font-bold text-charcoal">${service.price}</span>
            </div>
            {selectedDate && (
              <div className="flex justify-between font-label text-label-md">
                <span className="text-charcoal-muted">Date</span>
                <span className="text-charcoal">{formatDate(selectedDate)}</span>
              </div>
            )}
            {selectedTime && (
              <div className="flex justify-between font-label text-label-md">
                <span className="text-charcoal-muted">Time</span>
                <span className="text-charcoal">{selectedTime}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
