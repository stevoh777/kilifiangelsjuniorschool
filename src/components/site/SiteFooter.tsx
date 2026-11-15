import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { leaders, primaryNav, school, schoolLifeNav, telHref, trailingNav } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm leading-relaxed text-primary-foreground/75">
            A Christ-centred junior school in Kilifi following Kenya's Competency-Based Curriculum.
          </p>
          <p className="font-serif text-sm italic text-gold">"{school.motto}"</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-gold">Explore</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {[...primaryNav, ...trailingNav].map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="hover:text-gold">{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-gold">School Life</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {schoolLifeNav.map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="hover:text-gold">{i.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/login" className="hover:text-gold">Portal Login</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-gold">Get in touch</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            {leaders.map((l) => (
              <li key={l.phone}>
                <a href={telHref(l.phone)} className="flex items-start gap-2 hover:text-gold">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{l.role}: {l.phone}</span>
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={`mailto:${school.email}`} className="hover:text-gold">{school.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {school.location}
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" /> {school.hours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {school.name}. All rights reserved.</span>
          <span>"Let the little children come to me" — Matthew 19:14</span>
        </div>
      </div>
    </footer>
  );
}
