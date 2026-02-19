type MonthFilterProps = {
    value: { year: number; month: number } | null;
    onChange: (value: { year: number; month: number } | null) => void;
};

export default function MonthFilter({ value, onChange }: MonthFilterProps) {
    const monthValue = value
        ? `${value.year}-${String(value.month).padStart(2, "0")}`
        : "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val) {
            const [year, month] = val.split("-").map(Number);
            onChange({ year, month });
        } else {
            onChange(null);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">期間:</label>
            <input
                type="month"
                value={monthValue}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {value && (
                <button
                    onClick={() => onChange(null)}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                    全期間
                </button>
            )}
        </div>
    );
}
