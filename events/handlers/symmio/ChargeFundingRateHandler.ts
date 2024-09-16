import {ChargeFundingRate as ChargeFundingRateEntity} from "../../../generated/schema";
import {ethereum} from "@graphprotocol/graph-ts";
import {Version} from "../../../common/BaseHandler";

export class ChargeFundingRateHandler<T>  {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new ChargeFundingRateEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
		entity.partyB = event.params.partyB;
		entity.partyA = event.params.partyA;
		entity.quoteIds = event.params.quoteIds;
		entity.rates = event.params.rates;

		entity.blockTimestamp = event.block.timestamp;
		entity.transactionHash = event.transaction.hash;
		entity.save();
	}
}