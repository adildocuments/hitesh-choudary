import DataTable from "@/components/custom/DataTable";
import Modal from "@/components/custom/Modal";
import TableAction from "@/components/custom/TableAction";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import AddTodoModal from "../todo/AddTodoModal";
import AddCateogryModal from "./AddCateogryModal";

interface HeaderType {
  label: string;
  key?: string;
  render?: () => JSX.Element;
}

interface CategoryType {
  _id: string;
  name: string;
  createdAt: string;
}

const getCategory = async <T extends CategoryType>(): Promise<T[]> => {
  const response = await axiosInstance({
    method: "get",
    url: "/ecommerce/categories",
  });
  return response?.data?.data;
};

// console.log(data, "data");

const CategoryContainer = () => {
  const { data } = useQuery({
    queryKey: ["getCateogry"],
    queryFn: getCategory,
  });
  console.log(data, "categories");

  const headers: HeaderType[] = [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Action",
      key: "",
      render: (cateogry: CategoryType) => {
        return <TableAction id={cateogry._id} />;
      },
    },
  ];
  return (
    <>
      <div className="m-2">
        <h1 className="text-3xl font-bold">Category List</h1>
      </div>
      <Modal
        className="sm:max-w-[425px]"
        trigger={<Button className="ml-auto block">Add Category</Button>}
        render={(handleToggle) => {
          return <AddCateogryModal handleToggle={handleToggle} />;
        }}
        // render={<AddTodoModal />}
      />

      <div className="p-5">
        {/* <DataTable headers={headers} rowData={data || []} /> */}
      </div>
    </>
  );
};

export default CategoryContainer;
