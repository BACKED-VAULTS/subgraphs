import { ForceCancelCloseRequest as ForceCancelCloseRequestEntity } from "../../../generated/schema"
import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { ForceCancelCloseRequest as ForceCancelCloseRequest_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"
import { ForceCancelCloseRequest as ForceCancelCloseRequest_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"

export class ForceCancelCloseRequestHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new ForceCancelCloseRequestEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.quoteId = event.params.quoteId
		entity.quoteStatus = event.params.quoteStatus

		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<ForceCancelCloseRequest_8_4>(_event)
				entity.closeId = e.params.closeId
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<ForceCancelCloseRequest_8_3>(_event)
				entity.closeId = e.params.closeId
				break
			}
			default: {
				entity.closeId = BigInt.zero()
				break
			}
		}

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
