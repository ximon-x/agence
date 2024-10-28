export default async function TransactionsPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  const { transactionHashes, account_id } = searchParams;
  console.log({ transactionHashes, account_id });

  return <>Transactions</>;
}
