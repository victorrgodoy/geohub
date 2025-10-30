type Props = {
    onClick: () => void;
}

export const ButtonCancel = ({onClick}: Props) => {
    return(
        <button
                type="button"
                onClick={onClick}
                className="
                  py-1.5 w-full rounded-sm text-xs border font-semibold
                  cursor-pointer text-(--color-text)
                  active:bg-[--color-primary]/70 active:scale-97 transition  
                  border-(--color-text)/30 shadow-xs 
                "
              >
                Cancel
              </button>
    )
}