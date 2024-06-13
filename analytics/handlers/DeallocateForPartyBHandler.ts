import { DeallocateForPartyBHandler as CommonDeallocateForPartyBHandler } from "../../common/handlers/DeallocateForPartyBHandler"
import { DeallocateForPartyB } from "../../generated/symmio/symmio"

export class DeallocateForPartyBHandler extends CommonDeallocateForPartyBHandler {

	constructor(event: DeallocateForPartyB) {
		super(event)
	}

	handle(): void {
		super.handle()
		const globalCounter = super.handleGlobalCounter()
		super.handleQuote()
		super.handleSymbol()
		super.handleUser()
		super.handleAccount()
	}
}