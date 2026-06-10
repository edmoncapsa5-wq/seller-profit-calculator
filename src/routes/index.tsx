import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Workflow, Plug, Sparkles, Target, Mail, Phone, MapPin,
  Linkedin, Briefcase, GraduationCap, ArrowUpRight, Send
} from "lucide-react";
import edmonPortrait from "@/assets/edmon-portrait-v2.jpg.asset.json";
import bookkeepingImg from "@/assets/bookkeeping-automation.png.asset.json";
import emailReplyImg from "@/assets/email-reply-automation.png.asset.json";
import chatAgentImg from "@/assets/chat-ai-agent.png.asset.json";
import databaseAutoImg from "@/assets/database-automation.png.asset.json";

const works = [
  { title: "Simple Bookkeeping Automation", desc: "Automated invoice extraction and QuickBooks bill creation using AI.", img: bookkeepingImg.url },
  { title: "Email Reply Automation with AI Agent", desc: "Gmail-triggered AI agent that classifies and replies to messages using a Pinecone knowledge base.", img: emailReplyImg.url },
  { title: "Chat AI Agent with Database Access", desc: "Conversational AI agent connected to a Pinecone vector store for contextual answers.", img: chatAgentImg.url },
  { title: "Document Database Automation", desc: "Auto-ingest Google Drive files into a Pinecone vector database with OpenAI embeddings.", img: databaseAutoImg.url },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Edmon A. Capsa — Workflow Automation Specialist" },
      { name: "description", content: "Portfolio of Edmon A. Capsa, a workflow automation specialist building AI agents and automated workflows with Zapier, n8n, and Make.com." },
      { property: "og:title", content: "Edmon A. Capsa — Workflow Automation Specialist" },
      { property: "og:description", content: "Building AI agents and automated workflows with Zapier, n8n, and Make.com." },
    ],
  }),
  component: Index,
});

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-primary shadow-[var(--shadow-glow)]">
      <span className="font-display text-sm font-bold text-primary-foreground">EC</span>
    </div>
    <span className="font-display text-lg font-semibold tracking-tight">Edmon</span>
  </div>
);

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Works", href: "#works" },
  { label: "Skills", href: "#skills" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { icon: Workflow, title: "Workflow Automation", desc: "Designing end-to-end automated workflows using Zapier, n8n, and Make.com to eliminate repetitive tasks." },
  { icon: Sparkles, title: "AI Agents & Automation", desc: "Building AI agents and AI-powered automated workflows tailored to streamline business operations." },
  { icon: Plug, title: "API Integration", desc: "Connecting tools and platforms via APIs and webhooks for seamless data flow across your stack." },
  { icon: Target, title: "Funnel & CRM Management", desc: "Funnel building, lead generation, and CRM management with GoHighLevel for growing businesses." },
];

const experience = [
  { period: "Recent", title: "Teaching Intern", org: "Punta Integrated School", points: [
    "Created daily lesson plans and presentations teaching 3–5 sections of Grade 9 students",
    "Evaluated student performance and computed grades",
    "Managed classrooms ensuring a positive learning environment and proctored examinations",
  ]},
  { period: "Previous", title: "Assistant Bookkeeper", org: "SGL Business Outsourcing Services OPC", points: [
    "Encoded expense and sales transactions in QuickBooks Online",
    "Analyzed accounts and categorized each transaction, making payments of bills",
    "Wrote accounts on journals and ledgers",
  ]},
];

const education = [
  { period: "2022 – 2026", title: "Bachelor of Secondary Education Major in Science", org: "City College of Calamba" },
];

const skills = [
  { name: "Zapier", level: 90 },
  { name: "n8n", level: 88 },
  { name: "Make.com", level: 85 },
  { name: "API Integration", level: 80 },
  { name: "GoHighLevel", level: 82 },
  { name: "Prompt Engineering", level: 86 },
];

