export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by name, company, or email..."
      value={value}
      onChange={onChange}
      className="w-full border p-2 rounded-lg"
    />
  );
}