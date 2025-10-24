import Tooltip from "./tooltip";

type Props = {
    title: string;          
    value: string;          
    info: string
};

function Card({ title, value, info }: Props) {
    return (
        <div className="card w-fit card-xs shadow-sm transition-colors duration-300 bg-(--color-card-bg) hover:bg-(--color-card-hover)">
            <div className="card-body p-5">
                <div className="card-actions flex justify-between">
                    <h2 className="font-normal text-sm text-(--color-text-subtitle)">{title}</h2>
                <Tooltip info={info}/>
                </div>
                <p className="font-medium text-xl">{value}</p>
            </div>
        </div>
    );
}

export default Card;