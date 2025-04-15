import { BarChart } from "@/component-lib/bargraph";

function BarGraphDisplay() {
  const sampleData = [
    { label: "Jan", value: 40 },
    { label: "Feb", value: 55 },
    { label: "Mar", value: 75 },
    { label: "Apr", value: 20 },
    { label: "May", value: 90 },
    { label: "June", value: 67 },
    { label: "July", value: 54 },
  ];

  return (
    <div className="mt-2">
      <div className="bg-white p-4 rounded-xl w-full max-w-2xl border border-gray-100">
        <BarChart data={sampleData} title="Monthly Sales Performance" />
      </div>
    </div>
  );
}

export default BarGraphDisplay;
