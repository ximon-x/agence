"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

type GigsTableInput = {
  id: string;
  agencyImage: string;
  agency: string;
  ace?: string;
  bindingAmount: number;
  status: string;
  creationDate: string;
};

const columns: ColumnDef<GigsTableInput>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">Gig ID</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "agencyImage",
    header: () => <div className="text-center">Logo</div>,

    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Avatar>
          <AvatarImage src={row.getValue("agencyImage")} alt="agency" />
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: "agency",
    header: "Agency",
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
    accessorKey: "creationDate",
    header: () => <div className="text-center">Creation Date</div>,
    cell: ({ row }) => {
      const rawDate = row.getValue("creationDate") as Date;
      const date = new Date(rawDate);

      return <div className="text-center"> {date.toLocaleDateString()}</div>;
    },
  },
];

const data: GigsTableInput[] = [
  {
    id: "1",
    agencyImage: "https://picsum.photos/seed/4C8iO/2107/287?grayscale&blur=7",
    agency: "Larkin and Sons",
    ace: "",
    bindingAmount: 950,
    status: "Pending",
    creationDate: "2024-10-29T17:51:32.673Z",
  },
  {
    id: "2",
    agencyImage: "https://picsum.photos/seed/Jzdjm/361/226?blur=7",
    agency: "O'Keefe - Howe",
    ace: "Bryan Cremin",
    bindingAmount: 150,
    status: "Completed",
    creationDate: "2024-10-30T05:40:14.712Z",
  },
  {
    id: "3",
    agencyImage: "https://picsum.photos/seed/Tze8Ti/2429/2651?blur=9",
    agency: "Goyette - Koepp",
    ace: "Lauren Skiles",
    bindingAmount: 550,
    status: "Completed",
    creationDate: "2024-10-30T08:49:22.118Z",
  },
  {
    id: "4",
    agencyImage: "https://picsum.photos/seed/N6PVO2/3381/209?blur=2",
    agency: "Ledner, Hermann and Feil",
    ace: "Brendan Marquardt",
    bindingAmount: 0,
    status: "Completed",
    creationDate: "2024-10-29T20:20:25.512Z",
  },
  {
    id: "5",
    agencyImage: "https://picsum.photos/seed/9sHXyz/396/3053?grayscale&blur=2",
    agency: "West Inc",
    ace: "",
    bindingAmount: 250,
    status: "Rejected",
    creationDate: "2024-10-29T23:14:06.524Z",
  },
  {
    id: "6",
    agencyImage: "https://picsum.photos/seed/huIdTv/2019/1676?grayscale&blur=3",
    agency: "Yundt, Anderson and Jones",
    ace: "Eugene Sawayn",
    bindingAmount: 1000,
    status: "Rejected",
    creationDate: "2024-10-30T16:39:05.523Z",
  },
  {
    id: "7",
    agencyImage: "https://picsum.photos/seed/LCYmR1/3739/522?grayscale&blur=10",
    agency: "Davis, Powlowski and Keebler",
    ace: "",
    bindingAmount: 900,
    status: "Pending",
    creationDate: "2024-10-30T03:23:33.419Z",
  },
  {
    id: "8",
    agencyImage: "https://picsum.photos/seed/VnSgB/3761/3911?blur=4",
    agency: "McKenzie and Sons",
    ace: "Andres Toy",
    bindingAmount: 400,
    status: "Completed",
    creationDate: "2024-10-30T15:01:32.786Z",
  },
  {
    id: "9",
    agencyImage: "https://picsum.photos/seed/bDgC0g/2834/2131?blur=6",
    agency: "Welch - Brown",
    ace: "Ian Schowalter",
    bindingAmount: 700,
    status: "Completed",
    creationDate: "2024-10-30T12:28:31.961Z",
  },
  {
    id: "10",
    agencyImage: "https://picsum.photos/seed/NyOtj/3805/2728?blur=5",
    agency: "Hackett LLC",
    ace: "",
    bindingAmount: 350,
    status: "Pending",
    creationDate: "2024-10-29T17:44:21.662Z",
  },
  {
    id: "11",
    agencyImage: "https://picsum.photos/seed/ZSo9YKWC/20/1215?blur=1",
    agency: "Gorczany, Brown and Pagac",
    ace: "Brent Pfannerstill",
    bindingAmount: 600,
    status: "Completed",
    creationDate: "2024-10-30T09:27:10.203Z",
  },
  {
    id: "12",
    agencyImage: "https://picsum.photos/seed/j5mVJ/2089/3601?grayscale&blur=2",
    agency: "Kessler - Okuneva",
    ace: "Ben Ryan",
    bindingAmount: 450,
    status: "Completed",
    creationDate: "2024-10-30T14:44:05.418Z",
  },
  {
    id: "13",
    agencyImage:
      "https://picsum.photos/seed/EIqCedY/2594/3964?grayscale&blur=10",
    agency: "Klein LLC",
    ace: "Dr. Sammy Brakus",
    bindingAmount: 550,
    status: "Rejected",
    creationDate: "2024-10-30T16:09:15.730Z",
  },
  {
    id: "14",
    agencyImage: "https://picsum.photos/seed/VzKak/813/407?blur=4",
    agency: "O'Hara, Considine and Schinner",
    ace: "Ms. Lynda Borer",
    bindingAmount: 900,
    status: "Completed",
    creationDate: "2024-10-30T11:17:35.137Z",
  },
  {
    id: "15",
    agencyImage:
      "https://picsum.photos/seed/7FhSBeEjHT/2732/1974?grayscale&blur=8",
    agency: "Padberg - Vandervort",
    ace: "Phillip Effertz",
    bindingAmount: 600,
    status: "Rejected",
    creationDate: "2024-10-30T09:27:03.854Z",
  },
  {
    id: "16",
    agencyImage: "https://picsum.photos/seed/4pJf1je/2596/2435?grayscale",
    agency: "Mueller, Larkin and Hane",
    ace: "Mr. Ronnie Towne DVM",
    bindingAmount: 500,
    status: "Completed",
    creationDate: "2024-10-30T02:12:33.361Z",
  },
  {
    id: "17",
    agencyImage: "https://picsum.photos/seed/K6Myx/1956/1659?blur=7",
    agency: "Gutkowski - Cruickshank",
    ace: "",
    bindingAmount: 1000,
    status: "Rejected",
    creationDate: "2024-10-30T04:15:44.940Z",
  },
  {
    id: "18",
    agencyImage: "https://picsum.photos/seed/363PU/2677/2317?blur=5",
    agency: "Veum - Schiller",
    ace: "Kristine Conn",
    bindingAmount: 350,
    status: "Completed",
    creationDate: "2024-10-29T20:31:59.047Z",
  },
  {
    id: "19",
    agencyImage: "https://picsum.photos/seed/Tz5U17Sw/2372/1630?blur=10",
    agency: "Brakus - Trantow",
    ace: "Tami Barrows",
    bindingAmount: 450,
    status: "Completed",
    creationDate: "2024-10-30T07:28:14.415Z",
  },
  {
    id: "20",
    agencyImage: "https://picsum.photos/seed/xhFKXO/1741/631?blur=8",
    agency: "Abernathy LLC",
    ace: "Lynette Towne Jr.",
    bindingAmount: 100,
    status: "Completed",
    creationDate: "2024-10-29T22:12:35.524Z",
  },
];

export function GigsTable() {
  return <DataTable columns={columns} data={data} />;
}
