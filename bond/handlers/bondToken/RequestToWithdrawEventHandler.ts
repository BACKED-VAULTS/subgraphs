import {ethereum} from "@graphprotocol/graph-ts"
import {BondVersion} from "../../../common/BaseHandler";
import {getCurrentRebaseIndex} from "../../utils";
import {Withdraw} from "../../../generated/schema";
import {handleUser} from "../common/handleUser";


export class RequestToWithdrawEventHandler<T> {
    handle(_event: ethereum.Event, version: BondVersion): void {
        // @ts-ignore
        const event = changetype<T>(_event)
        const currentRebaseIndex = getCurrentRebaseIndex(event.address);
        const entityId = event.params.requestId.toString();
        const entity = new Withdraw(entityId);

        entity.user = event.params.user;
        entity.amount = event.params.amount;
        entity.vaultTokenAmount = event.params.vaultTokenAmount;
        entity.continuousRebaseIndexDeltaPerSecond = event.params.continuousRebaseIndexDeltaPerSecond;
        entity.rebaseIndex = currentRebaseIndex;
        entity.status = "SUBMITTED";
        entity.blockNumber = event.block.number;
        entity.blockTimestamp = event.block.timestamp;
        entity.transactionHash = event.transaction.hash;

        handleUser(event.params.user, event.params.amount.div(currentRebaseIndex), "SUB", currentRebaseIndex);

        entity.save();
    }
}
