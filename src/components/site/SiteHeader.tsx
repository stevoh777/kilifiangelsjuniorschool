import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { leaders, primaryNav, schoolLifeNav, telHref, trailingNav } from "@/lib/site";
import { supabase } from "@/integrations/supabase/client";
import { meQuery } from "@/lib/session";
import { Logo } from "./Logo";

const linkClass =
  "rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-accent hover:text-primary";
const activeClass = "bg-accent text-primary";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { data: me } = useQuery(meQuery);
  const qc = useQueryClient();
  const navigate = useNavigate();
  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    setOpen(false);
    navigate({ to: "/login", replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="hidden bg-primary-deep text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-1.5 text-xs">
          <span className="truncate opacity-90">A Christ-centred CBC school in Kilifi, Kenya</span>
          <div className="flex shrink-0 items-center gap-5">
            {leaders.map((l) => (
              <a key={l.phone} href={telHref(l.phone)} className="flex items-center gap-1.5 hover:text-gold">
                <Phone className="h-3 w-3" /> {l.role}: {l.phone}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 xl:flex xl:justify-between">
        <Link to="/" className="min-w-0" aria-label="Kilifi Angels Junior School home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={linkClass}
              activeProps={{ className: activeClass }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className={`${linkClass} flex items-center gap-1 outline-none`}>
              School Life <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52 rounded-2xl p-2">
              {schoolLifeNav.map((item) => (
                <DropdownMenuItem key={item.to} asChild className="rounded-xl px-3 py-2 font-medium">
                  <Link to={item.to}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {trailingNav.map((item) => (
            <Link key={item.to} to={item.to} className={linkClass} activeProps={{ className: activeClass }}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {me ? (
            <>
              <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
                <Link to="/dashboard">My portal</Link>
              </Button>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={signOut}>Sign out</Button>
            </>
          ) : (
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link to="/login">Login</Link>
            </Button>
          )}
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/admissions" hash="apply">Apply Now</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto bg-background">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4 pb-8" aria-label="Mobile">
                {[...primaryNav, ...trailingNav].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 font-semibold hover:bg-accent"
                    activeProps={{ className: activeClass }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                ))}
                <p className="eyebrow mt-4 px-3">School Life</p>
                {schoolLifeNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 font-semibold hover:bg-accent"
                    activeProps={{ className: activeClass }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-6 grid gap-2">
                  <Button asChild>
                    <Link to="/admissions" hash="apply" onClick={() => setOpen(false)}>
                      Apply Now
                    </Link>
                  </Button>
                  {me ? (
                    <>
                      <Button asChild variant="outline">
                        <Link to="/dashboard" onClick={() => setOpen(false)}>My portal</Link>
                      </Button>
                      <Button variant="ghost" onClick={signOut}>Sign out</Button>
                    </>
                  ) : (
                    <Button asChild variant="outline">
                      <Link to="/login" onClick={() => setOpen(false)}>
                        Parent / Learner Login
                      </Link>
                    </Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
