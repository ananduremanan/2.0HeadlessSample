"use client";
import { Button } from "@/component-lib/button";
import { Modal } from "@/component-lib/modal";
import { FileUploader } from "@/component-lib/uploader";
import React, { useState } from "react";

export default function GridAction({ rowData, rowIndex, rowChange }: any) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
        <p>This is the content of the modal!</p>
        <p className="mb-4">Row Data: {JSON.stringify(rowData)}</p>
        <FileUploader
          showImagePreview={true}
          multiple={true}
          startUpload={false}
          fileCount={5}
        />
      </Modal>
    </div>
  );
}
