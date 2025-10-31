import { useState } from "react"
import { ButtonEdit } from "./buttonEdit";
import { ButtonSave } from "./buttonSave";

type Props<T> = {
    data: T[];
    isEditing:boolean;
    onSave:
    onCancel:
}

export const EditableRow = ({data, isEditing, onSave, onCancel}: Props<T>) =>{

    if(!isEditing){
        return(
            <tr>
                {data.map((d) => (<td>{d}</td>))}
                <td><ButtonEdit onClick={() => onSave(data)}/></td>
            </tr>
        )
    }
}