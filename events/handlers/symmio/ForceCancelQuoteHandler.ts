import {ForceCancelQuote as ForceCancelQuoteEntity} from "../../../generated/schema";
import {ethereum} from "@graphprotocol/graph-ts";
import {Version} from "../../../common/BaseHandler";

export class ForceCancelQuoteHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new ForceCancelQuoteEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
		entity.quoteId = event.params.quoteId;
		entity.quoteStatus = event.params.quoteStatus;

		entity.blockTimestamp = event.block.timestamp;
		entity.transactionHash = event.transaction.hash;
		entity.save();
	}
}