interface Props {
  value: string
  onChange: (val: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      className="w-full p-3 border rounded-lg mb-6"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}