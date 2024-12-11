import {ethereum} from "@graphprotocol/graph-ts"
import {BondVersion} from "../../../common/BaseHandler";
import {getCurrentRebaseIndex} from "../../utils";
import {Deposit} from "../../../generated/schema";
import {handleUser} from "../common/handleUser";


export class DepositSLPEventHandler<T> {
    handle(_event: ethereum.Event, version: BondVersion): void {
        // @ts-ignore
        const event = changetype<T>(_event)
        const currentRebaseIndex = getCurrentRebaseIndex(event.address);
        const entityId = event.transaction.hash.concatI32(event.logIndex.toI32());
        const entity = new Deposit(entityId);

        entity.user = event.params.user;
        entity.sender = event.params.sender;
        entity.amount = event.params.amount;
        entity.continuousRebaseIndexDeltaPerSecond = event.params.continuousRebaseIndexDeltaPerSecond;
        entity.rebaseIndex = currentRebaseIndex;
        entity.type = "SLP";
        entity.blockNumber = event.block.number;
        entity.blockTimestamp = event.block.timestamp;
        entity.transactionHash = event.transaction.hash;

        handleUser(event.params.user, event.params.amount.div(currentRebaseIndex), "ADD", currentRebaseIndex);

        entity.save();
    }
}
