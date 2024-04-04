import React from "react";
import { TableCell, TableRow } from "./ui/table";
//@ts-ignore
import web3 from "../../ethereum/web3";
import { Button } from "./ui/button";
import campaign from "../../ethereum/campaign";

function RequestRow({ id, request, approversCount, address }: any) {
  const onApprove = async () => {
    //@ts-ignore
    const accounts = await web3.eth.getAccounts();
    const selectedCampaign = campaign(address.slug);
    await selectedCampaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
  };

  const onFinalize = async () => {
    //@ts-ignore
    const accounts = await web3.eth.getAccounts();
    const selectedCampaign = campaign(address.slug);
    await selectedCampaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
  };

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
      <TableCell>
        {Number(request.approvalCount)} / {Number(approversCount)}
      </TableCell>
      <TableCell>
        <Button variant={"green"} onClick={onApprove}>
          Approuver
        </Button>
      </TableCell>
      <TableCell>
        <Button variant={"yellow"} onClick={onFinalize}>
          Finaliser
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default RequestRow;
