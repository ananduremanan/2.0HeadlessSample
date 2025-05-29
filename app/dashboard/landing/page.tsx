"use client";
import { Button } from "@/component-lib/button";
import { Card } from "@/component-lib/card";
import { DataGrid } from "@/component-lib/datagrid";
import { DatePicker } from "@/component-lib/datepicker";
import FormRenderer from "@/component-lib/formrenderer";
import Icon from "@/component-lib/icon/Icon";
import {
  cloudDownload,
  info,
  rightArrow,
  upload,
} from "@/component-lib/icon/iconPaths";
import { Input } from "@/component-lib/input";
import { Modal } from "@/component-lib/modal";
import { columns, data, sourceData } from "@/utils";
import Link from "next/link";
import React, { useState } from "react";
import { useColorContext } from "@/app/context/ColorContext";
import BarGraphDisplay from "@/components/BarGraph";
import { Select } from "@/component-lib/select";
// import { randomColorGenerator } from "./helperFunction";

export default function page() {
  const [showFormRenderer, setShowFormRenderer] = useState(false);
  const {
    textPrimary,
    bgPrimary,
    textSecondary,
    setBgPrimary,
    setTextSecondary,
    setTextPrimary,
  } = useColorContext();

  console.log(textPrimary, bgPrimary, textSecondary);

  const formSubmit = (formData: FormData) => {
    console.log(Object.fromEntries(formData));
  };

  return (
    <div className={`bg-white min-h-screen px-2 py-8 ${textPrimary}`}>
      <section className="w-full flex justify-between items-center">
        <div className="w-96 mt-10 md:mt-0">
          <Input placeholder="search" type="search" />
        </div>
        <div className="space-x-2 w-96 hidden md:flex">
          <DatePicker />
          <Button
            className={`${bgPrimary} p-1.5 ${textSecondary} rounded-lg flex items-center gap-2 text-sm px-4`}
          >
            <Icon
              elements={upload}
              svgClass="stroke-white"
              dimensions={{ width: "16", height: "16" }}
            />
            Export
          </Button>
        </div>
      </section>

      <section
        className={`w-full bg-zinc-100 p-6 rounded-lg mt-4 ${textPrimary} flex flex-col md:flex-row justify-between bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5`}
      >
        <div className="flex flex-col">
          <div>Total Balance Pending</div>
          <div className="text-2xl font-bold">567 Projects</div>
        </div>
        <div className="flex gap-2 h-10 items-end">
          <Button
            className={`${bgPrimary} p-1.5 ${textSecondary} rounded-lg flex items-center gap-2 text-sm px-4`}
            onClick={() => setShowFormRenderer(true)}
          >
            <Icon
              elements={cloudDownload}
              svgClass="stroke-white"
              dimensions={{ width: "16", height: "16" }}
            />
            Add
          </Button>
          <Button
            className={`${bgPrimary} p-1.5 ${textSecondary} rounded-lg flex items-center gap-2 text-sm px-4`}
          >
            <Icon
              elements={rightArrow}
              svgClass="stroke-white"
              dimensions={{ width: "16", height: "16" }}
            />
            Send
          </Button>
          <Button
            className={`${bgPrimary} p-1.5 ${textSecondary} rounded-lg flex items-center gap-2 text-sm px-4`}
          >
            <Icon
              elements={info}
              svgClass="stroke-white"
              dimensions={{ width: "16", height: "16" }}
            />
            Random
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 space-x-2">
        <BarGraphDisplay />
        <div className="border border-gray-100 rounded-xl p-4 mt-2">
          <div className="text-sm font-bold">Share This Document</div>
          <div className="text-xs text-gray-400">
            Anyone with the link can view this document.
          </div>
          <div className="flex w-full justify-between gap-2 mt-4">
            <div className="flex-1">
              <Input
                value={"example.com/grampro/give-access?value=true"}
                onChange={() => {
                  console.log("nothing");
                }}
              />
            </div>
            <Button>Copy</Button>
          </div>

          <div>
            <div className="text-sm mt-4">People with access</div>
            {[
              {
                employeeName: "Sahail Samshudhin",
                email: "sahail@gramproindia.com",
                access: "edit",
              },
              {
                employeeName: "Nalini Ramakrsihnan",
                email: "nalini@gramproindia.com",
                access: "view",
              },
              {
                employeeName: "Sree Devi",
                email: "sreedevi@gramproindia.com",
                access: "view",
              },
            ].map(({ employeeName, email, access }: any, index: number) => {
              return (
                <div
                  className="mt-4 flex justify-between items-center"
                  key={index}
                >
                  <div className="flex gap-2">
                    <div className="hidden md:flex w-12 h-12 bg-black text-white rounded-full  justify-center items-center">
                      {employeeName.slice(0, 1)}
                    </div>
                    <div>
                      <div className="font-bold">{employeeName}</div>
                      <div className="text-sm text-gray-400">{email}</div>
                    </div>
                  </div>

                  <div className="w-32">
                    <Select
                      showRemoveButton={false}
                      showSearch={false}
                      items={
                        new Array(
                          { label: "Can Edit", value: "edit" },
                          { label: "Can View", value: "view" },
                          { label: "Can Delete", value: "delete" }
                        )
                      }
                      selectedItem={access}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4 space-y-2">
        <Card>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="font-bold flex items-center gap-2">
                <Icon
                  elements={info}
                  svgClass="stroke-white"
                  dimensions={{ width: "16", height: "16" }}
                />
                Buisness Account
              </div>
              <div className="text-sm text-zinc-400">Last 30 Days</div>
            </div>

            <div className="text-2xl font-black">34 Projects</div>
            <p className="text-sm text-zinc-400">
              vs 7.8 Last Period • This is a Card
            </p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="font-bold flex items-center gap-2">
                <Icon
                  elements={info}
                  svgClass="stroke-white"
                  dimensions={{ width: "16", height: "16" }}
                />
                Personal Account
              </div>
              <div className="text-sm text-zinc-400">Last 30 Days</div>
            </div>

            <div className="text-2xl font-black">4 Projects</div>
            <p className="text-sm text-zinc-400">
              vs 7.8 Last Period • This is a Card
            </p>
          </div>
        </Card>
      </section>

      <section>
        <Card cardClass="rounded-xl p-2 border border-gray-300 mt-4">
          <DataGrid
            dataSource={data}
            columns={columns}
            pageSettings={{ pageNumber: 6 }}
            enableSearch={true}
            enableExcelExport={true}
            excelName="User_Data"
            enablePdfExport={true}
            pdfName="User_Data"
          />
        </Card>
      </section>

      <Modal
        showModal={showFormRenderer}
        setShowModal={setShowFormRenderer}
        modalTitle="Form Renderer Sample"
        modalContentClass="bg-white rounded-lg shadow-lg"
        showCloseButton={false}
        dismissible={true}
      >
        <div className="text-xs">
          Content of this Form is Generated With AI and Dynamically Rendered
          With FormRenderer Component
        </div>
        <div>
          <FormRenderer sourceData={sourceData} onSubmit={formSubmit} />
        </div>
        <div className="text-xs mt-4">
          Build Your Own
          <Link
            href={
              "https://blackmax-designs.gitbook.io/building-block-v2.0/components/form-renderer"
            }
            className="text-blue-500"
          >
            {" "}
            Form
          </Link>
        </div>
      </Modal>
    </div>
  );
}
