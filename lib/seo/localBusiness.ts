import { LocalBusinessJsonLdProps } from "next-seo";

export const localBusinesses: LocalBusinessJsonLdProps[] = [
  {
    type: "ProfessionalService",
    name: "Mukesh Murugaiyan",
    description:
      "Full Stack Developer building Web, Android, iOS & Desktop apps. Located in Tamil Nadu, India.",
    url: "https://themukesh.com",
    telephone: "+91-9786587013",
    address: {
      streetAddress: "Mayiladuthurai",
      addressLocality: "Tamil Nadu",
      addressRegion: "TN",
      postalCode: "609118",
      addressCountry: "IN",
    },
    geo: {
      latitude: 11.1425616,
      longitude: 79.7072551,
    },
    sameAs: [
      "https://github.com/rtrmukesh",
      "https://www.linkedin.com/in/mukesh-m-6b9404242",
      "https://www.instagram.com/rtr_mukesh_/",
      "https://maps.app.goo.gl/Z9h6cxKiEvwEApyt7",
    ],
  },
];