function Index() {
  const [activeService, setActiveService] = useState(0);

  return (
    <div className="min-h-screen text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden lg:flex items-center gap-7 text-sm text-muted-foreground">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
            ))}
          </nav>
          <a href="#contact" className="rounded-full bg-gradient-to-r from-accent to-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition">
            Hire me
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <section className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">I am Edmon</p>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05]">
              Workflow <br/>
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Automation</span> Specialist
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              I build AI agents and automated workflows using tools like Zapier and n8n — helping businesses eliminate repetitive work and scale with intelligent automation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#contact" className="rounded-full bg-gradient-to-r from-accent to-primary px-7 py-3 font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition">
                Hire me now
              </a>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/edmon-capsa-21523a40a" target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="mailto:edmon.capsa5@gmail.com" className="grid h-11 w-11 place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative mx-auto">
            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-accent/40 to-primary/20 blur-3xl" />
            <div className="relative h-80 w-80 lg:h-96 lg:w-96 rounded-full bg-gradient-to-br from-card to-secondary border border-border/50 shadow-[var(--shadow-card)] overflow-hidden">
              <img src={edmonPortrait.url} alt="Edmon A. Capsa portrait" className="h-full w-full object-cover object-center scale-90" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-y border-border py-10">
          {[
            { num: "—", label: "Years of Experience" },
            { num: "—", label: "Projects Completed" },
            { num: "—", label: "Happy Clients" },
            { num: "10", label: "Workflows Built" },
          ].map((s, i) => (
            <div key={i} className="text-center lg:text-left">
              <div className="text-4xl font-display font-bold">{s.num}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Services */}
        <section id="services" className="py-24">
          <div className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold">My Quality <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Services</span></h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Automation services designed to save time, reduce errors, and scale your business operations.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {services.map((s, i) => {
              const active = activeService === i;
              const Icon = s.icon;
              return (
                <button
                  key={i}
                  onClick={() => setActiveService(i)}
                  className={`w-full text-left rounded-2xl border border-border p-5 transition-all flex items-start gap-5 ${active ? "bg-gradient-to-r from-accent to-primary shadow-[var(--shadow-glow)]" : "bg-card hover:border-primary/50"}`}
                >
                  <div className={`text-xs font-mono mt-1 w-8 ${active ? "text-primary-foreground" : "text-muted-foreground"}`}>0{i+1}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${active ? "text-primary-foreground" : "text-primary"}`} />
                      <h3 className={`text-lg font-semibold ${active ? "text-primary-foreground" : ""}`}>{s.title}</h3>
                    </div>
                    {active && <p className="mt-3 text-sm text-primary-foreground/90 max-w-2xl">{s.desc}</p>}
                  </div>
                  <ArrowUpRight className={`h-5 w-5 mt-1 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </button>
              );
            })}
          </div>
        </section>

        {/* Works */}
        <section id="works" className="py-24">
          <div className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold">My Recent <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Works</span></h2>
            <p className="mt-3 text-muted-foreground">A selection of automation workflows I've built.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {works.map((w, i) => (
              <div key={i} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)] hover:border-primary/50 transition">
                <div className="aspect-[4/3] overflow-hidden bg-background">
                  <img src={w.img} alt={w.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{w.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience + Education */}
        <section className="grid lg:grid-cols-2 gap-8 py-24">
          <div id="experience">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><Briefcase className="h-7 w-7 text-primary" /> My Experience</h2>
            <div className="space-y-4">
              {experience.map((e, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition">
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{e.period}</span>
                  <h3 className="mt-3 text-lg font-semibold uppercase tracking-wide">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{e.org}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
                    {e.points.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div id="education">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><GraduationCap className="h-7 w-7 text-primary" /> My Education</h2>
            <div className="space-y-4">
              {education.map((e, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition">
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{e.period}</span>
                  <h3 className="mt-3 text-lg font-semibold uppercase tracking-wide">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{e.org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-24">
          <div className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold">My <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Skills</span></h2>
            <p className="mt-3 text-muted-foreground">Tools and technologies I work with every day.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((s, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex justify-between mb-3">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-primary font-mono text-sm">{s.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-accent to-primary" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24">
          <div className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold">Client <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Stories</span></h2>
            <p className="mt-3 text-muted-foreground">What colleagues and mentors say about working with me.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Mary Joy A. Capsa",
                role: "Lead Accountant, SGL Business Outsourcing OPC",
                initials: "MJ",
                quote: "Edmon was a great help to our company as an Assistant Bookkeeper. He diligently recorded expenses, sales, and imports, and carefully analyzed invoices and receipts to produce accurate reports. His work ethic and attention to detail truly stood out — dependable, thorough, and always willing to go the extra mile.",
              },
              {
                name: "Mark Anthony M. Balisi",
                role: "Cooperating Teacher, Punta Integrated School",
                initials: "MA",
                quote: "Edmon was a very great student teacher during his internship as a pre-service high school science teacher. He is incredibly teachable, open to criticism, and always acknowledges his shortcomings. He consistently strives to deliver the best work he can — a rare and admirable trait in a young educator.",
              },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-primary grid place-items-center font-display font-bold text-primary-foreground text-sm">{t.initials}</div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24">
          <div className="rounded-3xl border border-border bg-card p-8 lg:p-12 shadow-[var(--shadow-card)]">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold">Let's work <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">together!</span></h2>
                <p className="mt-4 text-muted-foreground max-w-md">Have a workflow you want to automate? Let's talk about how I can help streamline your operations.</p>
                <div className="mt-8 space-y-4 text-sm">
                  <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> 09565806996</div>
                  <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> edmon.capsa5@gmail.com</div>
                  <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Laguna, Philippines</div>
                  <div className="flex items-center gap-3"><Linkedin className="h-4 w-4 text-primary" />
                    <a className="hover:text-primary" href="https://www.linkedin.com/in/edmon-capsa-21523a40a" target="_blank" rel="noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input className="w-full rounded-xl border border-border bg-input/30 px-4 py-3 text-sm outline-none focus:border-primary transition" placeholder="Your Name" />
                  <input className="w-full rounded-xl border border-border bg-input/30 px-4 py-3 text-sm outline-none focus:border-primary transition" placeholder="Your Email" />
                </div>
                <input className="w-full rounded-xl border border-border bg-input/30 px-4 py-3 text-sm outline-none focus:border-primary transition" placeholder="Subject" />
                <textarea rows={5} className="w-full rounded-xl border border-border bg-input/30 px-4 py-3 text-sm outline-none focus:border-primary transition resize-none" placeholder="Your Message" />
                <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-primary px-7 py-3 font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition">
                  Send Message <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 mt-12">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Edmon A. Capsa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
