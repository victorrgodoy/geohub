// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Continent } from "../api/continent";

type Props = {
  onClose: () => void;
}

function Modal({onClose}: Props) {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data: Continent) => {console.log(data)};

  return (
    <>
        <div className="modal modal-open">
          <div className="modal-box w-fit bg-(--color-background)">

            {/* forms */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Name</label>
              <input type="text" {...register("name")} placeholder="Name" required />

              <label>Description</label>
              <input type="text" {...register("description")} placeholder="Description" required />

              <button type="submit">Save</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </form>
          </div>
        </div>
    </>
  );
}

export default Modal;