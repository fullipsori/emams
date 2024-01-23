import GridDropdown from "@/app/components/Dropdown/gridDropdown/gridDropdown";
import GridStatusDropdown from "@/app/components/Dropdown/gridDropdown/gridStatusDropdown";
import AgGrid from "@/app/components/grid/agGrid/agGrid1";
import AgGrid2 from "@/app/components/grid/agGrid/agGrid2";
import Tabulator1 from "@/app/components/grid/tabulator/tabulator1";
import {
  columns,
  data,
  statusData,
  topColumns,
  topData1,
  topData2,
  topData3,
} from "@/data/gridData";

const Grid = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lime-100">
      {/* ----- React Tabulator ----- */}
      <div style={{ fontSize: 30, fontWeight: 700 }} className="mb-10 mt-20">
        React Tabulator
      </div>
      <div className="flex flex-row">
        <div>
          <GridDropdown
            title={"10mins LowMessage In Rate Top5"}
            data={topData1}
            columns={topColumns}
          />
        </div>
        <div>
          {/* <GridStatusDropdown
            title={"status"}
            data={statusData}
            columns={statusColumns}
          /> */}
          <GridStatusDropdown title={"Broker Status"} data={statusData} />
        </div>
        {/* <div>
          <GridDropdown
            title={"10mins HighMessage In Rate Top5"}
            data={topData2}
            columns={topColumns2}
          />
        </div>
        <div>
          <GridDropdown
            title={"Pending Message Top5"}
            data={topData3}
            columns={topColumns3}
          />
        </div> */}
      </div>
      {/* ----- Tabulator ----- */}
      <div style={{ fontSize: 30, fontWeight: 700 }} className="mb-10 mt-20">
        Tabulator
      </div>
      <div className="flex flex-row">
        <div>
          <Tabulator1 columns={columns} data={data} />
        </div>
      </div>
      {/* ----- Ag Grid ----- */}
      <div style={{ fontSize: 30, fontWeight: 700 }} className="mb-10 mt-20">
        ag-grid
      </div>
      <div className="flex flex-row mt-12 gap-3">
        <div>
          <AgGrid />
        </div>
        <div>
          <AgGrid2 />
        </div>
      </div>
    </main>
  );
};

export default Grid;
