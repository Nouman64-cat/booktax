import { BlogListEntry, BlogDetail } from "../types/blog";

export const dummyBlogs: BlogDetail[] = [
  {
    slug: "top-tax-deductions-startups-2026",
    title: "10 Essential Tax Deductions for Startups in 2026",
    excerpt:
      "Maximize your tax savings this year with our guide to the most overlooked deductions for new businesses. From R&D credits to home office expenses, ensure you're not leaving money on the table.",
    date: "2026-01-15",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000",
    authors: [
      {
        name: "Sarah Jenkins, CPA",
        imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        role: "Tax Strategist",
        bio: "Expert in startup tax planning.",
      },
    ],
    categories: [{ title: "Tax Strategy", slug: "tax-strategy" }],
    tags: [],
    content: {
      markdown:
        "Full content would go here. This is a placeholder for the blog post content.",
    },
  },
  {
    slug: "bookkeeping-mistakes-to-avoid",
    title: "5 Common Bookkeeping Mistakes That Kill Startups",
    excerpt:
      "Poor financial records can sink a promising company. Learn about the most common bookkeeping errors founders make and how to automate your way to accuracy.",
    date: "2026-02-01",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
    authors: [
      {
        name: "Michael Chang",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        role: "Lead Accountant",
      },
    ],
    categories: [{ title: "Bookkeeping", slug: "bookkeeping" }],
    tags: [],
    content: {
      markdown:
        "Full content here. This is a placeholder for the blog post content.",
    },
  },
  {
    slug: "hiring-fractional-cfo",
    title: "When Is the Right Time to Hire a Fractional CFO?",
    excerpt:
      "As your revenue grows, so does financial complexity. Discover the key indicators that suggest your startup is ready for high-level financial strategic guidance.",
    date: "2026-02-05",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2000",
    authors: [
      {
        name: "Nouman Ejaz",
        imageUrl: "https://randomuser.me/api/portraits/men/85.jpg",
        role: "Founder",
      },
    ],
    categories: [{ title: "Growth Strategy", slug: "growth-strategy" }],
    tags: [],
    content: {
      markdown:
        "Full content here. This is a placeholder for the blog post content.",
    },
  },
];
