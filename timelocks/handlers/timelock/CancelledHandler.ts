import {ethereum} from "@graphprotocol/graph-ts"
import {TimelockVersion} from "../../../common/BaseHandler"
import {Cancelled} from "../../../generated/schema"

export class CancelledHandler<T> {
	handle(_event: ethereum.Event, version: TimelockVersion): void {
		// @ts-ignore
		const event = changetype<T>(_event)
        let cancel = new Cancelled(event.params.id.toHexString() + "-" + event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		cancel.timestamp = event.block.timestamp
		cancel.address = event.address
		cancel.save()
	}
}
