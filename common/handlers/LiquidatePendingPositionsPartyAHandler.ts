import { BaseHandler } from "./BaseHandler"
import { LiquidatePendingPositionsPartyA } from "../../generated/symmio/symmio"

export class LiquidatePendingPositionsPartyAHandler extends BaseHandler {
	protected event: LiquidatePendingPositionsPartyA

	constructor(event: LiquidatePendingPositionsPartyA) {
		super(event)
		this.event = event
	}

	protected getEvent(): LiquidatePendingPositionsPartyA {
		return this.event
	}

	handle(): void {
	}

	handleQuote(): void {
		// TODO
	}
}