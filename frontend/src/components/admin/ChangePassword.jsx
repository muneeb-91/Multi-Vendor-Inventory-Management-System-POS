import { useState } from 'react'
import { Save } from 'lucide-react';
import PasswordField from './PasswordField';

const ChangePassword = () => {
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });

  const toggle = (field) => setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const strength = (() => {
    const p = form.newPass;
    if (!p) return null;
    if (p.length < 6) return { label: "Weak", color: "bg-red-400", width: "w-1/4" };
    if (p.length < 10) return { label: "Fair", color: "bg-amber-400", width: "w-2/4" };
    if (/[A-Z]/.test(p) && /[0-9]/.test(p) && /[^a-zA-Z0-9]/.test(p))
      return { label: "Strong", color: "bg-secondary", width: "w-full" };
    return { label: "Good", color: "bg-blue-400", width: "w-3/4" };
  })();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">Change Password</h2>
        <p className="text-sm text-gray-500 mt-0.5">Update your login credentials securely.</p>
      </div>

      <hr className="border-gray-100" />

      <PasswordField label="Current Password" name="current" showKey="current" show={show} form={form} toggle={toggle} handleChange={handleChange} />
      <PasswordField label="New Password" name="newPass" showKey="newPass" show={show} form={form} toggle={toggle} handleChange={handleChange}/>

      {/* Strength meter */}
      {strength && (
        <div className="space-y-1.5">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
          </div>
          <p className={`text-xs font-medium ${strength.color.replace("bg-", "text-")}`}>
            {strength.label}
          </p>
        </div>
      )}

      <PasswordField label="Confirm New Password" name="confirm" showKey="confirm" show={show} form={form} toggle={toggle} handleChange={handleChange}/>

      {form.confirm && form.newPass !== form.confirm && (
        <p className="text-xs text-red-500">Passwords do not match.</p>
      )}

      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors">
          <Save className="w-4 h-4" />
          Update Password
        </button>
      </div>
    </div>
  );
}

export default ChangePassword