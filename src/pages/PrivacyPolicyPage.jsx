
import React from "react";

export default function PrivaryPolicyPage() {
  return (
    <div className="bg-[#0d0d0d] pt-10 text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Privacy Policy */}
        <section className="bg-[#111] p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-primary mb-4">
            NOIRA Ltd – Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 mb-6">Effective Date: [Insert Date]</p>
          <p>
            At NOIRA Ltd, London’s leading provider of luxury mobile massage
            services, we value your privacy and are committed to GDPR-compliant
            practices. This Privacy Policy explains how we collect, use, and
            safeguard your personal data.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-1">
            <li>
              <strong className="text-primary">Information We Collect:</strong>{" "}
              Personal (Name, email, phone, booking details, billing address),
              Payment (via secure gateways), Technical (IP, cookies, site usage),
              Sensitive (health info if voluntarily provided).
            </li>
            <li>
              <strong className="text-primary">Use of Information:</strong>{" "}
              Bookings, service delivery, website performance, legal compliance.
            </li>
            <li>
              <strong className="text-primary">Data Sharing:</strong> Payment processors,
              therapists under agreements, legal authorities if required.
            </li>
            <li>
              <strong className="text-primary">Cookies & Tracking:</strong> Uses cookies + Google Analytics.
            </li>
            <li>
              <strong className="text-primary">Your Rights:</strong> Access, correct, delete, withdraw consent.
            </li>
            <li>
              <strong className="text-primary">Security:</strong> SSL, secure servers, limited access.
            </li>
            <li>
              <strong className="text-primary">Retention:</strong> Data kept only as necessary.
            </li>
            <li>
              <strong className="text-primary">Contact:</strong> NOIRA Ltd, London, info@noira.co.uk, +44 7350 700055
              .
            </li>
          </ul>
        </section>

        {/* GDPR Statement */}
        <section className="bg-[#111] p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">
            NOIRA Ltd – GDPR Data Protection Statement
          </h2>
          <p className="text-sm text-gray-400 mb-6">Effective Date: [Insert Date]</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-primary">Data Rights:</strong> Access, rectification, erasure, portability, restriction, objection.</li>
            <li><strong className="text-primary">Consent:</strong> Marketing requires explicit opt-in.</li>
            <li><strong className="text-primary">Accountability:</strong> Data protection officer contact: +44 7350 700055
            </li>
          </ul>
        </section>

        {/* Accessibility */}
        <section className="bg-[#111] p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">
            NOIRA Ltd – Accessibility & Inclusivity Statement
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-primary">Accessibility:</strong> WCAG compliance, alternative booking support.</li>
            <li><strong className="text-primary">Inclusivity:</strong> Services open to all, diverse hiring.</li>
          </ul>
        </section>

        {/* Code of Ethics */}
        <section className="bg-[#111] p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">
            NOIRA Ltd – Code of Ethics & Client Conduct
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Respect, dignity, confidentiality.</li>
            <li>Professional excellence standards.</li>
            <li>Strictly professional, non-sexual boundaries.</li>
            <li>Confidentiality: data never misused.</li>
          </ul>
        </section>

        {/* Terms & Conditions */}
        <section className="bg-[#111] p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">
            NOIRA Ltd – Terms & Conditions
          </h2>
          <p className="text-sm text-gray-400 mb-6">Effective Date: 20 sept 2025</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Bookings: via official channels, age 18+.</li>
            <li>Payments: secure gateways, due at confirmation.</li>
            <li>Cancellations & Refunds: see policies.</li>
            <li>Therapist & Client Conduct: professional only.</li>
            <li>Liability: disclose health issues.</li>
            <li>Governing Law: English law applies.</li>
          </ul>
        </section>

        {/* Cancellation Policy */}
        <section className="bg-[#111] p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">
            NOIRA Ltd – Cancellation & No-Show Policy
          </h2>
          <p className="text-sm text-gray-400 mb-6">Effective Date: 20 sept 2025</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Cancellations: Free with 2+ hours’ notice, otherwise restricted.</li>
            <li>No-Shows: Prepaid non-refundable; unpaid requires settlement.</li>
            <li>Respect: Therapists’ time is valuable.</li>
            <li>Acknowledgement: Booking = acceptance of policy.</li>
          </ul>
        </section>

        {/* Refund Policy */}
        <section className="bg-[#111] p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">
            NOIRA Ltd – Refund Policy
          </h2>
          <p className="text-sm text-gray-400 mb-6">Effective Date: 20 sept 2025</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Eligible: Full refunds for 2+ hours cancellation, 7–10 days processing.</li>
            <li>Non-Refundable: No-shows, services delivered.</li>
            <li>Method: Refunded to original payment method.</li>
            <li>Discretion: Case-by-case review possible.</li>
          </ul>
        </section>

        {/* Health & Safety */}
        <section className="bg-[#111] p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">
            NOIRA Ltd – Health & Safety Policy
          </h2>
          <p className="text-sm text-gray-400 mb-6">Effective Date: 20 sept 2025</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Therapist Standards: vetted, insured, sanitised equipment.</li>
            <li>Client Obligations: safe space, disclose health conditions.</li>
            <li>Hygiene: follows UK regs & COVID-safe protocols.</li>
            <li>Boundaries: therapeutic only, misconduct = termination.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
