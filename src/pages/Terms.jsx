import React from 'react';
import LegalPage from '../components/ui/LegalPage';

const CONTACT_EMAIL = 'contact@navedhana.com';

// Terms for the WEBSITE, not for client engagements — actual project work is
// governed by whatever contract is signed for it, and this page says so rather
// than implying the site's terms bind paid work. Facts outside the codebase
// (governing jurisdiction, registered entity details) are [TO CONFIRM].
const SECTIONS = [
  {
    heading: 'About these terms',
    body: (
      <>
        <p>
          These terms govern your use of this website. They do not govern any project we carry out for you — that work
          is covered by the separate written agreement signed for it. Where the two differ, the signed agreement wins.
        </p>
        <p>By using this site, you accept these terms. If you do not accept them, please do not use the site.</p>
      </>
    ),
  },
  {
    heading: 'What this site is',
    body: (
      <>
        <p>
          This site describes Navedhana&rsquo;s software, AI and product-engineering work, and our own products. It is
          informational.
        </p>
        <p>
          Descriptions of products and capabilities are not offers, quotes, or guarantees of any particular result.
          Products marked &ldquo;in development&rdquo; are not available yet, and nothing here commits us to releasing
          them or to any release date.
        </p>
      </>
    ),
  },
  {
    heading: 'Contacting us through this site',
    body: (
      <>
        <p>
          Submitting the contact form starts a conversation; it does not create a contract, reserve capacity, or oblige
          either of us to proceed. We may decline any enquiry.
        </p>
        <p>
          Please do not send confidential or sensitive information through the contact form. If a project needs that,
          we will agree a confidentiality arrangement first.
        </p>
      </>
    ),
  },
  {
    heading: 'Acceptable use',
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>attempt to gain unauthorised access to this site, its hosting, or any connected system;</li>
          <li>use automated means to scrape or overload the site, or to abuse the contact form;</li>
          <li>use the site to send unlawful, misleading, or harmful content.</li>
        </ul>
      </>
    ),
  },
  {
    heading: 'Our content',
    body: (
      <p>
        The text, design, code, graphics and logos on this site belong to Navedhana or to the parties that licensed
        them to us, and are protected by copyright and trade mark law. You may view and share pages normally. You may
        not copy the site&rsquo;s design or substantial parts of its content for your own commercial use without our
        written permission.
      </p>
    ),
  },
  {
    heading: 'Third-party links',
    body: (
      <p>
        This site links to external sites, including our product Lekvya and our LinkedIn page. We are not responsible
        for the content or practices of sites we do not operate, and a link is not an endorsement.
      </p>
    ),
  },
  {
    heading: 'Availability and accuracy',
    body: (
      <p>
        We try to keep this site accurate and available, but we do not guarantee that it will be uninterrupted,
        error-free, or current at every moment. We may change, suspend, or withdraw any part of it without notice.
      </p>
    ),
  },
  {
    heading: 'Liability',
    body: (
      <p>
        To the fullest extent permitted by law, Navedhana is not liable for indirect or consequential loss arising from
        your use of this website, including lost profits, lost data, or business interruption. Nothing in these terms
        limits liability that cannot lawfully be limited, such as liability for fraud or for death or personal injury
        caused by negligence.
      </p>
    ),
  },
  {
    heading: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of <strong>[TO CONFIRM]</strong>, and the courts of{' '}
        <strong>[TO CONFIRM]</strong> have exclusive jurisdiction over any dispute arising from them.
      </p>
    ),
  },
  {
    heading: 'Changes and contact',
    body: (
      <p>
        We may update these terms; the date above shows when they last changed, and continued use of the site means you
        accept the current version. Questions go to{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    ),
  },
];

const Terms = () => (
  <LegalPage
    kicker="Legal"
    title="Terms of Service"
    updated="20 August 2026"
    intro="The terms that apply when you use this website."
    sections={SECTIONS}
  />
);

export default Terms;
