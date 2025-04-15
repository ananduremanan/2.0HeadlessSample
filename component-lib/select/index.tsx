/**
 * Copyright (c) Grampro Business Services and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import Icon from "../icon/Icon";
import { check, search, upDown, x } from "../icon/iconPaths";
import type { ItemsProps, SelectHandle, SelectProps } from "./types";
import { selectStyle } from "./style";
import { iconClass, popUp, primary } from "../globalStyle";
import {
  useSelectState,
  useSelectData,
  useClickOutside,
  applyScrollbarStyles,
  useKeyboardNavigation,
} from "@grampro/headless-helpers";

const Select = forwardRef<SelectHandle, SelectProps>((props, ref) => {
  const {
    id = "",
    name = "",
    placeholder = "Select an Item...",
    items,
    lazy = false,
    showSearch = true,
    onSelect,
    selectedItem: initialSelectedItem,
    error = undefined,
    onFiltering,
    disabled = false,
    showRemoveButton = true,
  } = props;

  applyScrollbarStyles();

  const {
    showPopover,
    setShowPopover,
    workingDataSource,
    setWorkingDataSource,
    searchTerm,
    setSearchTerm,
    selectedItem,
    setSelectedItem,
    togglePopover,
    clearSelected,
  } = useSelectState(initialSelectedItem);

  const { getSelectItems, selectedDisplay, filteredItems } = useSelectData(
    items,
    setWorkingDataSource,
    workingDataSource,
    searchTerm,
    lazy,
    selectedItem
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useClickOutside(selectRef as React.RefObject<HTMLElement>, () =>
    setShowPopover(false)
  );

  // Update the handleSelect to accept a SelectItem
  const handleSelect = useCallback(
    (item: ItemsProps) => {
      setSelectedItem(item.value);
      setShowPopover(false);
      setSearchTerm("");
      if (onSelect) onSelect(item.value);
    },
    [onSelect, setSelectedItem, setShowPopover, setSearchTerm]
  );

  // Set up keyboard navigation with the correct item type
  const { focusedIndex, setFocusedIndex, itemRefs, handleKeyDown } =
    useKeyboardNavigation<ItemsProps>({
      items: filteredItems,
      isOpen: showPopover,
      onSelect: handleSelect,
      onClose: () => setShowPopover(false),
    });

  useEffect(() => {
    if (showPopover) {
      inputRef.current?.focus();
    }
  }, [showPopover]);

  useEffect(() => {
    if (initialSelectedItem) {
      setSelectedItem(initialSelectedItem);
    }
  }, [initialSelectedItem, setSelectedItem]);

  const handleClear = () => {
    if (disabled) return;
    clearSelected();
    if (onSelect) onSelect(undefined);
  };

  useImperativeHandle(ref, () => ({
    workingDataSource,
    items,
    clearSelected,
    togglePopover,
    getSelectItems,
    selectedDisplay,
    selected: selectedItem,
  }));

  return (
    <div
      className="relative w-full"
      ref={selectRef}
      id={id}
      onKeyDown={handleKeyDown}
    >
      <div className="w-full relative">
        <button
          className={`${
            error ? primary["error-border"] : "border border-gray-300"
          } ${selectStyle["select-button"]} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={togglePopover}
          type="button"
          disabled={disabled}
        >
          {selectedDisplay || placeholder}
          <Icon
            elements={upDown}
            svgClass={`${iconClass["grey-common"]} ${
              disabled ? "opacity-50" : ""
            }`}
          />
        </button>
        {selectedDisplay && !disabled && showRemoveButton && (
          <button
            className={selectStyle["selectedDisplay-Button"]}
            onClick={handleClear}
          >
            <Icon elements={x} svgClass={iconClass["grey-common"]} />
          </button>
        )}
        {error && <p className={primary["error-primary"]}>{error}</p>}
      </div>

      <input
        type="hidden"
        name={name}
        value={selectedItem || ""}
        readOnly
        disabled={disabled}
      />

      {showPopover && !disabled && (
        <div className={popUp["pop-up-style"]}>
          {showSearch && (
            <div className={selectStyle["input-parent"]}>
              <Icon elements={search} svgClass={iconClass["grey-common"]} />
              <input
                autoComplete="off"
                type="text"
                name="search"
                id="search"
                placeholder="Search a value"
                className="w-full outline-none"
                ref={inputRef}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (onFiltering) onFiltering(e.target.value);
                  setFocusedIndex(-1);
                }}
              />
            </div>
          )}
          {filteredItems.length > 0 ? (
            filteredItems.map(({ value, label }, index) => (
              <button
                key={value}
                ref={(el: any) => (itemRefs.current[index] = el)}
                className={`${selectStyle["filter-button"]} ${
                  focusedIndex === index ? "bg-gray-100" : ""
                }`}
                onClick={() => handleSelect({ value, label })}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                <Icon
                  elements={check}
                  svgClass={`h-4 w-4 fill-none ${
                    selectedItem === value ? "stroke-gray-500" : ""
                  }`}
                />
                {label}
              </button>
            ))
          ) : (
            <div className="text-sm text-center">No Data Found</div>
          )}
        </div>
      )}
    </div>
  );
});

Select.displayName = "Select";

const MemoizedSelect = memo(Select);
export { MemoizedSelect as Select };
