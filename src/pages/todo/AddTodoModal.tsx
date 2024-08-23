import InputController from "@/components/custom/InputCotroller";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "@/schema/todoSchema";
import { InferType } from "yup";
import { axiosInstance } from "@/utils/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";

interface AddTodoModalProps {
  handleToggle: () => void;
  editId?: string;
}

export type TodoFormValues = InferType<typeof todoSchema>;

const initialValue = {
  title: "",
  description: "",
};

const addTodo = (editId: string) => async (payload: TodoFormValues) => {
  const response = await axiosInstance({
    method: editId ? "patch" : "post",
    url: editId ? `/todos/${editId}` : "/todos",
    data: payload,
  });
  console.log(response, "resposse update");
  return response?.data;
};

const getTodoById = (editId: string) => async () => {
  const response = await axiosInstance({
    method: "get",
    url: `/todos/${editId}`,
  });
  return response?.data?.data;
};

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  handleToggle,
  editId,
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: addTodo(editId!),
  });

  const { data } = useQuery({
    queryKey: ["getTodo", editId],
    queryFn: getTodoById(editId!),
    enabled: !!editId,
  });
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(todoSchema),
  });

  useEffect(() => {
    if (data) {
      setValue("title", data?.title);
      setValue("description", data?.description);
    }
  }, [data]);
  // }, [data, editId]);

  const onSubmit = async (data: TodoFormValues) => {
    const res = await mutateAsync(data);
    toast.success(res?.message);
    queryClient.invalidateQueries({ queryKey: ["getTodo"] });
    reset();
    handleToggle();
  };
  return (
    <>
      <h1 className="text-center text-4xl mb-3">
        {editId ? "Edit Todo" : "Add Todo"}
      </h1>
      <InputController
        placeholder="Title"
        label="Title"
        type="text"
        name="title"
        control={control}
        error={errors?.title?.message}
      />

      <InputController
        placeholder="Description"
        label="Description"
        type="text"
        name="description"
        control={control}
        error={errors?.description?.message}
      />
      <div className="flex justify-end">
        {handleToggle && (
          <Button onClick={handleToggle} variant={"outline"} className="mx-2">
            Cancel
          </Button>
        )}
        <Button onClick={handleSubmit(onSubmit)}>
          {editId ? "Update" : "Add"}
        </Button>
      </div>
    </>
  );
};

export default AddTodoModal;
