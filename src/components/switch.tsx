type Props = {
  value: boolean;
  onToggle(): void;
};

export function Switch({ value, onToggle }: Props) {
  return (
    <div className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={value}
        onChange={() => {
          onToggle();
        }}
      />
      <div
        className="w-6 h-3 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-500 rounded-full peer dark:bg-gray-600 
              peer-checked:bg-brand-600 transition-colors duration-200"
      ></div>
      <div className="absolute left-0 top-0 bg-white w-3 h-3 rounded-full transition-transform duration-200 peer-checked:translate-x-3 shadow"></div>
    </div>
  );
}
