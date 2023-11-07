"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button, Metric } from "@tremor/react";
import { useState } from "react";
import { MenuDialog } from "./MenuDialog";

export function Header() {
  const [isOpenMenuDialog, setIsOpenMenuDialog] = useState(false);

  function closeMenuDialog() {
    setIsOpenMenuDialog(false);
  }

  function openMenuDialog() {
    setIsOpenMenuDialog(true);
  }

  return (
    <>
      <div className="flex pt-2">
        <div className="w-full">
          <Link href="/dashboard">
            <Metric>Commit Board</Metric>
          </Link>
        </div>
        <div className="flex justify-end">
          <Button
            icon={Bars3Icon}
            className="bg-white shadow-md border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
            onClick={openMenuDialog}
          />
        </div>
      </div>
      <MenuDialog isOpen={isOpenMenuDialog} closeDialog={closeMenuDialog} />
    </>
  );
}
