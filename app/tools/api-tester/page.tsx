import type { Metadata } from "next";
import ApiTesterClient from "./ApiTesterClient";

export const metadata: Metadata = {
  title: "Free Online API Tester | Send HTTP Requests & Test REST APIs",
  description: "A powerful, free online API testing tool. Easily send GET, POST, PUT, PATCH, and DELETE requests. Configure custom HTTP headers, query parameters, and request bodies (JSON, Form Data, URL Encoded). Analyze detailed responses and debugging logs in real-time directly from your browser.",
  keywords: [
    "API tester",
    "online API client",
    "Postman alternative online",
    "HTTP request tester",
    "REST API testing tool",
    "webhook tester",
    "developer tools",
    "API debugging",
    "JSON formatter",
    "API Nexus"
  ],
  openGraph: {
    title: "Free Online API Tester | Send HTTP Requests & Test REST APIs",
    description: "Easily send GET, POST, PUT, PATCH, and DELETE requests, configure custom HTTP headers, and analyze detailed JSON API responses in real-time.",
    url: "https://themukesh.com/tools/api-tester",
    type: "website",
    siteName: "Mukesh Murugaiyan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online API Tester | Advanced HTTP Request Client",
    description: "Easily send GET, POST, PUT, PATCH, and DELETE requests, configure custom HTTP headers, and analyze detailed JSON API responses in real-time.",
  },
  alternates: {
    canonical: "https://themukesh.com/tools/api-tester",
  },
};

export default function ApiTesterServerPage() {
  return <ApiTesterClient />;
}
