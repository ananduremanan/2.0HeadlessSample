"use client";

import { Button } from "@/component-lib/button";
import { DatePicker } from "@/component-lib/datepicker";
import { Select } from "@/component-lib/select";
import { items } from "@/utils";
import React from "react";

export default function TopBarForm() {
  return (
    <div className="flex items-center justify-between mt-4">
      <form
        action=""
        className="grid grid-cols-1 md:grid-cols-4 items-end gap-4 w-full border-b border-t py-2 border-gray-300"
      >
        <div>
          <label htmlFor="from_date">From Date</label>
          <DatePicker
            placeholder="Select a date"
            minDate={new Date(2020, 0, 1)}
            maxDate={new Date(2025, 11, 31)}
          />
        </div>
        <div>
          <label htmlFor="to_date">To Date</label>
          <DatePicker
            placeholder="Select a date"
            minDate={new Date(2020, 0, 1)}
            maxDate={new Date(2025, 11, 31)}
          />
        </div>
        <div>
          <label htmlFor="geography">Geography</label>
          <Select placeholder="Geography" items={items} showSearch={false} />
        </div>
        <Button className="w-20 p-1.5 bg-black text-white rounded-md hover:bg-gray-700">
          Submit
        </Button>
      </form>
    </div>
  );
}
