import InputController from "@/components/custom/InputCotroller";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "@/schema/todoSchema";
import { InferType } from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import useTodoQuery from "@/query/todo/useTodoQuery";

interface AddTodoModalProps {
  handleToggle: () => void;
  editId?: string;
}

export type TodoFormValues = InferType<typeof todoSchema>;

const initialValue = {
  title: "",
  description: "",
};

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  handleToggle,
  editId,
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync, data } = useTodoQuery(editId!);

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
