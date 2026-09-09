import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpenCheck,
  Briefcase,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  Folder,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Search,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import edmonPortrait from "@/assets/edmon-portrait-v2.jpg.asset.json";
import workTicketTriage from "@/assets/work-ticket-triage.jpg.asset.json";
import workEmailRouting from "@/assets/work-email-routing.jpg.asset.json";
import workKnowledgeBase from "@/assets/work-knowledge-base.jpg.asset.json";
import workInvoiceApproval from "@/assets/work-invoice-approval.jpg.asset.json";
import workContractReview from "@/assets/work-contract-review.jpg.asset.json";
import workInventory from "@/assets/work-inventory.jpg.asset.json";

const caseStudies = [
  {
    title: "Accounting Document Control & Encoding Support",
    desc: "A controlled workflow for preparing sales and expense documents, validating source data, isolating exceptions, and keeping accounting-support work traceable before encoding.",
    tags: ["Accounting Support", "Data Validation", "Documentation"],
    img: workInvoiceApproval.url,
  },
  {
    title: "Spreadsheet & Data Quality Operations",
    desc: "A practical cleanup approach for duplicate detection, field validation, exception handling, and safe import preparation without guessing when business identity is unclear.",
    tags: ["Spreadsheets", "Data Cleanup", "CRM Support"],
    img: workInventory.url,
  },
  {
    title: "Administrative Request & Email Triage",
    desc: "A structured intake model that classifies requests, identifies required action and owner, separates routine work from exceptions, and keeps follow-ups visible.",
    tags: ["Admin Operations", "Inbox Support", "Follow-up"],
    img: workEmailRouting.url,
  },
  {
    title: "SOP & Knowledge Base Organization",
    desc: "A documentation system that turns scattered instructions into clear procedures, decision rules, exception paths, and reference material that another person can continue using.",
    tags: ["SOPs", "Documentation", "Knowledge Management"],
    img: workKnowledgeBase.url,
  },
  {
    title: "Research-to-Decision Workflow",
    desc: "A research process that separates facts, assumptions, unknowns, and recommendations so decision-makers receive concise findings instead of raw information overload.",
    tags: ["Research", "Verification", "Decision Support"],
    img: workContractReview.url,
  },
  {
    title: "Workflow Automation & Exception Routing",
    desc: "Representative automation work focused on deterministic rules, validation, safe routing, and human review for ambiguous or consequential cases rather than blind automation.",
    tags: ["n8n", "Automation", "Process Control"],
    img: workTicketTriage.url,
  },
];

const services = [
  {
    icon: FileSpreadsheet,
    title: "Administrative & Spreadsheet Support",
    desc: "Data entry, cleanup, trackers, reconciliation support, reporting preparation, file organization, and repeatable administrative workflows.",
  },
  {
    icon: BookOpenCheck,
    title: "Documentation & SOP Support",
    desc: "Clear procedures, checklists, handoff notes, knowledge bases, templates, and documentation designed for easy continuation by the next person.",
  },
  {
    icon: Search,
    title: "Research & Decision Support",
    desc: "Structured research, source checking, comparison tables, summaries, and recommendations that distinguish verified facts from assumptions.",
  },
  {
    icon: Workflow,
    title: "Process & Automation Support",
    desc: "Workflow mapping and AI-assisted automation support with validation, exception handling, and human review where business judgment is required.",
  },
];

const experience = [
  {
    period: "Recent",
    title: "Teaching Intern",
    org: "Punta Integrated School",
    points: [
      "Prepared lesson plans, presentations, instructional materials, and classroom records for multiple Grade 9 sections.",
      "Tracked performance, computed grades, organized learning activities, and maintained deadline-sensitive documentation.",
      "Managed simultaneous classroom, administrative, and communication responsibilities in a structured environment.",
    ],
  },
  {
    period: "Previous",
    title: "Assistant Bookkeeper",
    org: "SGL Business Outsourcing Services OPC",
    points: [
      "Supported expense and sales transaction encoding in QuickBooks Online.",
      "Reviewed invoices and receipts, categorized transactions, and assisted with bill-payment preparation and accounting records.",
      "Worked with journals, ledgers, supporting documents, and detail-sensitive financial data under review procedures.",
    ],
  },
];

const capabilities = [
  "Administrative operations",
  "Spreadsheet cleanup & validation",
  "Data entry & reconciliation support",
  "Accounting operations support",
  "Research & source verification",
  "SOPs, checklists & documentation",
  "CRM/data-quality support",
  "Process mapping & coordination",
  "AI-assisted workflow execution",
  "Canva & presentation support",
  "QuickBooks Online exposure",
  "n8n / automation workflow exposure",
];

const principles = [
  {
    icon: CheckCircle2,
    title: "Clear status, not noise",
    desc: "I translate working details into concise status, impact, action, and next-step updates.",
  },
  {
    icon: ShieldCheck,
    title: "No guessing on consequential data",
    desc: "Routine corrections can move quickly; ambiguous identities, financial meaning, or permissions are isolated and escalated rather than assumed.",
  },
  {
    icon: Database,
    title: "Traceable work",
    desc: "I prefer controlled source files, explicit exceptions, reproducible steps, and handoffs another person can continue.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Edmon A. Capsa — Operations & Administrative Virtual Assistant" },
      {
        name: "description",
        content:
          "Portfolio of Edmon A. Capsa — Operations & Administrative Virtual Assistant focused on research, spreadsheets, documentation, accounting support, process management, and AI-assisted workflows.",
      },
      { property: "og:title", content: "Edmon A. Capsa — Operations & Administrative Virtual Assistant" },
      {
        property: "og:description",
        content: "AI-assisted research, spreadsheets, documentation, accounting support, and process management.",
      },
    ],
  }),
  component: Index,
});

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-primary shadow-[var(--shadow-glow)]">
      <span className="font-display text-sm font-bold text-primary-foreground">EC</span>
    </div>
    <span className="font-display text-lg font-semibold tracking-tight">Edmon Capsa</span>
  </div>
);

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "How I Work", href: "#principles" },
  { label: "Contact", href: "#contact" },
];

