export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: April 1, 2026</p>

        <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
          <p className="text-gray-600 mb-6">
            TrimDoctor, LLC (&quot;TrimDoctor,&quot; &quot;we,&quot; &quot;us&quot;) is committed to protecting your privacy. This policy describes how we collect, use, and protect your personal and health information.
          </p>

          <h2 className="font-serif text-2xl text-gray-900 mt-10 mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            <strong>Personal Information:</strong> Name, email, phone number, date of birth, mailing address, and payment information provided during registration and checkout.
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Protected Health Information (PHI):</strong> Medical history, current medications, health conditions, weight, height, BMI, and other health data submitted during your assessment and ongoing treatment.
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Usage Data:</strong> IP address, browser type, pages visited, and interactions with our platform, collected via cookies and analytics tools.
          </p>

          <h2 className="font-serif text-2xl text-gray-900 mt-10 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use your information to: facilitate medical consultations with licensed providers, process prescriptions and coordinate pharmacy fulfillment, manage billing and subscriptions, provide customer support, send transactional communications, and improve our platform.
          </p>

          <h2 className="font-serif text-2xl text-gray-900 mt-10 mb-4">Protected Health Information (PHI)</h2>
          <p className="text-gray-600 mb-4">
            Your PHI is handled in accordance with HIPAA regulations. We maintain Business Associate Agreements (BAAs) with all vendors who access PHI, including our physician network (OpenLoop Health), compounding pharmacies, cloud hosting provider (AWS), and payment processor (Stripe).
          </p>
          <p className="text-gray-600 mb-4">
            PHI is encrypted at rest (AES-256) and in transit (TLS 1.3). Access to PHI is logged in our HIPAA audit trail.
          </p>

          <h2 className="font-serif text-2xl text-gray-900 mt-10 mb-4">Your Rights</h2>
          <p className="text-gray-600 mb-4">
            You have the right to: access your health records, request corrections, request deletion of your data, opt out of marketing communications, and file a complaint with HHS if you believe your privacy rights have been violated.
          </p>

          <h2 className="font-serif text-2xl text-gray-900 mt-10 mb-4">California Residents (CCPA)</h2>
          <p className="text-gray-600 mb-4">
            If you are a California resident, you have additional rights including the right to know what personal information we collect, the right to delete, and the right to opt out of the sale of personal information. We do not sell your personal information.
          </p>

          <div className="mt-12 p-6 bg-gray-50 rounded-xl text-sm text-gray-500">
            <p><strong>Privacy Questions:</strong> privacy@trimdoctor.com</p>
            <p className="mt-2">TrimDoctor, LLC · 131 Continental Dr, Suite 305, Newark, DE 19713</p>
            <p className="mt-4 text-xs text-red-500">⚠️ This is a template. Have a licensed healthcare attorney review before publication.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
