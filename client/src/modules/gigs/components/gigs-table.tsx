"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/ui/data-table";
import { formatInitialCapitalize } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistance } from "date-fns";

type GigsTableInput = {
  id: number;
  image: string;
  agency: string;
  ace?: string;
  bindingAmount: number;
  status: string;
  creationDate: string;
};

const columns: ColumnDef<GigsTableInput>[] = [
  {
    accessorKey: "image",
    header: "",

    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src={row.getValue("image")} alt="agency" />
        </Avatar>
      </div>
    ),
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
    header: () => <div className="text-center">Binding Amount</div>,
    cell: ({ row }) => {
      const amount = parseInt(row.getValue("bindingAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              status === "Completed"
                ? "bg-green-500"
                : status === "Pending"
                  ? "bg-yellow-500"
                  : status === "Rejected"
                    ? "bg-red-500"
                    : "bg-gray-500"
            }`}
          />
          <div>{status as string}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: () => <div className="text-center">Gig ID</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "creationDate",
    header: () => <div className="text-right">Creation Date</div>,
    cell: ({ row }) => {
      const rawDate = row.getValue("creationDate") as Date;
      const date = new Date(rawDate);

      return (
        <div className="text-right">
          {" "}
          {formatInitialCapitalize(
            formatDistance(date, new Date(), { addSuffix: true }),
          )}
        </div>
      );
    },
  },
];

const data: GigsTableInput[] = [
  {
    id: 27,
    image: "https://picsum.photos/seed/6RYnNU86Ej/1397/128?grayscale&blur=8",
    agency: "Wilkinson, Renner and O'Hara",
    ace: "Lee Kulas",
    bindingAmount: 50,
    status: "Completed",
    creationDate: "2024-11-02T10:45:32.741Z",
  },
  {
    id: 26,
    image: "https://picsum.photos/seed/5Ggg45sp/3038/3744?blur=7",
    agency: "Boyle, Stanton and Fritsch",
    ace: "",
    bindingAmount: 700,
    status: "Pending",
    creationDate: "2024-11-03T04:14:19.959Z",
  },
  {
    id: 25,
    image: "https://picsum.photos/seed/qI4XbiQZnJ/2658/3580?blur=9",
    agency: "Kuhic, Braun and Hammes",
    ace: "Dr. Michael Simonis",
    bindingAmount: 100,
    status: "Rejected",
    creationDate: "2024-11-02T17:21:37.181Z",
  },
  {
    id: 24,
    image: "https://picsum.photos/seed/frNe8lE/2970/3346?blur=3",
    agency: "Lesch - Wolf",
    ace: "Beulah Balistreri-Gutkowski",
    bindingAmount: 950,
    status: "Completed",
    creationDate: "2024-11-03T00:32:53.195Z",
  },
  {
    id: 23,
    image: "https://picsum.photos/seed/d5u0baIIK/117/3880?blur=4",
    agency: "Jaskolski Group",
    ace: "Angelica Parisian",
    bindingAmount: 800,
    status: "Rejected",
    creationDate: "2024-11-02T10:03:17.855Z",
  },
  {
    id: 22,
    image: "https://picsum.photos/seed/vv0k6P/1512/2475?blur=2",
    agency: "Leannon Group",
    ace: "",
    bindingAmount: 200,
    status: "Pending",
    creationDate: "2024-11-03T01:01:04.197Z",
  },
  {
    id: 21,
    image: "https://picsum.photos/seed/pml3cBWsS/1436/1491?grayscale&blur=9",
    agency: "Schroeder and Sons",
    ace: "Adrienne Daniel",
    bindingAmount: 450,
    status: "Completed",
    creationDate: "2024-11-03T03:11:51.897Z",
  },
  {
    id: 20,
    image: "https://picsum.photos/seed/Ylp9A3Xlb/3643/398?grayscale&blur=5",
    agency: "Balistreri Inc",
    ace: "Tina Funk",
    bindingAmount: 800,
    status: "Completed",
    creationDate: "2024-11-03T01:48:26.196Z",
  },
  {
    id: 19,
    image: "https://picsum.photos/seed/sbsNjX7SR/3160/2289?grayscale&blur=2",
    agency: "McKenzie, Erdman and Labadie",
    ace: "",
    bindingAmount: 400,
    status: "Rejected",
    creationDate: "2024-11-02T21:43:12.863Z",
  },
  {
    id: 18,
    image: "https://picsum.photos/seed/myWSa/3148/842?grayscale&blur=8",
    agency: "Stoltenberg - Farrell",
    ace: "Shirley Jakubowski V",
    bindingAmount: 150,
    status: "Completed",
    creationDate: "2024-11-03T05:18:05.050Z",
  },
  {
    id: 17,
    image: "https://picsum.photos/seed/xdp0NCf/1188/49?blur=1",
    agency: "Bernier Group",
    ace: "Tommy Reynolds",
    bindingAmount: 750,
    status: "Completed",
    creationDate: "2024-11-02T22:19:08.336Z",
  },
  {
    id: 16,
    image: "https://picsum.photos/seed/PlAAX6dm/1174/336?blur=3",
    agency: "Davis, Howell and Botsford",
    ace: "Mercedes Goodwin",
    bindingAmount: 650,
    status: "Completed",
    creationDate: "2024-11-02T20:30:12.606Z",
  },
  {
    id: 15,
    image: "https://picsum.photos/seed/ul1yw/92/3436?blur=5",
    agency: "Kirlin, Wuckert and Nitzsche",
    ace: "Miss Erica Paucek",
    bindingAmount: 350,
    status: "Completed",
    creationDate: "2024-11-02T14:43:25.227Z",
  },
  {
    id: 14,
    image: "https://picsum.photos/seed/69ULc1cG3M/471/3472?grayscale&blur=1",
    agency: "Will, Jacobi and Schmeler",
    ace: "",
    bindingAmount: 550,
    status: "Pending",
    creationDate: "2024-11-02T23:12:45.751Z",
  },
  {
    id: 13,
    image: "https://picsum.photos/seed/WhsEoDNnLB/2593/2680?blur=2",
    agency: "Schulist, Kunze and Kemmer",
    ace: "",
    bindingAmount: 300,
    status: "Pending",
    creationDate: "2024-11-02T12:54:47.747Z",
  },
  {
    id: 12,
    image: "https://picsum.photos/seed/ExZJD/814/252?blur=3",
    agency: "Lakin, Halvorson and Gutkowski",
    ace: "",
    bindingAmount: 800,
    status: "Pending",
    creationDate: "2024-11-03T05:26:18.279Z",
  },
  {
    id: 11,
    image: "https://picsum.photos/seed/7A9YC/365/494?blur=5",
    agency: "Marks - VonRueden",
    ace: "Stephanie Walsh",
    bindingAmount: 750,
    status: "Completed",
    creationDate: "2024-11-02T08:06:18.260Z",
  },
  {
    id: 10,
    image: "https://picsum.photos/seed/Yht9NU/402/3350",
    agency: "Powlowski, Kuhic and Kuhn",
    ace: "Tyler Huel",
    bindingAmount: 650,
    status: "Completed",
    creationDate: "2024-11-02T09:19:49.971Z",
  },
  {
    id: 9,
    image: "https://picsum.photos/seed/BZuFhOr/3881/2402?grayscale",
    agency: "Ankunding, Daniel and Hilll",
    ace: "",
    bindingAmount: 650,
    status: "Pending",
    creationDate: "2024-11-02T21:30:24.198Z",
  },
  {
    id: 8,
    image: "https://picsum.photos/seed/AZMIKbKf/3186/1026?grayscale&blur=9",
    agency: "Ryan, Predovic and Smitham",
    ace: "Mr. Brandon Dickinson",
    bindingAmount: 0,
    status: "Completed",
    creationDate: "2024-11-02T12:29:23.774Z",
  },
  {
    id: 7,
    image: "https://picsum.photos/seed/UiFGQ6/3871/3938?grayscale&blur=10",
    agency: "Erdman, Predovic and Windler",
    ace: "Lula Shields",
    bindingAmount: 350,
    status: "Completed",
    creationDate: "2024-11-02T11:17:05.940Z",
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/piqRm2ptEw/333/658?grayscale&blur=5",
    agency: "Feest, Boyer and Littel",
    ace: "Cheryl Kulas",
    bindingAmount: 400,
    status: "Rejected",
    creationDate: "2024-11-03T07:30:23.465Z",
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/YJBBqOkK/1426/1927?blur=1",
    agency: "Bode - Waters",
    ace: "",
    bindingAmount: 950,
    status: "Pending",
    creationDate: "2024-11-02T08:27:19.518Z",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/oEhkaAeoWA/1564/1411?blur=5",
    agency: "Hermann - Corwin",
    ace: "Timothy Wintheiser Jr.",
    bindingAmount: 400,
    status: "Completed",
    creationDate: "2024-11-02T20:11:19.450Z",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/l0DbBBW/2664/1743?blur=1",
    agency: "Lind, Hoppe and Pollich",
    ace: "",
    bindingAmount: 700,
    status: "Pending",
    creationDate: "2024-11-02T21:29:08.315Z",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/sIJlkSC/3760/3423?blur=1",
    agency: "Brekke - Stanton",
    ace: "",
    bindingAmount: 300,
    status: "Rejected",
    creationDate: "2024-11-02T17:02:37.734Z",
  },
  {
    id: 1,
    image: "https://picsum.photos/seed/AqMJXkLKaB/3474/3344?blur=9",
    agency: "Hoeger - Dooley",
    ace: "Monique Vandervort",
    bindingAmount: 600,
    status: "Completed",
    creationDate: "2024-11-03T06:29:31.018Z",
  },
];

export function GigsTable() {
  return <DataTable columns={columns} data={data} />;
}
