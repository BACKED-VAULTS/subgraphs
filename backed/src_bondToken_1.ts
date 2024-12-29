import {
    BaseTransfer,
    CancelWithdrawRequest,
    Deposit,
    DepositSLP ,
    RequestToWithdraw,
} from "../generated/bondToken_1/bondToken_1";
import {BondVersion} from "../common/BaseHandler";
import {DepositEventHandler} from "./handlers/bondToken/DepositEventHandler";
import {DepositSLPEventHandler} from "./handlers/bondToken/DepositSLPEventHandler";
import {RequestToWithdrawEventHandler} from "./handlers/bondToken/RequestToWithdrawEventHandler";
import {CancelWithdrawRequestHandler} from "./handlers/bondToken/CancelWithdrawRequestHandler";
import {BaseTransferEventHandler} from "./handlers/bondToken/BaseTransferEventHandler";

// Handle Deposit Event
export function handleDeposit(event: Deposit): void {
    let handler = new DepositEventHandler<Deposit>()
    handler.handle(event, BondVersion.v_1)
}

// Handle Deposit SLP Event
export function handleDepositSLP(event: DepositSLP): void {
    let handler = new DepositSLPEventHandler<DepositSLP>()
    handler.handle(event, BondVersion.v_1)
}

// Handle Request to Withdraw Event
export function handleRequestToWithdraw(event: RequestToWithdraw): void {
    let handler = new RequestToWithdrawEventHandler<RequestToWithdraw>()
    handler.handle(event, BondVersion.v_1)
}

// Handle Cancel Withdraw Request Event
export function handleCancelWithdrawRequest(event: CancelWithdrawRequest): void {
    let handler = new CancelWithdrawRequestHandler<CancelWithdrawRequest>()
    handler.handle(event, BondVersion.v_1)
}

// Handle Base Transfer Event
export function handleBaseTransfer(event: BaseTransfer): void {
    let handler = new BaseTransferEventHandler<BaseTransfer>()
    handler.handle(event, BondVersion.v_1)
}
