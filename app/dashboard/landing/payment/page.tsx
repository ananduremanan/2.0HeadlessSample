"use client";

import { Breadcrumb } from "@/component-lib/breadcrumb";
import { Card } from "@/component-lib/card";
import { DataGrid } from "@/component-lib/datagrid";
import Icon from "@/component-lib/icon/Icon";
import { info } from "@/component-lib/icon/iconPaths";
import { columns, data } from "@/utils";

import React from "react";
import TabsWrapper from "./components/TabWrapper";

export default function Payment() {
  return (
    <div className="bg-white min-h-screen flex flex-col md:flex-row gap-6 text-black px-2 py-8">
      <div className="flex-1">
        <section>
          <Breadcrumb />
          <div className="text-2xl font-bold mt-4">Overview</div>
          <div className="text-xs text-gray-400">You can see the breadcrumb above auto Generated with breadcrumb component</div>

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

                <div className="text-2xl font-black">INR 34000</div>
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

                <div className="text-2xl font-black">INR 3788000</div>
                <p className="text-sm text-zinc-400">
                  vs 7.8 Last Period • This is a Card
                </p>
              </div>
            </Card>
          </section>

          <div className="mt-4">
            <Card>
              <DataGrid
                dataSource={data}
                columns={columns}
                pageSettings={{ pageNumber: 6 }}
                enableSearch={false}
                enableExcelExport={false}
              />
            </Card>
          </div>
        </section>
      </div>

      <div className=" bg-slate-100 md:w-96 rounded-2xl flex flex-col p-4">
        <div className="text-lg font-bold mb-4">Montly Volume</div>
        <TabsWrapper />
      </div>
    </div>
  );
}
