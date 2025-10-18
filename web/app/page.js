"use client";
import React from "react";
import { Calendar, MapPin, Ticket } from "lucide-react";

const SHOWS = [
  { date: "2025-11-08", venue: "Mxlan", city: "San Antonio, TX", doors: "7:00 PM", url: "#" },
  { date: "2025-12-12", venue: "Paper Tiger", city: "San Antonio, TX", doors: "8:00 PM", url: "#" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <span className="text-2xl font-semibold tracking-tight">Armadillo</span>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#shows" className="hover:opacity-70">Shows</a>
            <a href="#blog" className="hover:opacity-70">Blog</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
        </div>
      </header>

      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">Armadillo</h1>
          <p className="mt-4 max-w-xl text-neutral-600">Notes from the road and what’s next — blog • music • shows.</p>
        </div>
      </section>

      <section id="shows" className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-5 w-5" />
            <h2 className="text-2xl font-semibold">Latest shows</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {SHOWS.map((s) => {
              const d = new Date(s.date + "T00:00:00");
              const pretty = d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric", weekday: "short" });
              return (
                <div key={s.date + s.venue} className="rounded-xl border border-neutral-200 bg-white p-5">
                  <div className="text-lg font-medium">{pretty}</div>
                  <div className="mt-1 flex items-center gap-2 text-neutral-600">
                    <MapPin className="h-4 w-4"/>{s.venue} • {s.city}
                  </div>
                  <div className="mt-1 text-neutral-600">Doors {s.doors}</div>
                  <a href={s.url} className="mt-4 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50">
                    <Ticket className="h-4 w-4" /> Tickets
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-500">
          © {new Date().getFullYear()} Armadillo
        </div>
      </footer>
    </main>
  );
}
