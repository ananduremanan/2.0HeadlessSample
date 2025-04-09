"use client";
import TopBarForm from "@/app/components/TopBarForm";
import { Button } from "@/component-lib/button";
import { Card } from "@/component-lib/card";
import { Checkbox } from "@/component-lib/checkbox";
import { ContextMenu } from "@/component-lib/contextmenu";
import {
  ContextMenuDivider,
  ContextMenuItem,
} from "@/component-lib/contextmenu/ContextMenuItem";
import { DataGrid } from "@/component-lib/datagrid";
import { Dialog } from "@/component-lib/dialog";
import { MultiSelect } from "@/component-lib/multiselect";
import Skeleton from "@/component-lib/skeleton";
import { useToast } from "@/component-lib/toast/useToast";
import { columns, data, items } from "@/utils";
import { useState } from "react";

export default function Home() {
  const { toast } = useToast();

  const showCustomToast = () => {
    toast({
      content: (
        <div className="bg-white rounded-lg p-4 shadow-lg border">
          <div className="flex items-center gap-3">
            <div>
              <h4 className="font-semibold text-black">New Message</h4>
              <p className="text-sm text-gray-500">
                This is a Custom Styled Toast
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-black text-white rounded-md text-xs">
              View
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded-md text-xs text-black">
              Dismiss
            </button>
          </div>
        </div>
      ),
      duration: 5000,
    });
  };

  const [showDialog, setShowDialog] = useState(false);

  const handleEdit = () => console.log("Edit clicked");
  const handleDelete = () => console.log("Delete clicked");
  const handleShare = () => console.log("Share clicked");

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleActionOne = () => {
    console.log("Action One Clicked");
    setShowDialog(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 p-6">
      <ContextMenu>
        <ContextMenuItem onClick={handleEdit}>Edit</ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} disabled>
          Delete
        </ContextMenuItem>
        <ContextMenuDivider />
        <ContextMenuItem onClick={handleShare}>Share</ContextMenuItem>
      </ContextMenu>
      <h1 className="text-lg font-bold">
        CEO Summary and Key Opening Metrics (Q4 2025)
      </h1>
      <p>
        High level summary of the Q4 2025 Performance with a snapshot of our key
        components
      </p>
      <TopBarForm />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-2">
        <Card>
          <div className="w-full justify-between flex items-baseline">
            <div className="font-bold mb-4">User Based Queries #4</div>
            <Button
              onClick={handleOpenDialog}
              className="bg-black p-2 text-white rounded-lg text-xs"
            >
              Open a dialog
            </Button>
          </div>
          <DataGrid
            dataSource={data}
            columns={columns}
            pageSettings={{ pageNumber: 2 }}
            enableSearch={true}
            enableExcelExport={true}
            excelName="User_Data"
            enablePdfExport={true}
            pdfName="User_Data"
          />
        </Card>
        <Card>
          <div className="w-full justify-between flex items-baseline">
            <div className="font-bold mb-4">Revenue each Quarter</div>
            <Button
              onClick={showCustomToast}
              className="bg-black p-2 text-white rounded-lg text-xs"
            >
              Show a Toast
            </Button>
          </div>
          <MultiSelect
            placeholder="Select Multiselect Items"
            items={items}
            showSearch={false}
          />

          <div className="mt-4">
            <h3>This is How Loading Content Shows with Skeleton Component</h3>
            <div className="flex flex-col items-center gap-4 mt-4">
              <Skeleton type="circle" height={50} width={50} />
              <Skeleton type="text" lines={3} width="80%" />
            </div>
          </div>
        </Card>
      </div>
      <p className="mt-4">
        Right Click on the screen for open context menu component
      </p>

      <p className="flex items-center mt-4 gap-2">
        I Agree To Whatever You Say, Take my Money <Checkbox />
      </p>

      <Dialog
        showDialog={showDialog}
        dialogMessage="Do you want to proceed with this action?"
        dialogActionOne="Yes"
        dialogActionTwo="No"
        onDialogActionOneClick={handleActionOne}
        onDialogActionTwoClick={handleActionOne}
      />
    </div>
  );
}
