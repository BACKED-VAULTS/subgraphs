import { PauseInternalTransfer as PauseInternalTransferEntity } from "../../../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"

export class PauseInternalTransferHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		let entity = new PauseInternalTransferEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())

		entity.counterId = getGlobalCounterAndInc()
		entity.transactionLogIndex = event.logIndex
		entity.blockHash = event.block.hash
		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
