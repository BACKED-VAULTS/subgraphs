import {Address, BigInt} from "@graphprotocol/graph-ts";
import {bondToken_1} from "../generated/bondToken_1/bondToken_1";

export function getCurrentRebaseIndex(addr: Address): BigInt {
    let contract = bondToken_1.bind(addr);
    return contract.rebaseIndex();
}

export function getCurrentContinuousRebaseIndexDeltaPerSecond(addr: Address): BigInt {
    let contract = bondToken_1.bind(addr);
    return contract.continuousRebaseIndexDeltaPerSecond();
}
