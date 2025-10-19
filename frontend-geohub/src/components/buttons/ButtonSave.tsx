import SaveIcon from '../icons/SaveIcon'

function ButtonSave() {
   return (
      <button
         className="
        flex items-center gap-x-1
        text-sm font-normal
        bg-[var(--color--button--save)] text-[var(--color--text--2)]
        px-3 py-1.5 rounded-md
        cursor-pointer
        transition-transform duration-200 ease-in-out
        hover:bg-[#9a5eff]  
        active:scale-95
      "
      >
         New
         <SaveIcon size={16} color="var(--color--text--2)" />
      </button>
   )
}

export default ButtonSave
