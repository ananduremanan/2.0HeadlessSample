import GridAction from "@/app/components/GridAction";

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
