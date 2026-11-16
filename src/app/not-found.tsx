import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden px-4 pt-24 text-center">
      <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative">
        <p className="font-mono text-sm text-fg-subtle">Error 404</p>
        <h1 className="mt-4 text-6xl font-semibold tracking-tighter sm:text-8xl">
          <span className="text-gradient">Lost in the stack.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-fg-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/">
            <ArrowLeft /> Back home
          </Link>
        </Button>
      </div>
    </section>
  );
}
