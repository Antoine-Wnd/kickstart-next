import React from "react";
import { TableCell, TableRow } from "./ui/table";
//@ts-ignore
import web3 from "../../ethereum/web3";

function RequestRow({ id, request }: any) {
  return (
    <TableRow className="text-white">
      <TableCell className="font-medium">{id}</TableCell>
      <TableCell>{request.description}</TableCell>
      <TableCell>
        {
          //@ts-ignore
          web3.utils.fromWei(Number(request.value), "ether")
        }
      </TableCell>
      <TableCell>{request.recipient}</TableCell>
      <TableCell>{Number(request.approvalCount)}</TableCell>
      <TableCell>Approve</TableCell>
      <TableCell>Finalize</TableCell>
    </TableRow>
  );
}

export default RequestRow;
