import type { Metadata } from "next";
import ContactClient from "../../components/contact/ContactClient";

import { LOGO_URL } from "../../config";

export const metadata: Metadata = {
    title: "Contact Us - Booktax Solution",
    description: "Get in touch with Booktax Solution for bookkeeping, tax planning, and financial advisory services.",
    openGraph: {
        title: "Contact Us - Booktax Solution",
        description: "Get in touch with Booktax Solution for bookkeeping, tax planning, and financial advisory services.",
        type: "website",
        images: [LOGO_URL],
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
