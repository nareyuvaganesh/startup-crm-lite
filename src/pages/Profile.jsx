import { useRef, useState } from "react";
import {
  Building2,
  CalendarDays,
  Check,
  LoaderCircle,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { useProfile } from "../context/ProfileContext";

const fields = [
  {
    name: "firstName",
    label: "First name",
    placeholder: "First name",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Last name",
    placeholder: "Last name",
    autoComplete: "family-name",
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "you@company.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "Phone number",
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "company",
    label: "Company",
    placeholder: "Company name",
    autoComplete: "organization",
  },
  {
    name: "role",
    label: "Job title",
    placeholder: "Your role",
    autoComplete: "organization-title",
  },
  {
    name: "location",
    label: "Location",
    placeholder: "City, country",
    autoComplete: "address-level2",
  },
  {
    name: "department",
    label: "Department",
    placeholder: "Department",
    autoComplete: "organization",
  },
];

const displayValue = (value, fallback = "Not provided") =>
  value?.trim() || fallback;

export default function Profile() {
  const { profile, setProfile } = useProfile();
  const [formState, setFormState] = useState(profile);
  const [isSaving, setIsSaving] = useState(false);
  const firstNameInputRef = useRef(null);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();

    if (!formState.firstName.trim() || !formState.lastName.trim()) {
      toast.error("First name and last name cannot be empty.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const phoneDigits = formState.phone.replace(/\D/g, "");
    if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      toast.error("Please enter a valid phone number (8-15 digits).");
      return;
    }

    setIsSaving(true);
    window.setTimeout(() => {
      setProfile({ ...formState });
      setIsSaving(false);
      toast.success("Profile updated successfully.");
    }, 500);
  };

  const handleCancel = () => {
    setFormState(profile);
    toast.success("Changes discarded.");
  };

  const fullName =
    [formState.firstName, formState.lastName].filter(Boolean).join(" ") ||
    "Your profile";
  const initials =
    [formState.firstName, formState.lastName]
      .filter(Boolean)
      .map((name) => name.trim().charAt(0))
      .join("")
      .toUpperCase() || "?";

  const profileDetails = [
    [Mail, "Email", formState.email],
    [Phone, "Phone", formState.phone],
    [MapPin, "Location", formState.location],
    [CalendarDays, "Joined", formState.joinedDate],
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 pb-2 sm:space-y-6 md:pb-0">
      <header className="px-1 sm:px-0">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-3xl">
          My Profile
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
          Manage the personal details shown across your CRM workspace.
        </p>
      </header>

      <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.7fr)] lg:gap-6">
        <section className="group min-w-0 overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-900/10 dark:border-gray-700/70 dark:bg-gray-800 dark:shadow-black/10 dark:hover:shadow-black/20 lg:sticky lg:top-22">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 px-5 pb-16 pt-5 sm:px-6">
            <div className="absolute -right-16 -top-16 size-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-12 size-44 rounded-full bg-cyan-300/15 blur-3xl" />
            <div className="relative flex items-center justify-between">
              <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-white/15 px-3 text-[11px] font-bold text-white ring-1 ring-white/20 backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(110,231,183,0.18)]" />
                Active account
              </span>
              <ShieldCheck className="size-5 text-white/75" aria-hidden="true" />
            </div>
          </div>

          <div className="-mt-12 px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="relative z-10 flex min-w-0 items-end gap-4">
              <div className="relative grid size-24 shrink-0 place-items-center rounded-2xl border-4 border-white bg-gradient-to-br from-blue-50 to-indigo-100 text-3xl font-black text-blue-700 shadow-lg shadow-slate-900/15 dark:border-gray-800 dark:from-gray-700 dark:to-gray-700/80 dark:text-blue-300">
                {initials}
                <span
                  className="absolute -bottom-1 -right-1 size-4 rounded-full border-[3px] border-white bg-emerald-500 dark:border-gray-800"
                  title="Online"
                />
                <button
                  type="button"
                  onClick={() => firstNameInputRef.current?.focus()}
                  aria-label="Edit profile details"
                  className="absolute -right-2 -top-2 grid size-9 place-items-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:scale-105 hover:bg-gray-50 hover:text-blue-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-blue-300"
                >
                  <Pencil className="size-3.5" />
                </button>
              </div>

              <div className="min-w-0 pb-1.5">
                <h2 className="truncate text-xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-2xl">
                  {fullName}
                </h2>
                <p className="mt-1 truncate text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {displayValue(formState.role, "Add your job title")}
                </p>
              </div>
            </div>

            <div className="mt-6 flex min-w-0 items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/80 px-3.5 py-3 text-sm text-gray-600 dark:border-gray-700/70 dark:bg-gray-900/40 dark:text-gray-300">
              <Building2 className="size-4 shrink-0 text-blue-500 dark:text-blue-400" />
              <span className="truncate">
                {displayValue(formState.department, "Department")}
                {formState.company ? ` · ${formState.company}` : ""}
              </span>
            </div>

            <dl className="mt-6 space-y-4">
              {profileDetails.map(([Icon, label, value]) => (
                <div key={label} className="flex min-w-0 items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gray-100 text-gray-500 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-gray-700/70 dark:text-gray-300 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-300">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 pt-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                      {label}
                    </dt>
                    <dd className="mt-0.5 break-words text-sm font-medium text-gray-700 dark:text-gray-200">
                      {displayValue(value)}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="min-w-0 rounded-2xl border border-gray-200/70 bg-white p-5 shadow-sm shadow-slate-900/5 transition-shadow duration-300 hover:shadow-md hover:shadow-slate-900/10 dark:border-gray-700/70 dark:bg-gray-800 dark:shadow-black/10 dark:hover:shadow-black/20 sm:p-6 lg:p-7">
          <div className="flex items-start gap-3 border-b border-gray-100 pb-5 dark:border-gray-700/80">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <UserRound className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-extrabold text-gray-950 dark:text-white">
                Personal information
              </h2>
              <p className="mt-1 text-sm leading-5 text-gray-500 dark:text-gray-400">
                Update the profile details used throughout your workspace.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveChanges} className="mt-6 space-y-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-5">
              {fields.map((field, index) => (
                <label key={field.name} className="block min-w-0">
                  <span className="mb-2 block text-[13px] font-bold text-gray-700 dark:text-gray-300">
                    {field.label}
                  </span>
                  <input
                    ref={index === 0 ? firstNameInputRef : undefined}
                    type={field.type || "text"}
                    name={field.name}
                    value={formState[field.name] || ""}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    className="min-h-12 w-full rounded-xl border border-gray-200 bg-gray-50/70 px-3.5 py-3 text-base font-medium text-gray-950 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900/40 dark:text-white dark:placeholder:text-gray-500 dark:hover:border-gray-600 dark:hover:bg-gray-900/60 dark:focus:border-blue-400 dark:focus:bg-gray-900 dark:focus:ring-blue-400/10 sm:text-sm"
                  />
                </label>
              ))}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 dark:border-gray-700/80 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="min-h-11 w-full rounded-xl border border-gray-200 bg-white px-5 text-sm font-bold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-700 sm:w-auto"
              >
                Discard changes
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-sm shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/25 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:cursor-wait disabled:translate-y-0 disabled:opacity-75 sm:w-auto"
              >
                {isSaving ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Check className="size-4" />
                )}
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
