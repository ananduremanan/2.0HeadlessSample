import GridAction from "@/app/components/GridAction";
import { FormItem } from "@/component-lib/formrenderer/types";

export const items = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
];

export const data = [
  { id: 1, name: "John Doe", age: 28 },
  { id: 2, name: "Jane Smith", age: 32 },
  { id: 1, name: "Smith Doe", age: 28 },
  { id: 2, name: "Supa Smith", age: 32 },
  { id: 1, name: "John Kun", age: 28 },
  { id: 2, name: "Jane Udupi", age: 32 },
  { id: 1, name: "Mia Doe", age: 28 },
  { id: 2, name: "Sam Smith", age: 32 },
  { id: 1, name: "John Krasinski", age: 28 },
];

export const fakeData = [
  { id: 1, name: "John Doe", age: 28 },
  { id: 2, name: "Jane Smith", age: 32 },
  { id: 1, name: "Smith Doe", age: 28 },
];

export const columns = [
  { field: "id", headerText: "ID", width: 50 },
  { field: "name", headerText: "Name", width: 150 },
  { field: "age", headerText: "Age", width: 50, filter: true }, // this will enable filter
  {
    field: "action",
    headerText: "Action",
    width: 150,
    template: GridAction,
  },
];

export const sourceData: FormItem[] = [
  {
    id: "company-name-input-abc123",
    component: "input",
    name: "company-name",
    label: "Company Name",
    type: "text",
    placeholder: "Enter company name",
    required: true,
  },
  {
    id: "industry-select-def456",
    component: "select",
    name: "industry",
    label: "Industry",
    options: [
      {
        value: "tech",
        label: "Technology",
      },
      {
        value: "healthcare",
        label: "Healthcare",
      },
      {
        value: "finance",
        label: "Finance",
      },
    ],
    required: true,
  },
  {
    id: "founded-date-datepicker-ghi789",
    component: "datepicker",
    name: "founded-date",
    label: "Founded Date",
    required: true,
  },
  {
    id: "terms-checkbox-jkl012",
    component: "checkbox",
    name: "terms-checkbox",
    label: "I agree to the terms",
    required: "exp:${company-name-input-abc123.value !== ''}$",
  },
  {
    id: "num-employees-input-mno345",
    component: "input",
    name: "num-employees",
    label: "Number of Employees",
    type: "number",
    placeholder: "Enter number of employees",
    required: "exp:${terms-checkbox-jkl012.value === true}$",
    disabled: "exp:${terms-checkbox-jkl012.value === false}$",
  },
  {
    id: "button-1744268846765",
    component: "button",
    button_type: "submit",
    value: "Submit",
    required: false,
  },
];
