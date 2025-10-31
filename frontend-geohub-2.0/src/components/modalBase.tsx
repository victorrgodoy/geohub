type ModalProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
};

export const Modal = ({
  title,
  description,
  children,
  size = "md",
}: ModalProps) => {

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="modal modal-open">
      <div className={`modal-box ${sizeClasses[size]} bg-(--color-bg-primary)`}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-semibold text-lg text-text-primary">{title}</h3>
            {description && (
              <p className="text-sm text-(--color-text-secondary) mt-1">{description}</p>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
