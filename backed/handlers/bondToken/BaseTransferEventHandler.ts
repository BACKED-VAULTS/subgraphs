import {ethereum} from "@graphprotocol/graph-ts"
import {BondVersion} from "../../../common/BaseHandler";
import {getCurrentRebaseIndex} from "../../utils";
import {BaseTransfer} from "../../../generated/schema";
import {handleUser} from "../common/handleUser";


export class BaseTransferEventHandler<T> {
    handle(_event: ethereum.Event, version: BondVersion): void {
        // @ts-ignore
        const event = changetype<T>(_event)
        const currentRebaseIndex = getCurrentRebaseIndex(event.address);
        const entity = new BaseTransfer(event.transaction.hash.concatI32(event.logIndex.toI32()));

        entity.from = event.params.from;
        entity.to = event.params.to;
        entity.baseAmount = event.params.baseAmount;
        entity.amount = event.params.amount;
        entity.blockNumber = event.block.number;
        entity.blockTimestamp = event.block.timestamp;
        entity.transactionHash = event.transaction.hash;

        handleUser(event.params.from, event.params.amount.div(currentRebaseIndex), "SUB", currentRebaseIndex);
        handleUser(event.params.to, event.params.amount.div(currentRebaseIndex), "ADD", currentRebaseIndex);

        entity.save();
    }
}
