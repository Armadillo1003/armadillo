import React from "react";
import { motion } from "framer-motion";
import { Menu, X, Calendar, MapPin, Music2, Mail, Instagram, Twitter, Youtube, Facebook, Ticket, Pencil, Moon, Sun, ExternalLink, Rss } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// =========================
// Quick-start instructions:
// 1) Drop this file into your React app (works great in Next.js).
// 2) Ensure Tailwind is set up. shadcn/ui & lucide-react are used for nice UI.
// 3) Replace the data in `SITE`, `SHOWS`, `POSTS`, and `TRACKS`.
// 4) (Optional) Wire newsletter & contact forms to your provider.
// 5) Deploy to Vercel/Netlify.
// =========================

const SITE = {
  name: "Armadillo",
  tagline: "Blog • Music • Shows",
  heroLine: "Notes from the road and what’s next.",
  ctaTicketUrl: "https://your-tickets-link.example.com",
  pressKitUrl: "https://your-epk-link.example.com",
  socials: {
    instagram: "https://instagram.com/yourhandle",
    twitter: "https://x.com/yourhandle",
    youtube: "https://youtube.com/@yourhandle",
    facebook: "https://facebook.com/yourhandle",
  },
};

// === Shows (edit me) ===
const SHOWS = [
  {
    date: "2025-11-08",
    venue: "Mxlan",
    city: "San Antonio, TX",
    doors: "7:00 PM",
    onSale: true,
    ticketUrl: "https://tickets.example.com/mxlan",
    note: "with Special Guest",
  },
  {
    date: "2025-12-12",
    venue: "Paper Tiger",
    city: "San Antonio, TX",
    doors: "8:00 PM",
    onSale: false,
    ticketUrl: "#",
    note: "TBA",
  },
];

// === Blog posts (edit me) ===
const POSTS = [
  {
    slug: "after-the-show",
    title: "32 (after the show)",
    excerpt:
      "Processing the quiet after the noise—the way a good night can still leave questions.",
    date: "2025-04-21",
    tags: ["tour", "journal"],
    cover: "https://images.unsplash.com/photo-1516926953800-2b4b3b89c7f8?q=80&w=2000&auto=format&fit=crop",
    url: "#",
  },
  {
    slug: "lonestar-33",
    title: "33 (lonestar)",
    excerpt:
      "Untangling the knots between ambition and intimacy—notes from a late-night drive.",
    date: "2025-05-06",
    tags: ["essay", "process"],
    cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop",
    url: "#",
  },
];

// === Music embeds (edit me) ===
const TRACKS = [
  {
    title: "Midnight Signals",
    embed: (
      <iframe
        style={{ border: 0, width: "100%", height: 152 }}
        src="https://open.spotify.com/embed/track/11dFghVXANMlKmJXsNCbNl"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Midnight Signals"
      />
    ),
  },
  {
    title: "Glass Lake",
    embed: (
      <iframe
        style={{ border: 0, width: "100%", height: 152 }}
        src="https://open.spotify.com/embed/track/3AJwUDP919kvQ9QcozQPxg"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Glass Lake"
      />
    ),
  },
];

function useThemeToggle() {
  const [dark, setDark] = React.useState<boolean>(true);
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return { dark, setDark };
}

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a href={href} className="text-sm font-medium text-foreground/80 hover:text-foreground transition">
    {children}
  </a>
);

const SectionHeader: React.FC<{ icon?: React.ReactNode; title: string; subtitle?: string }> = ({ icon, title, subtitle }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
    </div>
    {subtitle && (
      <p className="text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>
    )}
  </div>
);

