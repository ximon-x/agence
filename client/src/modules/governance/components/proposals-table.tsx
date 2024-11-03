"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";

type ProposalStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Removed"
  | "Expired";

type ProposalKind = "ReportScam" | "ReportSpam" | "ReportSham" | "ChangePolicy";

type Votes = {
  approve: number;
  reject: number;
  remove: number;
};

type ProposalsTableInput = {
  id: number;
  image: string;
  proposer: string;
  offender?: string;
  description?: string;
  votes: Votes;
  proposalKind: ProposalKind;
  proposalStatus: ProposalStatus;
  submissionTime: string;
};

const columns: ColumnDef<ProposalsTableInput>[] = [
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
    accessorKey: "proposer",
    header: "Proposer",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "offender",
    header: "Offender",
  },
  {
    accessorKey: "votes",
    header: () => <div className="text-center">Votes</div>,
    cell: ({ row }) => {
      const votes = row.getValue("votes") as Votes;

      return (
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-1">
            <ArrowBigUpDash className="h-4 w-4 text-green-500" />
            <div>{votes.approve}</div>
          </div>
          <div className="flex items-center gap-1">
            <ArrowBigDownDash className="h-4 w-4 text-red-500" />
            <div>{votes.reject}</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-orange-500" />
            <div>{votes.remove}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "proposalKind",
    header: () => <div className="text-center">Kind</div>,
    cell: ({ row }) => {
      const kind = row.getValue("proposalKind") as ProposalKind;

      const message =
        kind === "ReportScam"
          ? "Report Scam"
          : kind === "ReportSham"
            ? "Report Sham"
            : kind === "ReportSpam"
              ? "Report Spam"
              : "Change Policy";

      return <div className="text-center">{message}</div>;
    },
  },
  {
    accessorKey: "proposalStatus",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("proposalStatus") as ProposalStatus;

      return (
        <div className="flex items-center justify-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              status === "Approved"
                ? "bg-green-500"
                : status === "Rejected"
                  ? "bg-red-500"
                  : status === "Pending"
                    ? "bg-yellow-500"
                    : status === "Removed"
                      ? "bg-orange-500"
                      : "bg-gray-500"
            }`}
          />
          <div>{status}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">Proposal ID</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "submissionTime",
    header: () => <div className="text-center">Submission Time</div>,
    cell: ({ row }) => {
      const rawDate = row.getValue("submissionTime") as Date;
      const date = new Date(rawDate);

      return <div className="text-center">{date.toLocaleString()}</div>;
    },
  },
];

const data: ProposalsTableInput[] = [
  {
    id: 45,
    image: "https://picsum.photos/seed/2N8lRFz/225/2272?grayscale&blur=10",
    proposer: "Julio Rutherford",
    description: "Agency is a sham and does not offer any services",
    offender: "Waters Inc",
    proposalKind: "ReportSham",
    proposalStatus: "Pending",
    votes: {
      approve: 61,
      reject: 27,
      remove: 96,
    },
    submissionTime: "2024-11-03T12:33:41.102Z",
  },
  {
    id: 44,
    image: "https://picsum.photos/seed/m1LZZda/857/1080?blur=6",
    proposer: "Patricia Kihn",
    description: "Agency posts ghost listings",
    offender: "Hudson, Little and Rice",
    proposalKind: "ReportSpam",
    proposalStatus: "Pending",
    votes: {
      approve: 45,
      reject: 99,
      remove: 92,
    },
    submissionTime: "2024-11-03T17:51:19.369Z",
  },
  {
    id: 43,
    image: "https://picsum.photos/seed/h4m5xSX/1354/1605?grayscale&blur=3",
    proposer: "Mrs. Rachel Johnson",
    description: "Agency posts ghost listings",
    offender: "Paucek, Hamill and Donnelly",
    proposalKind: "ReportSpam",
    proposalStatus: "Pending",
    votes: {
      approve: 28,
      reject: 37,
      remove: 16,
    },
    submissionTime: "2024-11-04T03:55:14.225Z",
  },
  {
    id: 42,
    image: "https://picsum.photos/seed/EtrWuGvZm/1709/26?grayscale&blur=8",
    proposer: "Amber Dickinson",
    description: "Agency is a sham and does not offer any services",
    offender: "Klein LLC",
    proposalKind: "ReportSham",
    proposalStatus: "Pending",
    votes: {
      approve: 39,
      reject: 87,
      remove: 43,
    },
    submissionTime: "2024-11-04T04:47:14.546Z",
  },
  {
    id: 41,
    image: "https://picsum.photos/seed/k9fBILkNA/734/3481?blur=1",
    proposer: "Senger - Rice",
    description: "Ace's personal info is fake",
    offender: "Violet Barton",
    proposalKind: "ReportSham",
    proposalStatus: "Pending",
    votes: {
      approve: 24,
      reject: 16,
      remove: 32,
    },
    submissionTime: "2024-11-03T19:18:18.057Z",
  },
  {
    id: 40,
    image: "https://picsum.photos/seed/pg2i9ap/562/1477?grayscale&blur=8",
    proposer: "Roberto Wintheiser",
    description: "Agency wants me to send them money for onboarding",
    offender: "Dickinson, Wilkinson and Koelpin",
    proposalKind: "ReportScam",
    proposalStatus: "Expired",
    votes: {
      approve: 98,
      reject: 96,
      remove: 54,
    },
    submissionTime: "2024-11-02T18:00:48.402Z",
  },
  {
    id: 39,
    image: "https://picsum.photos/seed/YSeD7pimEG/3556/2434?grayscale&blur=3",
    proposer: "Hazel Rutherford",
    description: "Agency is a sham and does not offer any services",
    offender: "Herzog, Windler and Bahringer",
    proposalKind: "ReportSham",
    proposalStatus: "Pending",
    votes: {
      approve: 74,
      reject: 41,
      remove: 35,
    },
    submissionTime: "2024-11-04T05:55:52.784Z",
  },
  {
    id: 38,
    image: "https://picsum.photos/seed/soaxm2e9NN/3464/3176?blur=1",
    proposer: "Darlene Crist",
    description: "Agency posts ghost listings",
    offender: "Romaguera - Glover",
    proposalKind: "ReportSpam",
    proposalStatus: "Pending",
    votes: {
      approve: 26,
      reject: 79,
      remove: 91,
    },
    submissionTime: "2024-11-03T21:46:02.123Z",
  },
  {
    id: 37,
    image: "https://picsum.photos/seed/mzADr/3953/2773?grayscale&blur=6",
    proposer: "Santos Emard",
    description: "",
    offender: "",
    proposalKind: "ChangePolicy",
    proposalStatus: "Approved",
    votes: {
      approve: 88,
      reject: 31,
      remove: 11,
    },
    submissionTime: "2024-11-02T23:51:22.552Z",
  },
  {
    id: 36,
    image: "https://picsum.photos/seed/yE351/3354/3325?blur=10",
    proposer: "Bashirian - Farrell",
    description: "Ace is a scammer trying to trick agencies.",
    offender: "Rodolfo Wunsch",
    proposalKind: "ReportScam",
    proposalStatus: "Removed",
    votes: {
      approve: 23,
      reject: 55,
      remove: 85,
    },
    submissionTime: "2024-11-02T21:55:40.961Z",
  },
  {
    id: 35,
    image: "https://picsum.photos/seed/LmBWYCq/3366/3516?grayscale&blur=3",
    proposer: "Zboncak, Rowe and Heidenreich",
    description: "Ace's personal info is fake",
    offender: "Gregg Reinger",
    proposalKind: "ReportSham",
    proposalStatus: "Pending",
    votes: {
      approve: 23,
      reject: 98,
      remove: 17,
    },
    submissionTime: "2024-11-04T05:29:19.610Z",
  },
  {
    id: 34,
    image: "https://picsum.photos/seed/YJSM2/2970/3608?grayscale&blur=3",
    proposer: "West, Abernathy and Stokes",
    description: "Ace keeps spamming gigs despite not matching the description",
    offender: "Raquel Little",
    proposalKind: "ReportSpam",
    proposalStatus: "Expired",
    votes: {
      approve: 63,
      reject: 67,
      remove: 66,
    },
    submissionTime: "2024-11-02T08:52:37.428Z",
  },
  {
    id: 33,
    image: "https://picsum.photos/seed/OKDgRoN/970/2200?blur=10",
    proposer: "Crona Inc",
    description: "Ace keeps spamming gigs despite not matching the description",
    offender: "Nathaniel Monahan",
    proposalKind: "ReportSpam",
    proposalStatus: "Pending",
    votes: {
      approve: 97,
      reject: 10,
      remove: 14,
    },
    submissionTime: "2024-11-04T01:49:47.102Z",
  },
  {
    id: 32,
    image: "https://picsum.photos/seed/zVDpE/1407/2241?blur=8",
    proposer: "Tommy Walter-Braun",
    description: "Agency posts ghost listings",
    offender: "Hegmann - Goyette",
    proposalKind: "ReportSpam",
    proposalStatus: "Removed",
    votes: {
      approve: 10,
      reject: 35,
      remove: 68,
    },
    submissionTime: "2024-11-02T16:52:46.331Z",
  },
  {
    id: 31,
    image: "https://picsum.photos/seed/xr7xiptK/1511/3040?blur=7",
    proposer: "Crooks, Douglas and Paucek",
    description: "Ace is a scammer trying to trick agencies.",
    offender: "Alberta Koelpin DVM",
    proposalKind: "ReportScam",
    proposalStatus: "Approved",
    votes: {
      approve: 80,
      reject: 16,
      remove: 30,
    },
    submissionTime: "2024-11-02T17:17:20.362Z",
  },
  {
    id: 30,
    image: "https://picsum.photos/seed/esqq0/1807/3343?blur=9",
    proposer: "Patricia D'Amore",
    description: "Agency posts ghost listings",
    offender: "Stehr and Sons",
    proposalKind: "ReportSpam",
    proposalStatus: "Expired",
    votes: {
      approve: 36,
      reject: 42,
      remove: 26,
    },
    submissionTime: "2024-11-02T14:21:11.017Z",
  },
  {
    id: 29,
    image: "https://picsum.photos/seed/FPk5RD/1255/3368?grayscale&blur=10",
    proposer: "Ron Hyatt",
    description: "",
    offender: "",
    proposalKind: "ChangePolicy",
    proposalStatus: "Pending",
    votes: {
      approve: 52,
      reject: 57,
      remove: 94,
    },
    submissionTime: "2024-11-04T01:51:05.518Z",
  },
  {
    id: 28,
    image: "https://picsum.photos/seed/yZfqMu/3750/3474?blur=8",
    proposer: "Purdy - Ullrich",
    description: "Ace is a scammer trying to trick agencies.",
    offender: "Lucas Hessel",
    proposalKind: "ReportScam",
    proposalStatus: "Expired",
    votes: {
      approve: 57,
      reject: 86,
      remove: 82,
    },
    submissionTime: "2024-11-02T18:15:48.568Z",
  },
  {
    id: 27,
    image: "https://picsum.photos/seed/CzALlSeN/1249/1304?grayscale&blur=2",
    proposer: "Carlton Doyle",
    description: "Agency is a sham and does not offer any services",
    offender: "Gerlach, Watsica and White",
    proposalKind: "ReportSham",
    proposalStatus: "Pending",
    votes: {
      approve: 94,
      reject: 7,
      remove: 38,
    },
    submissionTime: "2024-11-04T06:40:19.934Z",
  },
  {
    id: 26,
    image: "https://picsum.photos/seed/R2b09i/2786/374?blur=1",
    proposer: "Wm Greenfelder-Welch",
    description: "",
    offender: "",
    proposalKind: "ChangePolicy",
    proposalStatus: "Pending",
    votes: {
      approve: 86,
      reject: 5,
      remove: 26,
    },
    submissionTime: "2024-11-04T03:07:27.426Z",
  },
  {
    id: 25,
    image: "https://picsum.photos/seed/bI01Khd/461/1630?grayscale&blur=9",
    proposer: "Hilll, Aufderhar and Muller",
    description: "Ace's personal info is fake",
    offender: "Jason Collier",
    proposalKind: "ReportSham",
    proposalStatus: "Pending",
    votes: {
      approve: 73,
      reject: 22,
      remove: 12,
    },
    submissionTime: "2024-11-03T17:57:29.724Z",
  },
  {
    id: 24,
    image: "https://picsum.photos/seed/3xvm12bRH/2735/2928?grayscale&blur=7",
    proposer: "Bednar, Boehm and Turner",
    description: "Ace is a scammer trying to trick agencies.",
    offender: "Ida McKenzie",
    proposalKind: "ReportScam",
    proposalStatus: "Pending",
    votes: {
      approve: 63,
      reject: 29,
      remove: 15,
    },
    submissionTime: "2024-11-03T12:36:24.813Z",
  },
  {
    id: 23,
    image: "https://picsum.photos/seed/wiBD7/631/1453",
    proposer: "Lebsack LLC",
    description: "Ace keeps spamming gigs despite not matching the description",
    offender: "Rodolfo Gleason",
    proposalKind: "ReportSpam",
    proposalStatus: "Removed",
    votes: {
      approve: 2,
      reject: 39,
      remove: 99,
    },
    submissionTime: "2024-11-02T18:29:49.080Z",
  },
  {
    id: 22,
    image: "https://picsum.photos/seed/dI9gCDHCID/2600/2769?grayscale&blur=2",
    proposer: "Ms. Julie Kilback",
    description: "Agency is a sham and does not offer any services",
    offender: "Schumm and Sons",
    proposalKind: "ReportSham",
    proposalStatus: "Expired",
    votes: {
      approve: 5,
      reject: 35,
      remove: 32,
    },
    submissionTime: "2024-11-02T15:02:35.052Z",
  },
  {
    id: 21,
    image: "https://picsum.photos/seed/f3z09/1173/2323?blur=4",
    proposer: "Terry Cole-Dicki",
    description: "Agency is a sham and does not offer any services",
    offender: "Kozey - Parker",
    proposalKind: "ReportSham",
    proposalStatus: "Expired",
    votes: {
      approve: 61,
      reject: 56,
      remove: 68,
    },
    submissionTime: "2024-11-02T19:13:42.923Z",
  },
  {
    id: 20,
    image: "https://picsum.photos/seed/dc4jUwnBUM/2867/1821",
    proposer: "Hand, Goyette and Reichert",
    description: "Ace keeps spamming gigs despite not matching the description",
    offender: "Archie Zemlak",
    proposalKind: "ReportSpam",
    proposalStatus: "Pending",
    votes: {
      approve: 92,
      reject: 56,
      remove: 56,
    },
    submissionTime: "2024-11-03T10:54:55.271Z",
  },
  {
    id: 19,
    image: "https://picsum.photos/seed/YwcABh/3231/949?blur=6",
    proposer: "Waelchi - Predovic",
    description: "Ace is a scammer trying to trick agencies.",
    offender: "Dr. Roosevelt Leffler",
    proposalKind: "ReportScam",
    proposalStatus: "Expired",
    votes: {
      approve: 53,
      reject: 85,
      remove: 37,
    },
    submissionTime: "2024-11-02T15:35:33.390Z",
  },
  {
    id: 18,
    image: "https://picsum.photos/seed/mAbJkUox0g/2963/2828?blur=7",
    proposer: "Konopelski LLC",
    description: "Ace is a scammer trying to trick agencies.",
    offender: "Ella Altenwerth",
    proposalKind: "ReportScam",
    proposalStatus: "Removed",
    votes: {
      approve: 15,
      reject: 68,
      remove: 88,
    },
    submissionTime: "2024-11-03T06:53:17.389Z",
  },
  {
    id: 17,
    image: "https://picsum.photos/seed/qLyu8UoU/2512/2573?grayscale&blur=5",
    proposer: "Rudy Veum Sr.",
    description: "Agency posts ghost listings",
    offender: "Harvey, Jacobi and Halvorson",
    proposalKind: "ReportSpam",
    proposalStatus: "Removed",
    votes: {
      approve: 3,
      reject: 60,
      remove: 86,
    },
    submissionTime: "2024-11-03T05:45:45.694Z",
  },
  {
    id: 16,
    image: "https://picsum.photos/seed/uL0DbD/3615/2045?grayscale&blur=6",
    proposer: "Bergnaum and Sons",
    description: "Ace keeps spamming gigs despite not matching the description",
    offender: "Dr. Winston Grimes",
    proposalKind: "ReportSpam",
    proposalStatus: "Pending",
    votes: {
      approve: 58,
      reject: 27,
      remove: 93,
    },
    submissionTime: "2024-11-03T14:11:11.431Z",
  },
  {
    id: 15,
    image: "https://picsum.photos/seed/cOJi2Z/2254/1900?grayscale&blur=8",
    proposer: "Nancy Wunsch",
    description: "",
    offender: "",
    proposalKind: "ChangePolicy",
    proposalStatus: "Expired",
    votes: {
      approve: 22,
      reject: 20,
      remove: 31,
    },
    submissionTime: "2024-11-03T01:22:17.447Z",
  },
  {
    id: 14,
    image: "https://picsum.photos/seed/SbqoIHxS/1497/1609?blur=9",
    proposer: "Gloria Littel III",
    description: "",
    offender: "",
    proposalKind: "ChangePolicy",
    proposalStatus: "Expired",
    votes: {
      approve: 38,
      reject: 23,
      remove: 46,
    },
    submissionTime: "2024-11-03T04:59:50.113Z",
  },
  {
    id: 13,
    image: "https://picsum.photos/seed/8LlzN/1540/2535?blur=7",
    proposer: "Christopher Bruen",
    description: "",
    offender: "",
    proposalKind: "ChangePolicy",
    proposalStatus: "Expired",
    votes: {
      approve: 34,
      reject: 33,
      remove: 11,
    },
    submissionTime: "2024-11-03T07:47:10.024Z",
  },
  {
    id: 12,
    image: "https://picsum.photos/seed/oNfQA9f3/376/2042?blur=3",
    proposer: "Reichel - Watsica",
    description: "Ace keeps spamming gigs despite not matching the description",
    offender: "Michele Botsford",
    proposalKind: "ReportSpam",
    proposalStatus: "Expired",
    votes: {
      approve: 27,
      reject: 39,
      remove: 46,
    },
    submissionTime: "2024-11-02T23:19:12.808Z",
  },
  {
    id: 11,
    image: "https://picsum.photos/seed/lEcw4QvdhT/3171/677?grayscale",
    proposer: "Powlowski, Kunde and Hegmann",
    description: "Ace is a scammer trying to trick agencies.",
    offender: "Mr. Kelly Friesen",
    proposalKind: "ReportScam",
    proposalStatus: "Pending",
    votes: {
      approve: 41,
      reject: 100,
      remove: 20,
    },
    submissionTime: "2024-11-03T18:29:36.390Z",
  },
  {
    id: 10,
    image: "https://picsum.photos/seed/IRN1WB/2593/1225?blur=3",
    proposer: "Neil Feeney",
    description: "Agency wants me to send them money for onboarding",
    offender: "Dickinson, Cruickshank and Towne",
    proposalKind: "ReportScam",
    proposalStatus: "Expired",
    votes: {
      approve: 81,
      reject: 89,
      remove: 42,
    },
    submissionTime: "2024-11-02T20:42:28.454Z",
  },
  {
    id: 9,
    image: "https://picsum.photos/seed/cQWICKY/1778/151?blur=8",
    proposer: "Yolanda Watsica",
    description: "",
    offender: "",
    proposalKind: "ChangePolicy",
    proposalStatus: "Pending",
    votes: {
      approve: 42,
      reject: 2,
      remove: 14,
    },
    submissionTime: "2024-11-04T02:42:24.423Z",
  },
  {
    id: 8,
    image: "https://picsum.photos/seed/YcZDKhG/750/2747?grayscale&blur=10",
    proposer: "Julian Bins",
    description: "Agency is a sham and does not offer any services",
    offender: "Hand - Gleichner",
    proposalKind: "ReportSham",
    proposalStatus: "Expired",
    votes: {
      approve: 54,
      reject: 46,
      remove: 98,
    },
    submissionTime: "2024-11-03T00:03:37.978Z",
  },
  {
    id: 7,
    image: "https://picsum.photos/seed/S3kitw5Oob/2874/2339?blur=7",
    proposer: "Dickinson - Pouros",
    description: "Ace's personal info is fake",
    offender: "Muriel McDermott",
    proposalKind: "ReportSham",
    proposalStatus: "Rejected",
    votes: {
      approve: 13,
      reject: 92,
      remove: 45,
    },
    submissionTime: "2024-11-03T04:25:21.492Z",
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/a6uRbn/2037/903?grayscale&blur=8",
    proposer: "Irvin Nicolas",
    description: "",
    offender: "",
    proposalKind: "ChangePolicy",
    proposalStatus: "Expired",
    votes: {
      approve: 89,
      reject: 33,
      remove: 80,
    },
    submissionTime: "2024-11-02T21:11:25.805Z",
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/f7fIdVV9i/626/914?grayscale&blur=4",
    proposer: "Lindsay Gulgowski",
    description: "Agency wants me to send them money for onboarding",
    offender: "Abernathy, Larson and Haley",
    proposalKind: "ReportScam",
    proposalStatus: "Expired",
    votes: {
      approve: 83,
      reject: 86,
      remove: 10,
    },
    submissionTime: "2024-11-03T08:02:40.456Z",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/9FLQE4C/3493/2537",
    proposer: "Reginald Walsh",
    description: "",
    offender: "",
    proposalKind: "ChangePolicy",
    proposalStatus: "Expired",
    votes: {
      approve: 40,
      reject: 43,
      remove: 56,
    },
    submissionTime: "2024-11-03T02:02:07.216Z",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/ekifixIgF/1448/1219?grayscale&blur=1",
    proposer: "Lena Schmidt",
    description: "Agency is a sham and does not offer any services",
    offender: "Schowalter and Sons",
    proposalKind: "ReportSham",
    proposalStatus: "Pending",
    votes: {
      approve: 29,
      reject: 65,
      remove: 57,
    },
    submissionTime: "2024-11-03T20:18:56.508Z",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/Emcccfcv/1331/1014?blur=9",
    proposer: "Kohler, Quigley and Wisoky",
    description: "Ace keeps spamming gigs despite not matching the description",
    offender: "Ms. Kim Wintheiser",
    proposalKind: "ReportSpam",
    proposalStatus: "Expired",
    votes: {
      approve: 48,
      reject: 49,
      remove: 61,
    },
    submissionTime: "2024-11-02T18:05:14.686Z",
  },
  {
    id: 1,
    image: "https://picsum.photos/seed/2CMYlmfe/2317/510?grayscale&blur=8",
    proposer: "Emmerich - Schroeder",
    description: "Ace keeps spamming gigs despite not matching the description",
    offender: "Claire Kihn",
    proposalKind: "ReportSpam",
    proposalStatus: "Removed",
    votes: {
      approve: 35,
      reject: 19,
      remove: 78,
    },
    submissionTime: "2024-11-02T15:12:41.426Z",
  },
];

export function ProposalsTable() {
  return <DataTable columns={columns} data={data} />;
}
