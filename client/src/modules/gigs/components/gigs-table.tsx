"use client";

import { DataTable } from "@/components/ui/data-table";
import { shortenID } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

type GigsTableInput = {
  id: string;
  agency: string;
  ace: string;
  bindingAmount: number;
  date: Date;
};

const columns: ColumnDef<GigsTableInput>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      const shortId = shortenID(id);

      return <div>{shortId}</div>;
    },
  },
  {
    accessorKey: "agency",
    header: "Agency",
  },
  {
    accessorKey: "ace",
    header: "Ace",
  },
  {
    accessorKey: "bindingAmount",
    header: "Binding Amount",
  },
  {
    accessorKey: "date",
    header: "Creation Date",
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  // {
  //   accessorKey: "amount",

  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));
  //     const formatted = new Intl.NumberFormat("en-NG", {
  //       style: "currency",
  //       currency: "NGN",
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
];

const data: GigsTableInput[] = [
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
  {
    id: "123456789012345678901234567890",
    agency: "Agence Test",
    ace: "Ace Test",
    bindingAmount: 1000,
    date: new Date(),
  },
];

export function GigsTable() {
  return <DataTable columns={columns} data={data} />;
}
