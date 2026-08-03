import { Link } from "react-router-dom";
import { ArrowLeft, Printer, Download, CheckCircle } from "lucide-react";
import { receipt } from '../../data';

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (n) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const subtotal  = receipt.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
const tax       = subtotal * receipt.taxRate;
const grandTotal = subtotal + receipt.shipping + tax;

// ── Component ─────────────────────────────────────────────────────────────────
const OrderReceipt = () => {
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-tertiary">

      {/* ── Top action bar (hidden on print) ── */}
      <div className="print:hidden bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between sticky top-0 z-10">
        <Link
          to="/vendor/orders"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
          <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* ── Receipt paper ── */}
      <div className="py-10 px-4 flex justify-center">
        <div
          id="receipt"
          className="bg-white w-full max-w-2xl rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:shadow-none print:border-none print:rounded-none"
        >
          {/* Green top accent */}
          <div className="h-1.5 bg-secondary w-full" />

          <div className="px-10 py-8 space-y-8">

            {/* ── Header: logo + RECEIPT ── */}
            <div className="flex items-start justify-between">
              {/* Brand */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                    <rect x="2" y="3" width="20" height="5" rx="1"/>
                    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>
                    <path d="M10 12h4"/>
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-bold text-primary leading-tight">StockFlow</p>
                  <p className="text-xs text-gray-400">Enterprise ERP</p>
                  <div className="mt-3 space-y-0.5 text-xs text-gray-500 leading-relaxed">
                    <p>1234 Supply Chain Blvd, Suite 500</p>
                    <p>Logistics City, LC 90210</p>
                    <p>contact@stockflow.erp | (555) 019-2834</p>
                  </div>
                </div>
              </div>

              {/* RECEIPT + status */}
              <div className="text-right">
                <h1 className="text-4xl font-black text-primary tracking-tight">RECEIPT</h1>
                <div className="flex items-center justify-end gap-1.5 mt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-secondary/30 bg-green-50 text-secondary text-xs font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" /> PAID IN FULL
                  </span>
                </div>
                <div className="mt-4 space-y-1 text-xs text-gray-500">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-gray-400">Invoice No</span>
                    <span className="font-mono font-semibold text-primary">{receipt.invoiceNumber}</span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-gray-400">Date Issued</span>
                    <span className="font-medium text-primary">{receipt.dateIssued}</span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-gray-400">Payment</span>
                    <span className="text-primary">{receipt.paymentMethod}</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* ── Billed To / Shipped To ── */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Billed To
                </p>
                <p className="font-bold text-primary text-sm">{receipt.billedTo.company}</p>
                <div className="mt-1.5 space-y-0.5 text-xs text-gray-500 leading-relaxed">
                  <p>{receipt.billedTo.contact}</p>
                  <p>{receipt.billedTo.address}</p>
                  <p>{receipt.billedTo.city}</p>
                  <p>{receipt.billedTo.email}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Shipped To
                </p>
                <p className="font-bold text-primary text-sm">{receipt.shippedTo.company}</p>
                <div className="mt-1.5 space-y-0.5 text-xs text-gray-500 leading-relaxed">
                  <p>{receipt.shippedTo.attn}</p>
                  <p>{receipt.shippedTo.address}</p>
                  <p>{receipt.shippedTo.city}</p>
                </div>
              </div>
            </div>

            {/* ── Line items table ── */}
            <div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-400 pb-3 uppercase tracking-wide">
                      Item Description
                    </th>
                    <th className="text-right text-xs font-semibold text-gray-400 pb-3 uppercase tracking-wide">
                      SKU
                    </th>
                    <th className="text-right text-xs font-semibold text-gray-400 pb-3 uppercase tracking-wide">
                      Qty
                    </th>
                    <th className="text-right text-xs font-semibold text-gray-400 pb-3 uppercase tracking-wide">
                      Unit Price
                    </th>
                    <th className="text-right text-xs font-semibold text-gray-400 pb-3 uppercase tracking-wide">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {receipt.items.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 last:border-0"
                    >
                      <td className="py-4 pr-4 text-primary font-medium">{item.description}</td>
                      <td className="py-4 text-right font-mono text-xs text-gray-400">{item.sku}</td>
                      <td className="py-4 text-right text-gray-600">{item.qty}</td>
                      <td className="py-4 text-right text-gray-600">{fmt(item.unitPrice)}</td>
                      <td className="py-4 text-right font-semibold text-primary">{fmt(item.qty * item.unitPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Totals ── */}
            <div className="flex justify-end">
              <div className="w-full max-w-xs space-y-2.5">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping (Freight)</span>
                  <span>{fmt(receipt.shipping)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax (8.5%)</span>
                  <span>{fmt(tax)}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between text-base font-bold text-primary pt-1">
                  <span>Grand Total</span>
                  <span className="text-lg">{fmt(grandTotal)}</span>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* ── Footer ── */}
            <div className="text-center space-y-1.5">
              <p className="text-xs text-gray-500">
                Thank you for your business. For any questions regarding this invoice, please contact{" "}
                <span className="text-secondary">support@stockflow.erp</span>.
              </p>
              <p className="text-[10px] font-semibold tracking-widest text-gray-300 uppercase">
                StockFlow Systems Inc.
              </p>
            </div>

          </div>

          {/* Green bottom accent */}
          <div className="h-1.5 bg-secondary w-full" />
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
