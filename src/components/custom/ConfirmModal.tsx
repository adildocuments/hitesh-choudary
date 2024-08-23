import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { axiosInstance } from "@/utils/config";
import { toast } from "sonner";

interface ConfirmModalProps {
  handleToggle: () => void;
  deleteId?: string;
}

const deleteTodo = async (id: string) => {
  const response = await axiosInstance({
    method: "delete",
    url: `/todos/${id}`,
  });
  console.log(response, "resposse update");
  return response;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  handleToggle,
  deleteId,
}) => {
  const queryClient = useQueryClient();
  const handleDelete = async (deleteId: string) => {
    try {
      const response = await mutateAsync(deleteId); // Pass the id to mutateAsync
      console.log("Todo deleted successfully:", response);
      toast.success(response?.data?.message);
      handleToggle();
      queryClient.invalidateQueries({ queryKey: ["getTodo"] });
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };
  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    // mutationFn: deleteTodo(id),
  });
  return (
    <>
      <h1 className="text-center text-4xl mb-3">
        Are sure you want to delete this item?
      </h1>

      <div className="flex justify-end">
        {handleToggle && (
          <Button onClick={handleToggle} variant={"outline"} className="mx-2">
            Cancel
          </Button>
        )}
        <Button
          onClick={() => handleDelete(deleteId!)}
          variant={"outline"}
          className="mx-2"
        >
          Delete
        </Button>
      </div>
    </>
  );
};

export default ConfirmModal;
