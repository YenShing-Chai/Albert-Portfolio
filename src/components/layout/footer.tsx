import { ArrowUp, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { navItems } from "@/data/navigation";
import { LinkedInIcon, WhatsAppIcon } from "@/components/brand-icons";

export function Footer() {
  const year = 2026;
  return (
    <footer className="divider-top mt-8">
      <div className="container-page py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand + statement */}
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5 text-sm font-medium">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-xs border border-border-strong font-mono text-[0.7rem] text-foreground">
                AC
              </span>
              {site.name}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.role} · {site.location}. {site.availability}.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="label-mono">Navigate</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="label-mono">Connect</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <LinkedInIcon className="h-4 w-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-faint">
            © {year} {site.fullName}. Selected work shown at a high level to
            respect confidentiality.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
