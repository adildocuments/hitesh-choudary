import InputController from "@/components/custom/InputCotroller";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/utils/config";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const initialValue = {
  name: "",
};

const addCategory = async (payload: any) => {
  const res = await axiosInstance({
    method: "post",
    url: "/ecommerce/categories",
    data: payload,
  });
  return res;
};

const AddCateogryModal = ({ handleToggle }: any) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialValue,
  });

  const { mutateAsync } = useMutation({
    mutationFn: addCategory,
  });

  const onSubmit = async (data: any) => {
    console.log(data, "data");
    const response = await mutateAsync(data);
    reset();
    handleToggle();
  };
  return (
    <>
      <InputController
        placeholder="Name"
        label="Name"
        type="text"
        name="name"
        control={control}
        // error={errors?.title?.message}
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmit(onSubmit)}>Add</Button>
      </div>
    </>
  );
};

export default AddCateogryModal;
