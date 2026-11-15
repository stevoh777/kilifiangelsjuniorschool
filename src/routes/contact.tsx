import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { FormEvent } from "react";
import { toast } from "sonner";

import { Field, inputClass } from "@/components/site/FormField";
import { PageHero, Section } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { leaders, photos, school, telHref, whatsappHref } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Kilifi Angels Junior School" },
      { name: "description", content: "Call, WhatsApp, email or visit Kilifi Angels Junior School in Kilifi, Kenya." },
      { property: "og:title", content: "Contact Kilifi Angels Junior School" },
      { property: "og:description", content: "Phone, WhatsApp, email, map and working hours." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    toast.success("Message sent. Thank you!", { description: "We will get back to you soon." });
  };

  return (
    <>
      <PageHero eyebrow="Contact us" title="We'd love to hear from you." image={photos.swingFriends} imagePosition="center 40%" />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {leaders.map((l) => (
              <div key={l.phone} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <p className="eyebrow">{l.role}</p>
                <p className="mt-1 text-xl font-black text-primary">{l.name}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild size="sm">
                    <a href={telHref(l.phone)}><Phone /> Call {l.phone}</a>
                  </Button>
                  <Button asChild size="sm" variant="leaf">
                    <a href={whatsappHref(l.phone)} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a>
                  </Button>
                </div>
              </div>
            ))}
            <ul className="space-y-4 rounded-3xl border border-border bg-secondary p-6 text-sm">
              <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-leaf" /><a href={`mailto:${school.email}`} className="font-semibold hover:text-primary">{school.email}</a></li>
              <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-leaf" />{school.location}</li>
              <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-leaf" />{school.hours}</li>
            </ul>
          </div>
          <form onSubmit={onSubmit} className="grid gap-5 rounded-[2rem] border border-border bg-card p-8 shadow-lift sm:grid-cols-2">
            <h2 className="text-2xl font-black text-primary sm:col-span-2">Send us a message</h2>
            <Field label="Your name" htmlFor="name"><Input id="name" name="name" required maxLength={100} className={inputClass} /></Field>
            <Field label="Phone" htmlFor="cphone"><Input id="cphone" name="phone" type="tel" required pattern="[0-9+ ]{10,15}" className={inputClass} /></Field>
            <div className="sm:col-span-2"><Field label="Email" htmlFor="cemail"><Input id="cemail" name="email" type="email" maxLength={255} className={inputClass} /></Field></div>
            <div className="sm:col-span-2"><Field label="Message" htmlFor="msg"><Textarea id="msg" name="message" required maxLength={1000} rows={5} className="rounded-xl bg-card" /></Field></div>
            <Button type="submit" size="lg" className="sm:col-span-2">Send message</Button>
          </form>
        </div>
      </Section>
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border shadow-soft">
          <iframe
            title="Map of Kilifi"
            src="https://www.google.com/maps?q=Kilifi,Kenya&z=13&output=embed"
            className="h-96 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
