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

interface HeaderType {
  label: string;
  key?: keyof TodoType;
  render?: (todo: TodoType) => JSX.Element | string;
}

const TodoContainer = () => {
  const headers: HeaderType[] = [
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
      render: (todo: TodoType) => {
        return dayjs(todo.createdAt).format("YYYY-MMM-DD hh:mm A");
      },
    },
    {
      label: "Status",
      render: (todo: TodoType) => {
        return todo.isComplete ? "Incomplete" : "Completed";
      },
    },
    {
      label: "Action",
      render: (todo: TodoType) => {
        return <TableAction id={todo._id} />;
      },
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
        <DataTable<TodoType> headers={headers} rowData={data || []} />
      </div>
    </>
  );
};

export default TodoContainer;
