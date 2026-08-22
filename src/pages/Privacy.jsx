import React from 'react';
import LegalPage from '../components/ui/LegalPage';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const CONTACT_EMAIL = 'contact@navedhana.com';

// Content describes what this site actually does today: one EmailJS-backed
// contact form (src/pages/Contact.jsx) and Google Analytics (src/lib/
// analytics.js). Anything that depends on facts outside the codebase —
// registered address, retention periods, governing state — is marked
// [TO CONFIRM] rather than invented, since a privacy policy is a legal
// representation and a plausible-sounding guess is worse than a blank.
const SECTIONS = [
  {
    heading: 'Who we are',
    body: (
      <>
        <p>
          Navedhana Profit Amplifier Private Limited (&ldquo;Navedhana&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
          operates this website and the software and AI services described on it.
        </p>
        <p>
          Registered address: <strong>[TO CONFIRM]</strong>. For any question about this policy or your data, contact
          us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </>
    ),
  },
  {
    heading: 'What we collect',
    body: (
      <>
        <p>We collect only two kinds of information through this website:</p>
        <ul>
          <li>
            <strong>What you send us.</strong> When you submit the contact form, we receive the name, email address,
            company name and message you type into it. Nothing on this site asks for payment details, identity
            documents, or any special-category personal data.
          </li>
          <li>
            <strong>Usage analytics.</strong> Pages viewed, approximate location derived from IP address, device and
            browser type, referring site, and interactions such as scroll depth and clicks on calls to action.
          </li>
        </ul>
        <p>We do not buy personal data, and we do not sell it.</p>
      </>
    ),
  },
  {
    heading: 'How we use it',
    body: (
      <>
        <p>
          Contact-form details are used to reply to your enquiry and to discuss a possible project. Analytics are used
          in aggregate to understand which pages are useful and where the site is confusing.
        </p>
        <p>We do not use your information for automated decision-making or profiling.</p>
      </>
    ),
  },
  {
    heading: 'Who processes it for us',
    body: (
      <>
        <p>Two third parties handle data on our behalf:</p>
        <ul>
          <li>
            <strong>EmailJS</strong> delivers the contact form to our inbox. Your submission passes through their
            service.
          </li>
          <li>
            <strong>Google Analytics</strong> provides the usage statistics described above and sets cookies in your
            browser to do so.
          </li>
        </ul>
        <p>
          Each has its own privacy policy governing what it does with that data. Our website is hosted by
          <strong> [TO CONFIRM]</strong>, whose servers store the site itself.
        </p>
      </>
    ),
  },
  {
    heading: 'Cookies',
    body: (
      <p>
        This site sets analytics cookies through Google Analytics. It does not use advertising or retargeting cookies.
        You can block or delete cookies in your browser settings, or install Google&rsquo;s opt-out extension; the site
        continues to work normally either way.
      </p>
    ),
  },
  {
    heading: 'How long we keep it',
    body: (
      <p>
        Contact-form correspondence is kept for <strong>[TO CONFIRM]</strong> so we can follow up on ongoing
        conversations, then deleted. Analytics data is retained according to the retention period configured in Google
        Analytics, currently <strong>[TO CONFIRM]</strong>.
      </p>
    ),
  },
  {
    heading: 'Your rights',
    body: (
      <>
        <p>
          You can ask us to give you a copy of the personal data we hold about you, correct it if it is wrong, or
          delete it. You can also ask us to stop using it. To do any of these, email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will respond within 30 days.
        </p>
        <p>
          If you are in a jurisdiction with additional statutory rights — such as the EU or UK under GDPR — those
          rights apply to you in full, including the right to complain to your local data protection authority.
        </p>
      </>
    ),
  },
  {
    heading: 'Security',
    body: (
      <p>
        This site is served over HTTPS, and we limit access to enquiry correspondence to the people who need it. No
        method of transmission over the internet is completely secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    heading: 'Changes to this policy',
    body: (
      <p>
        If we change how we handle personal data, we will update this page and revise the date above. Material changes
        will be noted here rather than made silently.
      </p>
    ),
  },
];

const Privacy = () => {
  useDocumentMeta({
    title: 'Privacy Policy — Navedhana',
    description: 'What this website collects, why, and what you can ask us to do about it.',
  });

  return (
    <LegalPage
      kicker="Legal"
      title="Privacy Policy"
      updated="20 August 2026"
      intro="What this website collects, why, and what you can ask us to do about it."
      sections={SECTIONS}
    />
  );
};

export default Privacy;
