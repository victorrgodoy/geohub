import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  type: React.HTMLInputTypeAttribute | undefined;
  label: string;
  value?: string | number | readonly string[] | undefined;
  name: Path<T>;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  disable?: boolean;
};

function Input<T extends FieldValues>({
  type,
  label,
  name,
  errors,
  register,
  value,
  disable,
}: Props<T>) {
  const error = errors[name];

  return (
    <div className="flex flex-col gap-1 mb-6">
      <label className="text-sm font-medium text-(--color-text)/90 mb-2">
        {label}
      </label>
      <input
        disabled={disable}
        value={value}
        type={type}
        placeholder={label}
        className={`
                  border h-8 w-full p-3 text-sm rounded-md 
                  placeholder-gray-400 
                  transition-all duration-300 focus:outline-none 
                  ${
                    error
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300"
                      : "border-(--color-text)/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                  }
                `}
        {...register(name, { required: true })}
      />

      {error?.type === "required" && (
        <p className="text-xs text-red-400">{label} is required.</p>
      )}
    </div>
  );
}

export default Input;
