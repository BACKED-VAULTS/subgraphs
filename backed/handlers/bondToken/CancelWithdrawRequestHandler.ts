import {ethereum} from "@graphprotocol/graph-ts"
import {BondVersion} from "../../../common/BaseHandler";
import {Withdraw} from "../../../generated/schema";
import {handleUser} from "../common/handleUser";


export class CancelWithdrawRequestHandler<T> {
    handle(_event: ethereum.Event, version: BondVersion): void {
        // @ts-ignore
        const event = changetype<T>(_event)
        const entityId = event.params.requestId.toString();
        let entity = Withdraw.load(entityId);
        if (entity) {
            entity.status = "CANCELED";
            entity.blockNumber = event.block.number;
            entity.blockTimestamp = event.block.timestamp;
            entity.transactionHash = event.transaction.hash;

            handleUser(event.params.receiver, entity.amount.div(entity.rebaseIndex), "ADD", entity.rebaseIndex);

            entity.save();
        } else {
            console.warn(`Withdraw request with ID ${entityId} not found`);
        }
    }
}
