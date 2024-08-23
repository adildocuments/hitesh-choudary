import Modal from "@/components/custom/Modal";
import { Button } from "@/components/ui/button";
import AddTodoModal, { TodoFormValues } from "./AddTodoModal";
import { axiosInstance } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import DataTable from "@/components/custom/DataTable";
import TableAction from "@/components/custom/TableAction";

export interface TodoType extends TodoFormValues {
  _id: string;
  isComplete: boolean;
  createdAt: string;
}

interface headerType {
  label: string;
  key?: string;
  render?: (todo: TodoType) => JSX.Element | string;
}

const TodoContainer = () => {
  const headers: headerType[] = [
    {
      label: "Title",
      key: "title",
    },
    {
      label: "Description",
      key: "description",
    },
    {
      label: "Created At",
      key: "",
      render: (todo: TodoType) => {
        return dayjs(todo.createdAt).format("YYYY-MMM-DD hh:mm A");
      },
    },
    {
      label: "Status",
      key: "",
      render: (todo: TodoType) => {
        return todo.isComplete ? "Incomplete" : "Completed";
      },
    },
    {
      label: "Action",
      render: (todo: TodoType) => {
        console.log(todo._id, "todo");
        return <TableAction id={todo._id} />;
      },
      // <div className="flex cursor-pointer">
      //   <div className="me-1">
      //     <Modal
      //       className="sm:max-w-[425px]"
      //       trigger={
      //         <Button className="ml-auto block">
      //           <Pencil />
      //         </Button>
      //       }
      //       render={(handleToggle) => {
      //         return (
      //           <AddTodoModal
      //             handleToggle={handleToggle}
      //             editId={todo._id}
      //           />
      //         );
      //       }}
      //     />
      //   </div>
      //   <div>
      //     <Modal
      //       className="sm:max-w-[425px]"
      //       trigger={
      //         <Button className="ml-auto block">
      //           <Trash2 />
      //         </Button>
      //       }
      //       render={(handleToggle) => {
      //         return (
      //           <ConfirmModal
      //             handleToggle={handleToggle}
      //             deleteId={todo._id}
      //           />
      //         );
      //       }}
      //     />
      //   </div>
      // </div>},
    },
  ];
  const getTodos = async <T extends TodoType>(): Promise<T[]> => {
    const response = await axiosInstance({
      method: "get",
      url: "/todos",
    });
    return response?.data?.data;
  };

  const { data } = useQuery({
    queryKey: ["getTodo"],
    queryFn: getTodos,
  });

  return (
    <>
      <div className="m-2">
        <h1 className="text-3xl font-bold">Todo List</h1>
      </div>
      <Modal
        className="sm:max-w-[425px]"
        trigger={<Button className="ml-auto block">Add Todo</Button>}
        render={(handleToggle) => {
          return <AddTodoModal handleToggle={handleToggle} />;
        }}
        // render={<AddTodoModal />}
      />

      <div className="p-5">
        <DataTable headers={headers} rowData={data} />
      </div>
    </>
  );
};

export default TodoContainer;