function Index() {
  return (
    <div className="min-h-screen text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="mailto:edmon.capsa5@gmail.com"
            className="rounded-full bg-gradient-to-r from-accent to-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
          >
            Contact me
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6">
        <section className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">Remote operations support</p>
            <h1 className="text-5xl font-bold leading-[1.05] lg:text-7xl">
              Operations &<br />
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Administrative VA
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              I support businesses with research, spreadsheets, documentation, accounting operations, data quality, and process coordination—using AI and automation to move routine work faster while keeping important exceptions under human review.
            </p>
            <p className="mt-4 max-w-2xl text-sm font-medium text-foreground/90">
              AI-Assisted Research • Spreadsheets • Documentation • Accounting Support • Process Management
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="rounded-full bg-gradient-to-r from-accent to-primary px-7 py-3 font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
              >
                View work samples
              </a>
              <a
                href="https://www.linkedin.com/in/edmon-capsa-21523a40a"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition hover:border-primary hover:text-primary"
              >
                LinkedIn <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto">
            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-accent/40 to-primary/20 blur-3xl" />
            <div className="relative h-80 w-80 overflow-hidden rounded-full border border-border/50 bg-gradient-to-br from-card to-secondary shadow-[var(--shadow-card)] lg:h-96 lg:w-96">
              <img src={edmonPortrait.url} alt="Edmon A. Capsa" className="h-full w-full object-cover object-center" />
            </div>
          </div>
        </section>

        <section className="grid gap-4 border-y border-border py-8 sm:grid-cols-3">
          <div>
            <div className="text-sm uppercase tracking-wider text-muted-foreground">Positioning</div>
            <div className="mt-1 font-semibold">Operations & Administrative Support</div>
          </div>
          <div>
            <div className="text-sm uppercase tracking-wider text-muted-foreground">Working style</div>
            <div className="mt-1 font-semibold">Structured, detail-aware, AI-assisted</div>
          </div>
          <div>
            <div className="text-sm uppercase tracking-wider text-muted-foreground">Location</div>
            <div className="mt-1 font-semibold">Laguna, Philippines • Remote</div>
          </div>
        </section>

        <section id="services" className="py-24">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold lg:text-5xl">
              What I can <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">support</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Practical support for teams that need reliable execution, organized information, and clear follow-through.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/50">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="work" className="py-24">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold lg:text-5xl">
              Selected <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">case studies</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Sanitized examples of the types of operational problems I can help structure and execute. Client-sensitive details are intentionally excluded.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {caseStudies.map((work, index) => (
              <div key={work.title} className="group relative pt-7">
                <div className="absolute left-6 top-0 z-0 flex h-8 w-40 items-center gap-2 rounded-t-xl bg-gradient-to-br from-accent to-primary pl-4 shadow-[var(--shadow-glow)]">
                  <Folder className="h-4 w-4 text-primary-foreground" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-primary-foreground">
                    Case {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-2xl rounded-tl-none border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50">
                  <div className="aspect-[16/9] overflow-hidden bg-background">
                    <img src={work.img} alt={work.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{work.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{work.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {work.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="grid gap-8 py-24 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold">
              <Briefcase className="h-7 w-7 text-primary" /> Experience
            </h2>
            <div className="space-y-4">
              {experience.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/50">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{item.period}</span>
                  <h3 className="mt-3 text-lg font-semibold uppercase tracking-wide">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.org}</p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted-foreground">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold">
              <GraduationCap className="h-7 w-7 text-primary" /> Education
            </h2>
            <div className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/50">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">2022 – 2026</span>
              <h3 className="mt-3 text-lg font-semibold uppercase tracking-wide">Bachelor of Secondary Education Major in Science</h3>
              <p className="text-sm text-muted-foreground">City College of Calamba</p>
            </div>
          </div>
        </section>

        <section id="skills" className="py-24">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold lg:text-5xl">
              Core <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">capabilities</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              I avoid arbitrary percentage scores. These are capabilities I can demonstrate through work samples, supervised experience, or practical project work.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <div key={capability} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium">{capability}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="principles" className="py-24">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold lg:text-5xl">
              How I <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">work</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <div key={principle.title} className="rounded-2xl border border-border bg-card p-6">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-semibold">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{principle.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="contact" className="py-24">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h2 className="text-4xl font-bold lg:text-5xl">
                  Need reliable <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">operations support?</span>
                </h2>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  I am open to remote Operations VA, Administrative VA, data-support, research, documentation, and accounting-support opportunities where careful execution and clear communication matter.
                </p>
              </div>
              <div className="space-y-4 text-sm">
                <a href="mailto:edmon.capsa5@gmail.com" className="flex items-center gap-3 rounded-xl border border-border p-4 transition hover:border-primary hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" /> edmon.capsa5@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/edmon-capsa-21523a40a"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border p-4 transition hover:border-primary hover:text-primary"
                >
                  <Linkedin className="h-4 w-4 text-primary" /> LinkedIn
                </a>
                <div className="flex items-center gap-3 rounded-xl border border-border p-4">
                  <MapPin className="h-4 w-4 text-primary" /> Laguna, Philippines • Remote
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-border/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <Logo />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Edmon A. Capsa. Portfolio work is sanitized where needed.</p>
        </div>
      </footer>
    </div>
  );
}
