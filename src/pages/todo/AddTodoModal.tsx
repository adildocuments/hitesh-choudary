import InputController from "@/components/custom/InputCotroller";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "@/schema/todoSchema";
import { InferType } from "yup";
import { axiosInstance } from "@/utils/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AddTodoModalProps {
  handleToggle: () => void;
}

export type TodoFormValues = InferType<typeof todoSchema>;

const initialValue = {
  title: "",
  description: "",
};

const addTodo = async (payload: TodoFormValues) => {
  const response = await axiosInstance({
    method: "post",
    url: "/todos",
    data: payload,
  });
  return response?.data;
};

const AddTodoModal: React.FC<AddTodoModalProps> = ({ handleToggle }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: addTodo,
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(todoSchema),
  });

  const onSubmit = async (data: TodoFormValues) => {
    const res = await mutateAsync(data);
    toast.success(res?.message);
    queryClient.invalidateQueries(["getTodo"]);
    reset();
    handleToggle();
  };
  return (
    <>
      <h1 className="text-center text-4xl mb-3">Add Todo</h1>
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
        <Button onClick={handleSubmit(onSubmit)}>Add</Button>
      </div>
    </>
  );
};

export default AddTodoModal;
