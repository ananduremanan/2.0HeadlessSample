"use client";

import { Button } from "@/component-lib/button";
import { Modal } from "@/component-lib/modal";
import { MultiSelect } from "@/component-lib/multiselect";
import { FileUploader } from "@/component-lib/uploader";
import React, { useEffect, useState } from "react";

export default function GridAction({ rowData }: any) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any[] | undefined>([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const multiSelectData: any[] = Object.entries(rowData).map(
    ([key, value]) => ({
      label: key,
      value: value,
    })
  );

  const multiSelectHandle = (selectedItemValue: any[] | undefined) => {
    setSelectedItem(selectedItemValue);
  };

  return (
    <div>
      <Button
        className="cursor-pointer border p-1 rounded-lg"
        onClick={toggleModal}
      >
        Open A Model
      </Button>

      <Modal
        showModal={isModalVisible}
        setShowModal={setModalVisible}
        modalTitle="Example Modal"
        showCloseButton={true}
        dismissible={true}
      >
        <div className="flex flex-col space-y-2">
          <div>
            <label htmlFor="">Select Feilds to Export</label>
            <MultiSelect
              items={multiSelectData}
              showSearch={false}
              onSelect={(value: any) => {
                multiSelectHandle(value);
              }}
            />
          </div>
          <div>
            <div className="flex">
              You've Selected :{" "}
              {selectedItem?.map((item: any, index: number) => {
                return (
                  <div key={index} className="flex">
                    {" "}
                    {item},
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <label htmlFor="">Add Additional Documents</label>
            <FileUploader
              showImagePreview={true}
              multiple={true}
              startUpload={false}
              fileCount={5}
            />
          </div>

          <div className="flex w-full justify-end space-x-2">
            <Button className="px-2 py-2 border border-red-500 text-red-600 rounded-md">
              Cancel
            </Button>
            <Button>Submit</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
