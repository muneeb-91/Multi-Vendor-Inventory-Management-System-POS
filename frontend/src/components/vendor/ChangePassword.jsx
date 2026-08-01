import React from 'react'

const ChangePassword = () => {
  const [form, setForm]   = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow]   = useState({ current: false, newPass: false, confirm: false });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const toggleShow   = (k)  => setShow((p) => ({ ...p, [k]: !p[k] }));

  const strength = (() => {
    const p = form.newPass;
    if (!p) return null;
    if (p.length < 6) return { label: "Weak",   color: "bg-red-400",    text: "text-red-500",    w: "w-1/4" };
    if (p.length < 10) return { label: "Fair",  color: "bg-amber-400",  text: "text-amber-500",  w: "w-2/4" };
    if (/[A-Z]/.test(p) && /[0-9]/.test(p) && /[^a-zA-Z0-9]/.test(p))
      return { label: "Strong", color: "bg-secondary", text: "text-secondary", w: "w-full" };
    return { label: "Good", color: "bg-blue-400", text: "text-blue-500", w: "w-3/4" };
  })();

  const PasswordField = ({ label, name, hint }) => (
    <div>
      <label className="block text-sm font-medium text-primary mb-1.5">{label}</label>
      <div className="relative">
        <input
          name={name}
          type={show[name] ? "text" : "password"}
          value={form[name]}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
        />
        <button
          onClick={() => toggleShow(name)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          {show[name] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">Change Password</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>
      <hr className="border-gray-100" />

      <div className="space-y-4 max-w-md">
        <PasswordField label="Current Password" name="current" />
        <PasswordField
          label="New Password"
          name="newPass"
          hint="Minimum 8 characters, including letters and numbers."
        />

        {strength && (
          <div className="space-y-1">
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.w}`} />
            </div>
            <p className={`text-xs font-medium ${strength.text}`}>{strength.label}</p>
          </div>
        )}

        <PasswordField label="Confirm New Password" name="confirm" />
        {form.confirm && form.newPass !== form.confirm && (
          <p className="text-xs text-red-500 -mt-2">Passwords do not match.</p>
        )}
      </div>

      <hr className="border-gray-100" />
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold cursor-pointer transition-colors">
          <Save className="w-4 h-4" /> Update Password
        </button>
      </div>
    </div>
  );
}

export default ChangePassword