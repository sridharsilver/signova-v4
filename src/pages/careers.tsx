import { useState, useRef } from "react";
import { PageHero } from "@/components/common/PageShell";
import { Briefcase, MapPin, ArrowRight, Upload, X, CheckCircle2, FileText, User, Mail, Phone, Linkedin, MessageSquare } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import heroCareers from "@/assets/images/heros/hero_careers.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const roles = [
  { t: "Senior R&D Scientist", l: "Hyderabad", d: "Lead chelation chemistry projects and patent filings.", type: "Full-time", dept: "Research" },
  { t: "Field Agronomist", l: "Vidarbha, MH", d: "Support cotton & soybean farmers with nutrition programmes.", type: "Full-time", dept: "Agronomy" },
  { t: "Regional Sales Manager", l: "Bengaluru", d: "Drive growth across Karnataka & TN dealer network.", type: "Full-time", dept: "Sales" },
  { t: "Production Engineer", l: "Visakhapatnam", d: "Optimize manufacturing throughput and quality.", type: "Full-time", dept: "Operations" },
  { t: "Digital Marketing Lead", l: "Hyderabad", d: "Own farmer-facing content, video & community programmes.", type: "Full-time", dept: "Marketing" },
  { t: "QA Chemist", l: "Hyderabad", d: "Daily QC across 200+ parameters; ISO compliance.", type: "Full-time", dept: "Quality" },
];

const deptColors: Record<string, string> = {
  Research: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Agronomy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Sales: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Operations: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Marketing: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Quality: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

type Role = { t: string; l: string; dept: string };

type FormState = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  message: string;
};

function ApplyModal({ role, onClose }: { role: Role | null; onClose: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", linkedin: "", message: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".doc") || file.name.endsWith(".docx"))) {
      setCvFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCvFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setForm({ name: "", email: "", phone: "", linkedin: "", message: "" });
    setCvFile(null);
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={!!role} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden rounded-2xl">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-br from-primary/90 to-primary p-6 text-primary-foreground">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <DialogHeader className="relative">
            <div className="flex items-center gap-2 text-primary-foreground/70 text-xs font-medium uppercase tracking-widest mb-1">
              <Briefcase className="size-3" /> Application Form
            </div>
            <DialogTitle className="text-xl font-bold text-primary-foreground leading-snug">
              {role?.t}
            </DialogTitle>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1.5 text-primary-foreground/75 text-sm">
                <MapPin className="size-3.5" /> {role?.l}
              </span>
              {role?.dept && (
                <span className="px-2 py-0.5 rounded-full bg-white/15 text-primary-foreground text-xs font-semibold">
                  {role.dept}
                </span>
              )}
            </div>
          </DialogHeader>
        </div>

        {/* Form / Success */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {submitted ? (
            /* Success State */
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="size-8 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Application Submitted!</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Thank you! Our HR team will review your application and get back to you within 5–7 business days.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="mt-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange("name")}
                      placeholder="John Doe"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-secondary/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/60"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="john@example.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-secondary/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/60"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & LinkedIn row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange("phone")}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-secondary/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/60"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">LinkedIn Profile</label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                    <input
                      type="url"
                      value={form.linkedin}
                      onChange={handleChange("linkedin")}
                      placeholder="linkedin.com/in/johndoe"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-secondary/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/60"
                    />
                  </div>
                </div>
              </div>

              {/* CV / Resume Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">Resume / CV *</label>
                {cvFile ? (
                  /* File selected state */
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                    <div className="size-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="size-4 text-emerald-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{cvFile.name}</div>
                      <div className="text-xs text-muted-foreground">{(cvFile.size / 1024).toFixed(0)} KB</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCvFile(null)}
                      className="p-1.5 rounded-lg hover:bg-secondary transition flex-shrink-0"
                      aria-label="Remove file"
                    >
                      <X className="size-4 text-muted-foreground" />
                    </button>
                  </div>
                ) : (
                  /* Drop zone */
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleFileDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200 ${
                      isDragging
                        ? "border-primary bg-primary/5 scale-[1.01]"
                        : "border-border/60 hover:border-primary/50 hover:bg-secondary/30"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="size-10 rounded-xl bg-secondary flex items-center justify-center">
                        <Upload className="size-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">
                          {isDragging ? "Drop your file here" : "Drag & drop or click to upload"}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">PDF, DOC, DOCX — max 5MB</div>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf"
                      className="hidden"
                      onChange={handleFileInput}
                      required={!cvFile}
                    />
                  </div>
                )}
              </div>

              {/* Cover Letter */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">Cover Letter <span className="text-muted-foreground normal-case">(Optional)</span></label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 size-3.5 text-muted-foreground" />
                  <textarea
                    value={form.message}
                    onChange={handleChange("message")}
                    rows={3}
                    placeholder="Tell us why you're the right fit for this role..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-secondary/40 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/60 resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 mt-2"
              >
                Submit Application <ArrowRight className="size-4" />
              </button>

              <p className="text-center text-xs text-muted-foreground">
                By submitting, you agree to our privacy policy. We'll never share your data.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Careers() {
  usePageMeta({
    title: "Careers — Signova Group",
    description:
      "Build the future of Indian agriculture. Open roles in R&D, sales, manufacturing and field agronomy at Signova Group.",
  });

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the future of Indian agriculture"
        subtitle="Join 250+ scientists, agronomists and operators transforming how India grows."
        image={heroCareers}
      />

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-4">
          {roles.map((r, i) => (
            <div
              key={i}
              className="group bg-card rounded-3xl p-7 shadow-card hover:shadow-glow hover:-translate-y-0.5 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${deptColors[r.dept] ?? ""}`}>
                    {r.dept}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Briefcase className="size-3" /> {r.type}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" /> {r.l}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{r.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{r.d}</p>
              </div>
              <button
                onClick={() => setSelectedRole(r)}
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold group-hover:gap-3 transition-all"
              >
                Apply <ArrowRight className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <ApplyModal role={selectedRole} onClose={() => setSelectedRole(null)} />
    </>
  );
}

export default Careers;
