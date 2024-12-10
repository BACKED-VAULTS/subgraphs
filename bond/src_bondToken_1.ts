import {
    BaseTransfer as BaseTransferEvent,
    CancelWithdrawRequest,
    Deposit as DepositEvent,
    DepositSLP as DepositSLPEvent,
    RequestToWithdraw as RequestToWithdrawEvent,
} from "../generated/bondToken_1/bondToken_1";
import {BondVersion} from "../common/BaseHandler";
import {DepositEventHandler} from "./handlers/bondToken/DepositEventHandler";
import {DepositSLPEventHandler} from "./handlers/bondToken/DepositSLPEventHandler";
import {RequestToWithdrawEventHandler} from "./handlers/bondToken/RequestToWithdrawEventHandler";
import {CancelWithdrawRequestHandler} from "./handlers/bondToken/CancelWithdrawRequestHandler";
import {BaseTransferEventHandler} from "./handlers/bondToken/BaseTransferEventHandler";

// Handle Deposit Event
export function handleDeposit(event: DepositEvent): void {
    let handler = new DepositEventHandler<DepositEvent>()
    handler.handle(event, BondVersion.v_1)
}

// Handle Deposit SLP Event
export function handleDepositSLP(event: DepositSLPEvent): void {
    let handler = new DepositSLPEventHandler<DepositSLPEvent>()
    handler.handle(event, BondVersion.v_1)
}

// Handle Request to Withdraw Event
export function handleRequestToWithdraw(event: RequestToWithdrawEvent): void {
    let handler = new RequestToWithdrawEventHandler<RequestToWithdrawEvent>()
    handler.handle(event, BondVersion.v_1)
}

// Handle Cancel Withdraw Request Event
export function handleCancelWithdrawRequest(event: CancelWithdrawRequest): void {
    let handler = new CancelWithdrawRequestHandler<CancelWithdrawRequest>()
    handler.handle(event, BondVersion.v_1)
}

// Handle Base Transfer Event
export function handleBaseTransfer(event: BaseTransferEvent): void {
    let handler = new BaseTransferEventHandler<BaseTransferEvent>()
    handler.handle(event, BondVersion.v_1)
}
