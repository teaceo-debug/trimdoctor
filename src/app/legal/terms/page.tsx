export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: April 1, 2026</p>

        <div className="prose prose-gray max-w-none text-[15px] leading-relaxed">
          <p className="text-gray-600 mb-6">
            This User Agreement (collectively with TrimDoctor&apos;s Privacy Policy) applies to your use of all sites and services offered by TrimDoctor, LLC (&quot;TrimDoctor,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;), a Delaware limited liability company located at 131 Continental Dr, Suite 305, Newark, DE 19713.
          </p>

          <h2 className="font-serif text-2xl text-gray-900 mt-10 mb-4">I. Platform Services vs. Healthcare Services</h2>
          <p className="text-gray-600 mb-4">
            TrimDoctor provides a technology platform that facilitates access to telehealth services. <strong>TrimDoctor does not provide medical care and is not licensed to practice medicine.</strong> Medical evaluations, prescriptions, and treatment decisions are made solely by independently licensed healthcare providers contracted through our partner network.
          </p>
          <p className="text-gray-600 mb-4">
            TrimDoctor&apos;s role is limited to: operating the digital platform, patient intake coordination, administrative support, customer service, billing and payment processing, and communication facilitation between patients and providers.
          </p>

          <h2 className="font-serif text-2xl text-gray-900 mt-10 mb-4">II. Eligibility</h2>
          <p className="text-gray-600 mb-4">To use our Services, you must: be at least 18 years of age, reside in the United States in a state where Services are available, and agree to be legally bound by these Terms.</p>

          <h2 className="font-serif text-2xl text-gray-900 mt-10 mb-4">III. Billing & Subscriptions</h2>
          <p className="text-gray-600 mb-4">
            By subscribing to a TrimDoctor plan, you authorize us to charge your payment method on a recurring monthly basis. Your first month may be charged at a promotional rate. Subsequent months will be charged at the standard plan rate. You may cancel at any time through your patient portal.
          </p>

          <h2 className="font-serif text-2xl text-gray-900 mt-10 mb-4">IV. Compounded Medications</h2>
          <p className="text-gray-600 mb-4">
            Medications dispensed through TrimDoctor are compounded by FDA-regulated compounding pharmacies. While produced in regulated facilities, compounded medications are not FDA-approved as finished products. The decision to prescribe compounded medications is made by your licensed provider based on medical judgment.
          </p>

          <h2 className="font-serif text-2xl text-gray-900 mt-10 mb-4">V. Mandatory Arbitration</h2>
          <p className="text-gray-600 mb-4">
            Any dispute arising from these Terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You agree to waive your right to a jury trial and to participate in any class action lawsuit.
          </p>

          <div className="mt-12 p-6 bg-gray-50 rounded-xl text-sm text-gray-500">
            <p><strong>Contact:</strong> help@trimdoctor.com | (323) 690-1564</p>
            <p className="mt-2">TrimDoctor, LLC · 131 Continental Dr, Suite 305, Newark, DE 19713</p>
            <p className="mt-4 text-xs text-red-500">⚠️ This is a template. Have a licensed healthcare attorney review before publication.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
