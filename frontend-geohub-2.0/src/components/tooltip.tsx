import { Info } from 'lucide-react';

type Props = {
    info:string
}

function Tooltip({info}: Props) {

    return(
        <div className="tooltip" data-tip={info}>
            {<Info size={15} className='cursor-pointer text-(--color-primary)'/>}
        </div>
    )
}

export default Tooltip;