const ShowCard: React.FC<{ show: (typeof SHOWS)[number] }> = ({ show }) => {
  const d = new Date(show.date + "T00:00:00");
  const pretty = d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  });
  return (
    <Card className="group overflow-hidden transition">
      <CardHeader className="flex flex-col gap-1">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calendar className="h-5 w-5" /> {pretty}
        </CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-2 text-base">
          <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{show.venue}</span>
          <span>•</span>
          <span>{show.city}</span>
          <span>•</span>
          <span>Doors {show.doors}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {show.onSale ? (
            <Badge className="bg-green-600 hover:bg-green-600">On Sale</Badge>
          ) : (
            <Badge variant="secondary">Soon</Badge>
          )}
          {show.note && <Badge variant="outline">{show.note}</Badge>}
        </div>
        <Button asChild>
          <a href={show.ticketUrl} target="_blank" rel="noreferrer noopener">
            <Ticket className="h-4 w-4 mr-2" /> Tickets
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

const PostCard: React.FC<{ post: (typeof POSTS)[number] }> = ({ post }) => (
  <Card className="overflow-hidden transition">
    <div className="relative h-44 w-full overflow-hidden">
      <img
        src={post.cover}
        alt={post.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <CardHeader>
      <div className="flex items-center gap-2 mb-1">
        {post.tags.map((t) => (
          <Badge key={t} variant="outline">{t}</Badge>
        ))}
      </div>
      <CardTitle className="text-xl">{post.title}</CardTitle>
      <CardDescription>{new Date(post.date).toLocaleDateString()}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-foreground/80 mb-4">{post.excerpt}</p>
      <Button variant="secondary" asChild>
        <a href={post.url} className="inline-flex items-center" target="_blank" rel="noreferrer noopener">
          Read post <ExternalLink className="h-4 w-4 ml-2" />
        </a>
      </Button>
    </CardContent>
  </Card>
);

const NewsletterForm: React.FC = () => (
  <form
    className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3"
    onSubmit={(e) => {
      e.preventDefault();
      alert("Subscribed! Replace this with your provider call.");
    }}
  >
    <Input type="email" required placeholder="you@fans.com" aria-label="Email address" />
    <Button type="submit" className="h-10"><Mail className="h-4 w-4 mr-2"/>Join newsletter</Button>
  </form>
);

const ContactForm: React.FC = () => (
  <form
    className="space-y-3"
    onSubmit={(e) => {
      e.preventDefault();
      alert("Message sent! Replace with your backend/Email API.");
    }}
  >
    <Input placeholder="Your name" required />
    <Input type="email" placeholder="Your email" required />
    <Textarea placeholder="Say hi or inquire for bookings…" rows={5} required />
    <Button type="submit">Send</Button>
  </form>
);

const Socials: React.FC = () => (
  <div className="flex items-center gap-4 text-foreground/80">
    <a href={SITE.socials.instagram} aria-label="Instagram" target="_blank" rel="noreferrer noopener" className="hover:text-foreground"><Instagram className="h-5 w-5"/></a>
    <a href={SITE.socials.twitter} aria-label="Twitter/X" target="_blank" rel="noreferrer noopener" className="hover:text-foreground"><Twitter className="h-5 w-5"/></a>
    <a href={SITE.socials.youtube} aria-label="YouTube" target="_blank" rel="noreferrer noopener" className="hover:text-foreground"><Youtube className="h-5 w-5"/></a>
    <a href={SITE.socials.facebook} aria-label="Facebook" target="_blank" rel="noreferrer noopener" className="hover:text-foreground"><Facebook className="h-5 w-5"/></a>
  </div>
);

const Footer: React.FC = () => (
  <footer className="border-t mt-16">
    <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
      <div>
        <div className="text-2xl font-bold tracking-tight">{SITE.name}</div>
        <p className="text-muted-foreground mt-2">{SITE.tagline}</p>
        <div className="mt-3"><Socials/></div>
      </div>
      <div>
        <div className="font-semibold mb-3">Navigate</div>
        <nav className="grid gap-1 text-sm text-foreground/80">
          <a href="#shows" className="hover:text-foreground">Shows</a>
          <a href="#blog" className="hover:text-foreground">Blog</a>
          <a href="#music" className="hover:text-foreground">Music</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
          <a href="#epk" className="hover:text-foreground">Press Kit</a>
        </nav>
      </div>
      <div>
        <div className="font-semibold mb-3">Subscribe</div>
        <p className="text-muted-foreground mb-3">News, drops, and shows. No spam.</p>
        <NewsletterForm/>
        <div className="mt-3 flex items-center gap-2 text-sm text-foreground/70">
          <Rss className="h-4 w-4"/>
          <a href="#" className="underline">RSS feed</a>
          <span>·</span>
          <a href="#" className="underline">JSON feed</a>
        </div>
      </div>
    </div>
    <div className="border-t py-6 text-center text-xs text-foreground/60">
      © {new Date().getFullYear()} {SITE.name}. All rights reserved.
    </div>
  </footer>
);

const Hero: React.FC<{ onToggleTheme: () => void; dark: boolean }> = ({ onToggleTheme, dark }) => (
  <section className="border-b">
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex items-start justify-between gap-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight"
          >
            {SITE.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-4 text-base md:text-lg text-foreground/70 max-w-2xl"
          >
            {SITE.heroLine}
          </motion.p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" variant="outline" asChild>
              <a href="#shows"><Ticket className="h-4 w-4 mr-2"/>See shows</a>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <a href={SITE.pressKitUrl} target="_blank" rel="noreferrer noopener">
                EPK <ExternalLink className="h-4 w-4 ml-2"/>
              </a>
            </Button>
          </div>
        </div>
        <Button onClick={onToggleTheme} variant="ghost" className="ml-auto hidden md:inline-flex">
          {dark ? <Sun className="h-4 w-4 mr-2"/> : <Moon className="h-4 w-4 mr-2"/>} Toggle theme
        </Button>
      </div>
    </div>
  </section>
);

const Header: React.FC<{ onToggleTheme: () => void; dark: boolean }> = ({ onToggleTheme, dark }) => (
  <header className="sticky top-0 z-40 w-full border-b bg-background/95">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <a href="#" className="text-lg font-bold tracking-tight">{SITE.name}</a>
      <nav className="hidden md:flex items-center gap-6">
        <NavLink href="#shows">Shows</NavLink>
        <NavLink href="#blog">Blog</NavLink>
        <NavLink href="#music">Music</NavLink>
        <NavLink href="#contact">Contact</NavLink>
        <NavLink href="#epk">EPK</NavLink>
        <Button onClick={onToggleTheme} size="icon" variant="ghost" aria-label="Toggle theme">
          {dark ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
        </Button>
      </nav>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" aria-label="Open menu"><Menu className="h-5 w-5"/></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">{SITE.name}</div>
              <Button size="icon" variant="ghost"><X className="h-5 w-5"/></Button>
            </div>
            <nav className="mt-6 grid gap-3 text-base">
              <a href="#shows">Shows</a>
              <a href="#blog">Blog</a>
              <a href="#music">Music</a>
              <a href="#contact">Contact</a>
              <a href="#epk">EPK</a>
              <Button onClick={onToggleTheme} variant="secondary" className="mt-4 inline-flex items-center gap-2">
                {dark ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
                Toggle theme
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
);

const MusicSection: React.FC = () => (
  <section id="music" className="container mx-auto px-4 py-12">
    <SectionHeader title="Listen" subtitle="Latest singles & demos" icon={<Music2 className="h-6 w-6"/>}/>
    <div className="grid md:grid-cols-2 gap-6">
      {TRACKS.map((t) => (
        <Card key={t.title}>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
          </CardHeader>
          <CardContent>{t.embed}</CardContent>
        </Card>
      ))}
    </div>
  </section>
);

const EPKSection: React.FC = () => (
  <section id="epk" className="container mx-auto px-4 py-12">
    <SectionHeader title="Press Kit" subtitle="Bio, photos, tech rider" icon={<ExternalLink className="h-6 w-6"/>}/>
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Short Bio</CardTitle>
          <CardDescription>Use this for press & promoters</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80 leading-relaxed">
            Alex blends alternative hip hop, indie, and jazz colors into stories about
            solitude and grit. On stage, it’s kinetic and intimate; on record,
            textured and deliberate. Recent highlights include a strong showing at
            Mxlan and collaborations with local creatives across Texas.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Downloads</CardTitle>
          <CardDescription>Press photos & tech</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <Button asChild variant="secondary"><a href={SITE.pressKitUrl} target="_blank" rel="noreferrer noopener">Full EPK</a></Button>
          <Button asChild variant="outline"><a href="#">Press Photos (.zip)</a></Button>
          <Button asChild variant="outline"><a href="#">Stage Plot (PDF)</a></Button>
          <Button asChild variant="outline"><a href="#">Input List (PDF)</a></Button>
        </CardContent>
      </Card>
    </div>
  </section>
);

const BlogSection: React.FC = () => (
  <section id="blog" className="container mx-auto px-4 py-12">
    <SectionHeader title="Blog" subtitle="Journal, essays, and notes" icon={<Pencil className="h-6 w-6"/>}/>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {POSTS.map((p) => <PostCard key={p.slug} post={p} />)}
    </div>
  </section>
);

const ShowsSection: React.FC = () => (
  <section id="shows" className="container mx-auto px-4 py-12">
    <SectionHeader title="Shows" subtitle="Catch me live" icon={<Calendar className="h-6 w-6"/>}/>
    <div className="grid md:grid-cols-2 gap-6">
      {SHOWS.map((s, i) => (
        <motion.div key={`${s.venue}-${s.date}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <ShowCard show={s} />
        </motion.div>
      ))}
    </div>
  </section>
);

const ContactSection: React.FC = () => (
  <section id="contact" className="container mx-auto px-4 py-12">
    <SectionHeader title="Contact" subtitle="Bookings, press, or just say hey" icon={<Mail className="h-6 w-6"/>}/>
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Message</CardTitle>
          <CardDescription>I read everything.</CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm/>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Links</CardTitle>
          <CardDescription>Where to find me</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Button asChild variant="outline"><a href={SITE.socials.instagram} target="_blank" rel="noreferrer noopener"><Instagram className="h-4 w-4 mr-2"/>Instagram</a></Button>
          <Button asChild variant="outline"><a href={SITE.socials.twitter} target="_blank" rel="noreferrer noopener"><Twitter className="h-4 w-4 mr-2"/>Twitter / X</a></Button>
          <Button asChild variant="outline"><a href={SITE.socials.youtube} target="_blank" rel="noreferrer noopener"><Youtube className="h-4 w-4 mr-2"/>YouTube</a></Button>
          <Button asChild variant="outline"><a href={SITE.socials.facebook} target="_blank" rel="noreferrer noopener"><Facebook className="h-4 w-4 mr-2"/>Facebook</a></Button>
        </CardContent>
      </Card>
    </div>
  </section>
);

const StickyBar: React.FC = () => (
  <div className="sticky bottom-4 z-40 px-4">
    <div className="mx-auto max-w-4xl rounded-2xl border bg-background/90 backdrop-blur px-4 py-3 shadow-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <Ticket className="h-4 w-4"/>
          <span>Next show soon — don’t miss it</span>
        </div>
        <Button asChild size="sm">
          <a href={SITE.ctaTicketUrl} target="_blank" rel="noreferrer noopener">Get Tickets</a>
        </Button>
      </div>
    </div>
  </div>
);

const BlogComposer: React.FC = () => (
  <Card className="border-dashed">
    <CardHeader>
      <CardTitle>Quick Post (local only)</CardTitle>
      <CardDescription>Prototype your posts here. Wire to a CMS later.</CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="write">
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="space-y-3">
          <Input placeholder="Title" />
          <Textarea placeholder="What’s on your mind?" rows={6} />
          <div className="flex items-center gap-2">
            <Button>Save draft</Button>
            <Button variant="secondary">Publish</Button>
          </div>
        </TabsContent>
        <TabsContent value="preview" className="prose dark:prose-invert max-w-none">
          <p>Write something and hook this into your CMS of choice (Sanity, Notion, Ghost, etc.).</p>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);

export default function AlexMusicSite() {
  const { dark, setDark } = useThemeToggle();
  const onToggleTheme = () => setDark((d) => !d);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground/10 selection:text-foreground">
      <Header onToggleTheme={onToggleTheme} dark={dark} />
      <main>
        <Hero onToggleTheme={onToggleTheme} dark={dark} />
        <section className="container mx-auto px-4 -mt-24">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5"/> Upcoming</CardTitle>
                <CardDescription>Tickets, times, and locations</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                {SHOWS.map((s) => <ShowCard key={`${s.venue}-${s.date}-hero`} show={s} />)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Pencil className="h-5 w-5"/> New Post</CardTitle>
                <CardDescription>Draft here. Publish later.</CardDescription>
              </CardHeader>
              <CardContent>
                <BlogComposer />
              </CardContent>
            </Card>
          </div>
        </section>

        <ShowsSection />
        <BlogSection />
        <MusicSection />
        <EPKSection />
        <ContactSection />

        <StickyBar />
      </main>
      <Footer />
    </div>
  );
}

// ===== Notes & Next Steps =====
// • Swap dummy links with real ones. Replace images with your own.
// • Connect Shows to a Google Sheet or Airtable and fetch via API if you want easy updates.
// • Blog can be backed by Notion, Sanity, Contentlayer, or Ghost.
// • Newsletter: plug into ConvertKit, Beehiiv, Mailchimp, or Buttondown.
// • Add analytics (Plausible/Umami). Add OG tags via your framework. Good to go!
