import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type HeaderPropsType<T> = {
  label: string;
  key?: keyof T; // Key that corresponds to the row data type
  render?: (item: T) => JSX.Element | string; // Optional render function for custom rendering
};

interface HasId {
  _id: string;
}
// Define the DataTable component to accept generic types
interface DataTableProps<T extends HasId> {
  headers: HeaderPropsType<T>[]; // Headers of type T
  rowData: T[]; // Row data of type T
}

const DataTable = <T extends HasId>({
  headers,
  rowData,
}: DataTableProps<T>) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {headers?.map((head, index) => {
              return <TableHead key={index}>{head.label}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rowData?.map((row) => {
            return (
              <TableRow key={row._id}>
                {headers?.map((head, index) => {
                  let rowKey = head.key;
                  return (
                    <TableCell key={index} className="font-medium">
                      {rowKey
                        ? (row[rowKey as keyof T] as unknown as React.ReactNode)
                        : head.render?.(row)}
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
