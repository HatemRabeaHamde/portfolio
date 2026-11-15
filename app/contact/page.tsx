import type { Metadata } from "next";
import { PageFooter } from "@/components/ui";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell me about your product — a SaaS, a marketplace, a social app or a payments flow.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactForm />
      <PageFooter />
    </main>
  );
}
