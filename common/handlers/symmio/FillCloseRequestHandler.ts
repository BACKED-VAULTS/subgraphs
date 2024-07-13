import {Quote} from "../../../generated/schema"
import {setEventTimestampAndTransactionHashAndAction} from "../../utils/quote&analitics&user"
import {BaseHandler, Version} from "../../BaseHandler"
import {ethereum} from "@graphprotocol/graph-ts";
import {getQuote as getQuote_0_8_2} from "../../../common/contract_utils_0_8_2";
import {getQuote as getQuote_0_8_0} from "../../../common/contract_utils_0_8_0";

export class FillCloseRequestHandler<T> extends BaseHandler {
	handleQuote(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		let quote = Quote.load(event.params.quoteId.toString())!
		quote.globalCounter = super.handleGlobalCounter()

		switch (version) {
			case Version.v_0_8_2: {
				let q = getQuote_0_8_2(event.address, event.params.quoteId)!
				quote.cva = q.lockedValues.cva
				quote.partyAmm = q.lockedValues.partyAmm
				quote.partyBmm = q.lockedValues.partyBmm
				quote.lf = q.lockedValues.lf
				break
			}
			case Version.v_0_8_0: {
				let q = getQuote_0_8_0(event.address, event.params.quoteId)!
				quote.cva = q.lockedValues.cva
				quote.partyAmm = q.lockedValues.mm
				quote.partyBmm = q.lockedValues.mm
				quote.lf = q.lockedValues.lf
				break
			}
		}

		quote.quoteId = event.params.quoteId
		quote.fillAmount = event.params.filledAmount
		quote.closedPrice = event.params.closedPrice
		quote.quoteStatus = event.params.quoteStatus
		quote.averageClosedPrice = (quote.closedAmount!.times(quote.averageClosedPrice!).plus(event.params.filledAmount.times(event.params.closedPrice))).div(quote.closedAmount!.plus(event.params.filledAmount))
		quote.closedAmount = quote.closedAmount!.plus(event.params.filledAmount)
		quote.save()
		setEventTimestampAndTransactionHashAndAction(quote.eventsTimestamp, 'FillCloseRequest', _event)
	}
}