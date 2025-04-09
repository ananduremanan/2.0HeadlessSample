import React from "react";
import { useGridExport, useGridSearch } from "../hooks/GridHooks";
import {
  exportToExcelHelper,
  exportToPDFHelper,
} from "@grampro/headless-helpers";
import Icon from "../../icon/Icon";
import { search } from "../../icon/iconPaths";

const GridToolbar = () => {
  const { searchParam, handleSearchInput, handleSearch, enableSearch } =
    useGridSearch();

  const {
    enableExcelExport,
    enablePdfExport,
    workingDataSource,
    columns,
    excelName,
    pdfName,
    pdfOptions,
    gridButtonClass,
  } = useGridExport();

  if (!enableSearch && !enableExcelExport && !enablePdfExport) {
    return null;
  }

  return (
    <div className="flex bg-zinc-100 justify-end space-x-2 px-2 py-4">
      {/* Search input */}
      {enableSearch && (
        <div className="flex">
          <input
            type="search"
            value={searchParam}
            onChange={handleSearchInput}
            placeholder="Search..."
            className="outline-none p-2 text-xs rounded-lg max-sm:hidden bg-zinc-200"
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === "Enter") {
                handleSearch(searchParam);
              }
            }}
          />
          <button
            className="rounded-lg w-10 flex items-center justify-center cursor-pointer"
            onClick={() => handleSearch(searchParam)}
          >
            <Icon
              elements={search}
              svgClass={"stroke-gray-500 fill-none"}
            />{" "}
          </button>
        </div>
      )}

      {/* Export buttons */}
      {(enableExcelExport || enablePdfExport) && (
        <div className="flex space-x-2">
          {enableExcelExport && (
            <button
              className={gridButtonClass}
              onClick={() => {
                exportToExcelHelper(workingDataSource, columns, excelName);
              }}
            >
              Export to Excel
            </button>
          )}

          {enablePdfExport && (
            <button
              className={gridButtonClass}
              onClick={() => {
                exportToPDFHelper(
                  workingDataSource,
                  columns,
                  pdfName,
                  pdfOptions
                );
              }}
            >
              Export to PDF
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GridToolbar;
