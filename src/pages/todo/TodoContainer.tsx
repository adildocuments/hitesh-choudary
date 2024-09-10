import Modal from "@/components/custom/Modal";
import { Button } from "@/components/ui/button";
import AddTodoModal, { TodoFormValues } from "./AddTodoModal";
import dayjs from "dayjs";
import DataTable from "@/components/custom/DataTable";
import TableAction from "@/components/custom/TableAction";
import useTodoQuery from "@/query/todo/useTodoQuery";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/utils/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

//To get the todo by id function
const updateTodoStatus = (id: string) => async () => {
  const response = await axiosInstance({
    method: "patch",
    url: `/todos/toggle/status/${id}`,
  });
  return response;
};

const TodoContainer = () => {
  const { todos: data } = useTodoQuery();
  const queryClient = useQueryClient();

  // To add the todo
  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => updateTodoStatus(id)(),
  });
  const changeStatus = (id: any) => async () => {
    await mutateAsync(id);
    queryClient.invalidateQueries({ queryKey: ["getTodo"] });
  };

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
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={todo.isComplete}
              onCheckedChange={changeStatus(todo._id)}
              id="airplane-mode"
            />
            <Label htmlFor="airplane-mode">
              {todo.isComplete ? "Completed" : "Incomplete"}
            </Label>
          </div>
        );
      },
    },
    {
      label: "Action",
      render: (todo: TodoType) => {
        return <TableAction id={todo._id} />;
      },
    },
  ];

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
