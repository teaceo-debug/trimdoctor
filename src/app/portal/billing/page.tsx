"use client";

const INVOICES = [
  { id: "INV-3042", date: "Mar 14, 2026", amount: 299, status: "paid", card: "•••• 4242" },
  { id: "INV-2891", date: "Feb 14, 2026", amount: 299, status: "paid", card: "•••• 4242" },
  { id: "INV-2710", date: "Jan 14, 2026", amount: 179, status: "paid", card: "•••• 4242" },
];

export default function BillingPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Billing</h1>
      <p className="text-sm text-gray-500 mb-6">Manage your subscription and payment method</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Current Plan</div>
          <div className="text-lg font-bold text-gray-900 mb-1">Semaglutide Injection</div>
          <div className="font-mono text-3xl font-bold text-brand-500">$299<span className="text-sm text-gray-400 font-normal">/month</span></div>
          <div className="text-sm text-gray-500 mt-2">Next billing: <strong>Apr 14, 2026</strong></div>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg text-gray-600 hover:border-gray-300">Change Plan</button>
            <button className="px-4 py-2 text-sm font-semibold border border-red-200 rounded-lg text-red-500 hover:border-red-300">Cancel</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Payment Method</div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-900 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
            <div>
              <div className="font-semibold text-sm">•••• •••• •••• 4242</div>
              <div className="text-xs text-gray-400">Expires 12/27</div>
            </div>
          </div>
          <button className="mt-3 px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg text-gray-600 hover:border-gray-300">Update Card</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Payment History</h3>
        <table className="w-full">
          <thead>
            <tr className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b-2 border-gray-100">
              <th className="pb-3">Invoice</th><th className="pb-3">Date</th><th className="pb-3 text-right">Amount</th><th className="pb-3">Status</th><th className="pb-3">Card</th><th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="py-3 font-mono text-sm text-blue-500">{inv.id}</td>
                <td className="py-3 text-sm">{inv.date}</td>
                <td className="py-3 text-sm text-right font-mono font-semibold">${inv.amount}.00</td>
                <td className="py-3"><span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">Paid</span></td>
                <td className="py-3 text-sm font-mono text-gray-400">{inv.card}</td>
                <td className="py-3"><button className="text-xs font-semibold text-gray-400 border border-gray-200 px-3 py-1 rounded-lg hover:text-gray-600">Receipt</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-sm text-gray-500">
          Total paid: <strong className="font-mono text-gray-900">${INVOICES.reduce((s, inv) => s + inv.amount, 0)}.00</strong>
        </div>
      </div>
    </div>
  );
}
