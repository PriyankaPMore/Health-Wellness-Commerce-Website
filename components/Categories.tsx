interface Props {
  categories: string[]
  selected: string
  onSelect: (cat: string) => void
}

export default function Categories({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex gap-3 mb-6 flex-wrap text-gray-700">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-lg ${
            selected === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}