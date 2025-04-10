import { Button } from "@/component-lib/button";
import { DataGrid } from "@/component-lib/datagrid";
import { Dialog } from "@/component-lib/dialog";
import { TabItem, Tabs } from "@/component-lib/tabs";
import { useToast } from "@/component-lib/toast/useToast";
import { columns, fakeData } from "@/utils";
import Image from "next/image";
import React, { useState } from "react";

export default function TabsWrapper() {
  const tabs: TabItem[] = [
    { id: "total", label: "Total" },
    { id: "transaction", label: "Transaction" },
    { id: "day-sale", label: "Day Sale" },
    // { id: "inactive", label: "Inactive Tab", disabled: true },
  ];

  const { toast } = useToast();

  const [showDialog, setShowDialog] = useState(false);

  const showCustomToast = () => {
    toast({
      content: (
        <div className="bg-white rounded-lg p-4 shadow-lg border">
          <div className="flex items-center gap-3">
            <Image
              src={"/girl.jfif"}
              width={60}
              height={60}
              alt="girl"
              className="rounded-full"
            />
            <div>
              <h4 className="font-semibold text-black">New Message</h4>
              <p className="text-sm text-gray-500">
                You have a new message from John, This is a Custom Toast with
                JSX renderd Inside.
              </p>
            </div>
          </div>
        </div>
      ),
      duration: 8000,
    });
  };

  const renderContent = (activeTabId: string) => {
    switch (activeTabId) {
      case "total":
        return (
          <div>
            <div className="text-sm">A Beautifully Crafted Tab Component</div>
            <div className="text-xl font-black mt-4">2356 INR</div>
            <div className="text-gray-500 text-sm mt-2">
              The Volume can be send here and this paragraph doesn't makes any
              sense
            </div>
            <div className="flex justify-between mt-4">
              <div className="font-bold">Volume by sales</div>
              <Button
                className="p-1.5 text-xs bg-black text-white rounded-md hover:bg-gray-700"
                onClick={showCustomToast}
              >
                Custom Toast
              </Button>
            </div>

            <div className="mt-4">
              <DataGrid
                dataSource={fakeData}
                columns={columns}
                pageSettings={{ pageNumber: 4 }}
                showPagination={false}
              />
            </div>
            <Button
              className="p-1.5 text-xs mt-4 float-right bg-black text-white rounded-md hover:bg-gray-700"
              onClick={() => setShowDialog(true)}
            >
              Show Dialog
            </Button>
          </div>
        );
      case "transaction":
        return <div>Transaction content goes here...</div>;
      case "day-sale":
        return <div>Day Sale content goes here...</div>;
      default:
        return <div>No content available</div>;
    }
  };

  const handleTabChange = (tabId: string) => {
    console.log(`Tab changed to: ${tabId}`);
  };

  const handleActionOne = () => {
    console.log("Action One Clicked");
    setShowDialog(false);
  };

  return (
    <React.Fragment>
      <Tabs
        tabs={tabs}
        defaultTabId="total"
        renderContent={renderContent}
        onChange={handleTabChange}
      />
      <Dialog
        showDialog={showDialog}
        dialogMessage="Do you want to proceed with this action?"
        onDialogActionOneClick={handleActionOne}
        onDialogActionTwoClick={handleActionOne}
      />
    </React.Fragment>
  );
}
