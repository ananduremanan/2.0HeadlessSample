import React from "react";
import { useGridPagination } from "../hooks/GridHooks";
import Icon from "../../icon/Icon";
import {
  leftArrow,
  leftArrows,
  rightArrow,
  rightArrows,
} from "../../icon/iconPaths";

const Pagination = () => {
  const {
    currentPage,
    pageStart,
    pageEnd,
    totalPages,
    goToFirstPage,
    prevPage,
    goToPage,
    nextPage,
    goToEndPage,
    workingDataSource,
  } = useGridPagination();

  return (
    <div className="flex flex-wrap justify-between items-center text-xs px-2 py-4 bg-zinc-100 gap-2 md:gap-4">
      <div className="flex flex-1 space-x-1">
        <button onClick={goToFirstPage} disabled={currentPage === 0}>
          <Icon
            elements={leftArrows}
            svgClass={`${
              currentPage === 0
                ? "stroke-gray-200 fill-none cursor-not-allowed"
                : "stroke-black fill-none cursor-pointer"
            }`}
          />
        </button>
        <button onClick={prevPage} disabled={currentPage === 0}>
          <Icon
            elements={leftArrow}
            svgClass={`${
              currentPage === 0
                ? "stroke-gray-200 fill-none cursor-not-allowed"
                : "stroke-black fill-none cursor-pointer"
            }`}
          />
        </button>
        {pageStart > 0 && (
          <button
            className="p-1 w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"
            onClick={() => goToPage(pageStart - 1)}
          >
            ...
          </button>
        )}
        <div className="flex md:space-x-1">
          {Array.from({ length: pageEnd - pageStart }, (_, i) => (
            <button
              key={pageStart + i}
              onClick={() => goToPage(pageStart + i)}
              className={`hidden md:block px-2 py-1 text-sm rounded-md transition-colors duration-200 ease-in-out ${
                currentPage === pageStart + i
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {pageStart + i + 1}
            </button>
          ))}
        </div>
        {pageEnd < totalPages && (
          <button onClick={() => goToPage(pageEnd)} className="cursor-pointer">
            ...
          </button>
        )}
        <button onClick={nextPage} disabled={currentPage === totalPages - 1}>
          <Icon
            elements={rightArrow}
            svgClass={`${
              currentPage === totalPages - 1 || workingDataSource.length <= 0
                ? "stroke-gray-200 fill-none cursor-not-allowed"
                : "stroke-black fill-none cursor-pointer"
            }`}
          />
        </button>
        <button onClick={goToEndPage} disabled={currentPage === totalPages - 1}>
          <Icon
            elements={rightArrows}
            svgClass={`${
              currentPage === totalPages - 1 || workingDataSource.length <= 0
                ? "stroke-gray-200 fill-none cursor-not-allowed"
                : "stroke-black fill-none cursor-pointer"
            }`}
          />
        </button>
      </div>

      <div className="flex text-xs">
        {currentPage + 1} of {totalPages} pages ({workingDataSource.length})
        items
      </div>
    </div>
  );
};

export default Pagination;
