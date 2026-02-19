type StatCardProps = {
    icon: string;
    label: string;
    value: string;
    color?: "purple" | "green" | "orange" | "blue";
};

const colorMap = {
    purple: "bg-primary-100 text-primary-600",
    green: "bg-emerald-100 text-emerald-600",
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-sky-100 text-sky-600",
};

export default function StatCard({
    icon,
    label,
    value,
    color = "purple",
}: StatCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${colorMap[color]}`}
            >
                {icon}
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
            </div>
        </div>
    );
}
