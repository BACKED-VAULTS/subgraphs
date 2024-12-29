import {
    BaseTransfer,
    CancelWithdrawRequest,
    Deposit,
    DepositSLP ,
    RequestToWithdraw,
} from "../generated/bondToken_1/bondToken_1";
import {BondVersion} from "../common/BaseHandler";
import {DepositHandler} from "./handlers/bondToken/DepositHandler";
import {DepositSLPHandler} from "./handlers/bondToken/DepositSLPHandler";
import {RequestToWithdrawHandler} from "./handlers/bondToken/RequestToWithdrawHandler";
import {CancelWithdrawRequestHandler} from "./handlers/bondToken/CancelWithdrawRequestHandler";
import {BaseTransferHandler} from "./handlers/bondToken/BaseTransferHandler";

export function handleDeposit(event: Deposit): void {
    let handler = new DepositHandler<Deposit>()
    handler.handle(event, BondVersion.v_1)
}

export function handleDepositSLP(event: DepositSLP): void {
    let handler = new DepositSLPHandler<DepositSLP>()
    handler.handle(event, BondVersion.v_1)
}

export function handleRequestToWithdraw(event: RequestToWithdraw): void {
    let handler = new RequestToWithdrawHandler<RequestToWithdraw>()
    handler.handle(event, BondVersion.v_1)
}

export function handleCancelWithdrawRequest(event: CancelWithdrawRequest): void {
    let handler = new CancelWithdrawRequestHandler<CancelWithdrawRequest>()
    handler.handle(event, BondVersion.v_1)
}

export function handleBaseTransfer(event: BaseTransfer): void {
    let handler = new BaseTransferHandler<BaseTransfer>()
    handler.handle(event, BondVersion.v_1)
}
