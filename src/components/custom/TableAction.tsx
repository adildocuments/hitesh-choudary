import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import Modal from "./Modal";
import AddTodoModal from "@/pages/todo/AddTodoModal";
import ConfirmModal from "./ConfirmModal";

const TableAction = ({ id }: { id: string }) => {
  return (
    <>
      <div className="flex cursor-pointer">
        <div className="me-1">
          <Modal
            className="sm:max-w-[425px]"
            trigger={
              <Button className="ml-auto block">
                <Pencil />
              </Button>
            }
            render={(handleToggle) => {
              return <AddTodoModal handleToggle={handleToggle} editId={id} />;
            }}
          />
        </div>
        <div>
          <Modal
            className="sm:max-w-[425px]"
            trigger={
              <Button className="ml-auto block">
                <Trash2 />
              </Button>
            }
            render={(handleToggle) => {
              return <ConfirmModal handleToggle={handleToggle} deleteId={id} />;
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TableAction;
