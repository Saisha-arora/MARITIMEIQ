
import React, { useState } from "react";
import "./HelpSupport.css";

const faqs = [
  {
    question: "How does route search work?",
    answer:
      "Enter your shipment details, including origin, destination, cargo type, and container requirements. MARITIMEIQ evaluates available routes and presents recommendations based on the platform's route data and agent scores.",
  },
  {
    question: "What are the AI agents?",
    answer:
      "The platform uses four agents: Route Agent, Price Agent, Weather Agent, and Customs Agent. Each evaluates a different aspect of a shipment to help compare available routes.",
  },
  {
    question: "How is the overall route score calculated?",
    answer:
      "Each agent contributes 25% to the overall score. The final score is calculated by combining the Route, Price, Weather, and Customs scores using their respective weights.",
  },
  {
    question: "Where can I find saved quotations?",
    answer:
      "Open the Saved Quotations page from your dashboard navigation to review quotations you have saved.",
  },
  {
    question: "How do I request quotation approval?",
    answer:
      "Open a saved quotation and use the approval request option if it is available. You can review the quotation's approval status on the Saved Quotations page.",
  },
  {
    question: "What should I do if route search fails?",
    answer:
      "Check that all required shipment details are entered correctly and try again. If the problem continues, contact your platform administrator.",
  },
];

export default function HelpSupport() {
  const [openFaq, setOpenFaq] = useState(0);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <main className="help-support-page">
      <header className="help-support-header">
        <p className="help-support-eyebrow">
          MARITIMEIQ / SUPPORT CENTER
        </p>

        <h1>How can we help?</h1>

        <p>
          Find answers about freight routes, AI recommendations,
          quotations, and your account.
        </p>
      </header>

      <section className="help-support-search">
        <span aria-hidden="true">⌕</span>

        <input
          type="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setOpenFaq(-1);
          }}
          placeholder="Search help articles..."
          aria-label="Search frequently asked questions"
        />
      </section>

      <section className="help-support-topics">
        <article className="help-topic-card">
          <span className="help-topic-icon" aria-hidden="true">
            ↗
          </span>
          <h3>Route Intelligence</h3>
          <p>Understand routes, shipment inputs, and AI scores.</p>
        </article>

        <article className="help-topic-card">
          <span className="help-topic-icon" aria-hidden="true">
            ◫
          </span>
          <h3>Quotations</h3>
          <p>Learn about saved quotations and approval requests.</p>
        </article>

        <article className="help-topic-card">
          <span className="help-topic-icon" aria-hidden="true">
            ?
          </span>
          <h3>General Help</h3>
          <p>Find troubleshooting tips for common issues.</p>
        </article>
      </section>

      <section className="help-faq-section">
        <div className="help-faq-heading">
          <div>
            <p className="help-support-eyebrow">KNOWLEDGE BASE</p>
            <h2>Frequently asked questions</h2>
          </div>

          <span className="help-faq-count">
            {filteredFaqs.length} ARTICLES
          </span>
        </div>

        <div className="help-faq-list">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <article
                className={`help-faq-item ${isOpen ? "is-open" : ""}`}
                key={faq.question}
              >
                <button
                  className="help-faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                >
                  <span>{faq.question}</span>
                  <span className="help-faq-toggle">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <p className="help-faq-answer">{faq.answer}</p>
                )}
              </article>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="help-no-results">
              <h3>No matching articles</h3>
              <p>
                Try a different search term, such as routes,
                agents, quotations, or approval.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="help-contact-card">
        <div>
          <p className="help-support-eyebrow">NEED MORE HELP?</p>
          <h2>Still have questions?</h2>
          <p>
            Contact your platform administrator if you need
            assistance with your account or a shipment.
          </p>
        </div>

        <span className="help-contact-symbol" aria-hidden="true">
          →
        </span>
      </section>

      <footer className="help-support-footer">
        MARITIMEIQ · GLOBAL FREIGHT INTELLIGENCE
      </footer>
    </main>
  );
}
