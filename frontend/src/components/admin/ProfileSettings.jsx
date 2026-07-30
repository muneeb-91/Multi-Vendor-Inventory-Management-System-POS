import { useRef, useState } from 'react'
import { Upload, Save } from 'lucide-react';

const ProfileSettings = () => {
  const [form, setForm] = useState({
    firstName: "Super",
    lastName: "Admin",
    email: "admin@stockflow.com",
    role: "",
  });
  const fileRef = useRef();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">Profile Settings</h2>
        <p className="text-sm text-gray-500 mt-0.5">Update your administrative account details.</p>
      </div>

      <hr className="border-gray-100" />

      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0">
          <span className="text-white text-xl font-bold">SA</span>
        </div>
        <div>
          <button
            onClick={() => fileRef.current.click()}
            className="flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-primary hover:bg-gray-50 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            Change Avatar
          </button>
          <p className="text-xs text-gray-400 mt-1">JPG, GIF or PNG. Max size of 2MB.</p>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" />
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">Email Address</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">Role / Title</label>
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="System Administrator"
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
        />
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ProfileSettings