import { TodoFormValues } from "@/pages/todo/AddTodoModal";
import { TodoType } from "@/pages/todo/TodoContainer";
import { axiosInstance } from "@/utils/config";
import { useMutation, useQuery } from "@tanstack/react-query";

const useAddTodoQuery = (editId?: string) => {
  //Function to add or update the todo
  const addTodo = (editId: string) => async (payload: TodoFormValues) => {
    const response = await axiosInstance({
      method: editId ? "patch" : "post",
      url: editId ? `/todos/${editId}` : "/todos",
      data: payload,
    });
    return response?.data;
  };

  //To get the todo by id function
  const getTodoById = (editId: string) => async () => {
    const response = await axiosInstance({
      method: "get",
      url: `/todos/${editId}`,
    });
    return response?.data?.data;
  };

  //To get the all todos
  const getTodos = async <T extends TodoType>(): Promise<T[]> => {
    const response = await axiosInstance({
      method: "get",
      url: "/todos",
    });
    console.log(response, "response");
    return response?.data?.data;
  };

  const { data: todos } = useQuery({
    queryKey: ["getTodo"],
    queryFn: getTodos,
  });

  // To get the todo by id query
  const { data } = useQuery({
    queryKey: ["getTodo", editId],
    queryFn: getTodoById(editId!),
    enabled: !!editId,
  });

  // To add the todo
  const mutation = useMutation({
    mutationFn: addTodo(editId!),
  });
  return { ...mutation, data, todos };
};

export default useAddTodoQuery;
