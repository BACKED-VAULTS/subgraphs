import {Address, BigInt} from "@graphprotocol/graph-ts";
import {User} from "../../../generated/schema";

// Handle User Data Updates
export function handleUser(addr: Address, amount: BigInt, action: string, rebaseIndex: BigInt): void {
    if (action !== "ADD" && action !== "SUB") {
        throw new Error("Invalid action");
    }

    let entity = User.load(addr);
    let newBaseAmountBalance = new BigInt(0);

    if (!entity) {
        if (action === "SUB") {
            throw new Error("Cannot subtract from a non-existent user balance");
        }
        entity = new User(addr);
        entity.baseAmountBalance = amount;
        entity.avgRebaseIndex = rebaseIndex;
    } else {
        if (action === "ADD") {
            newBaseAmountBalance = entity.baseAmountBalance.plus(amount);
            entity.avgRebaseIndex = entity.avgRebaseIndex
                .times(entity.baseAmountBalance)
                .plus(rebaseIndex.times(amount))
                .div(newBaseAmountBalance);
        } else {
            newBaseAmountBalance = entity.baseAmountBalance.minus(amount);
            entity.avgRebaseIndex = newBaseAmountBalance.gt(BigInt.zero())
                ? entity.avgRebaseIndex
                    .times(entity.baseAmountBalance)
                    .minus(rebaseIndex.times(amount))
                    .div(newBaseAmountBalance)
                : BigInt.zero(); // Reset avgRebaseIndex to zero when balance becomes zero
        }

        entity.baseAmountBalance = newBaseAmountBalance;
    }

    entity.save();
}

