import FormSubmit from "@/HomePage/components/Sections/contact/components/FormSubmit";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Mukesh Murugaiyan for collaborations, project discussions, or professional inquiries.",
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <section className="bg-[#111111] p-5 border-t border-l border-r border-gray-800 rounded-[1.25rem]">
        <h1 className="text-3xl font-bold mb-6">Contact</h1>

        <p className="mb-4">
          Thanks for visiting my website. If you have any questions,
          collaboration ideas, or professional inquiries, feel free to reach out
          using the details below.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Email</h2>
        <p className="mb-4">
          <a
            href="mailto:contact@themukesh.com"
            className="text-blue-600 underline"
          >
            contact@themukesh.com
          </a>
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Purpose of Contact</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Freelance or contract work</li>
          <li>Full-time opportunities</li>
          <li>Technical consultation</li>
          <li>Feedback about this website</li>
        </ul>

        <p className="mt-6">
          I aim to respond to all genuine inquiries as soon as possible.
        </p>
        <FormSubmit />
      </section>
    </main>
  );
}
