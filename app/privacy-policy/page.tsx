import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for themukesh.com explaining data collection, cookies, and third-party services.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <section className="bg-[#111111] p-5 border-t border-l border-r border-gray-800 rounded-[1.25rem]">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          This Privacy Policy document explains how information is collected,
          used, and protected when you visit <strong>themukesh.com</strong>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Information We Collect
        </h2>
        <p className="mb-4">
          We may collect personal information such as your email address if you
          voluntarily contact us. We also collect non-personal information like
          browser type, device information, and pages visited for analytics
          purposes.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
        <p className="mb-4">
          This website uses cookies to improve user experience and analyze
          website traffic. Cookies help us understand how visitors interact with
          the site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Google AdSense & Analytics
        </h2>
        <p className="mb-4">
          Google AdSense and Google Analytics may use cookies and web beacons to
          display relevant advertisements and analyze usage data. Google uses
          the DoubleClick cookie, which enables it to show ads based on your
          visits to this and other websites.
        </p>

        <p className="mb-4">
          Users may opt out of personalized advertising by visiting Google’s Ads
          Settings.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Third-Party Privacy Policies
        </h2>
        <p className="mb-4">
          themukesh.com’s Privacy Policy does not apply to other advertisers or
          websites. We advise you to consult the respective Privacy Policies of
          third-party ad servers or websites for more detailed information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Consent</h2>
        <p className="mb-4">
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, you can contact
          us at{" "}
          <a
            href="mailto:contact@themukesh.com"
            className="text-blue-600 underline"
          >
            contact@themukesh.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
