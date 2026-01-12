'use client';

type Category = { name: string };

type Props = {
  categories: Category[];
  selectedCategory: string;
  onSelect: (name: string) => void;
};

export default function CategoryPills({ categories, selectedCategory, onSelect }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect(cat.name)}
          className={`px-8 py-3 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 rounded-full ${
            selectedCategory === cat.name
              ? 'bg-[#d6869d] text-white shadow-lg'
              : 'border-2 border-[#ffe9f0] text-[#d6869d] hover:border-[#d6869d] hover:bg-[#ffe9f0]'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
