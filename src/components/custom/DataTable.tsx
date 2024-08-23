import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TodoType } from "@/pages/todo/TodoContainer";

type headerType = {
  label: string;
  key?: keyof TodoType;
  render: (todo: TodoType) => JSX.Element;
};

interface dataTableType {
  headers?: headerType[];
  rowData?: TodoType[];
}

const DataTable = ({ headers, rowData }: dataTableType) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {headers?.map((head: headerType, index: number) => {
              return <TableHead key={index}>{head.label}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rowData?.map((row) => {
            return (
              <TableRow key={row._id}>
                {headers?.map((head: headerType, index) => {
                  let rowKey = head.key;
                  return (
                    <TableCell key={index} className="font-medium">
                      {rowKey ? row[rowKey] : head.render(row)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
