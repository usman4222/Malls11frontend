import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../SiteComponents/ui/table";

const DataTable = ({ data, columns }) => {
  return (
    <Table>
      {/* Table Header */}
      <TableHeader>
        <TableRow>
          {/* Mapping through the columns array to generate table headers */}
          {columns.map((col) => (
            <TableHead key={col.key} className={col.className || ""}>
              {col.label} {/* Displaying column label */}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {/* Table Body */}
      <TableBody>
        {/* Mapping through the data array to generate table rows */}
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {/* Mapping through the columns array to generate table cells */}
            {columns.map((col) => (
              <TableCell key={col.key}>
                {/* If a render function is provided in the column definition, use it to render custom content.
                    Otherwise, display the value from the data row using the column key. */}
                {col.render ? col.render(row) : row[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
