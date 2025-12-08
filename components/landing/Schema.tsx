import Head from "next/head";
export function Schema() {
  const faqItems = [
    {
      question: "Siapa Saya?",
      answer: "Ayub Budi Santoso",
    },
    {
      question: "Saya Bisa apa saja?",
      answer: "Saya bisa membuat website dengan javascript (Vue.js, Next.js, dan React) dan php(laravel),",
    },
    {
      question: "Sosial Media?",
      answer: "Ig: @ayub_budi213 linkedin: https://www.linkedin.com/in/ayub09/",
    },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </Head>
  );
}
