import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type Option = {
  name: string;
  flag?: string;
};

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  options: Option[];
  optionTitle: string;
  onChange?: (value: string) => void;
};

function Select<T extends FieldValues>({
  label,
  name,
  errors,
  register,
  options,
  onChange,
  optionTitle,
}: Props<T>) {
  const error = errors[name];

  return (
    <div className="flex flex-col gap-1 mb-6">
      <label className="text-sm font-medium mb-2">
        {label}
      </label>
      <select
        className={`
                select bg-(--color-background) h-8 w-full
                cursor-pointer transition-all duration-300 focus:outline-none 
                ${
                  error
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300"
                    : "border-(--color-text)/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                }
            `}
        {...register(name, {
          validate: (value) => value !== "0",
          onChange: (e) => onChange?.(e.target.value),
        })}
      >
        <option value="0">Select a {optionTitle}</option>
        {options
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((c) => (
            <option value={c.name} key={c.name}>
              <div className="flex gap-10 items-center">
                <img src={c.flag} className="w-7" />
                {c.name}
              </div>
            </option>
          ))}
      </select>

      {error?.type === "validate" && (
        <p className="text-xs text-red-400">{label} is required.</p>
      )}
    </div>
  );
}

export default Select;
