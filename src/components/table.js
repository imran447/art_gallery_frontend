import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import createCache from "@emotion/cache";
import { useState } from "react";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const Table = ({ title, tableData, columns,pagination = true }) => {
  const [responsive, setResponsive] = useState("standard");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);
  const options = {
    selectableRowsHideCheckboxes: true,
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    pagination: pagination,
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
  };

 
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={title}
          data={tableData}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
  );
};
export default Table;
