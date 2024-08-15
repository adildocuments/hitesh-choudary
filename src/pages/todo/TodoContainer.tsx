import Modal from "@/components/custom/Modal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddTodoModal, { TodoFormValues } from "./AddTodoModal";
import { axiosInstance } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

interface TodoType extends TodoFormValues {
  _id: string;
  isComplete: boolean;
  createdAt: string;
}

const TodoContainer = () => {
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
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((todo: TodoType) => {
              return (
                <TableRow key={todo._id}>
                  <TableCell className="font-medium">{todo.title}</TableCell>
                  <TableCell>{todo.description}</TableCell>
                  <TableCell className="font-medium">
                    {dayjs(todo.createdAt).format("DD MMM YYYY hh:mm A")}
                  </TableCell>
                  <TableCell>
                    {todo.isComplete ? "Completed" : "In completed"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TodoContainer;
