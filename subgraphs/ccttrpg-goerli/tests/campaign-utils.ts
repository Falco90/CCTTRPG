import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AbilityCheck,
  CharacterCreated,
  LevelUp,
  OwnershipTransferred
} from "../generated/Campaign/Campaign"

export function createAbilityCheckEvent(
  name: string,
  attribute: string,
  roll: BigInt,
  result: boolean
): AbilityCheck {
  let abilityCheckEvent = changetype<AbilityCheck>(newMockEvent())

  abilityCheckEvent.parameters = new Array()

  abilityCheckEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  abilityCheckEvent.parameters.push(
    new ethereum.EventParam("attribute", ethereum.Value.fromString(attribute))
  )
  abilityCheckEvent.parameters.push(
    new ethereum.EventParam("roll", ethereum.Value.fromUnsignedBigInt(roll))
  )
  abilityCheckEvent.parameters.push(
    new ethereum.EventParam("result", ethereum.Value.fromBoolean(result))
  )

  return abilityCheckEvent
}

export function createCharacterCreatedEvent(
  name: string,
  role: string
): CharacterCreated {
  let characterCreatedEvent = changetype<CharacterCreated>(newMockEvent())

  characterCreatedEvent.parameters = new Array()

  characterCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  characterCreatedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromString(role))
  )

  return characterCreatedEvent
}

export function createLevelUpEvent(
  name: string,
  level: BigInt,
  attribute1: string,
  value1: BigInt,
  attribute2: string,
  value2: BigInt,
  attribute3: string,
  value3: BigInt
): LevelUp {
  let levelUpEvent = changetype<LevelUp>(newMockEvent())

  levelUpEvent.parameters = new Array()

  levelUpEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  levelUpEvent.parameters.push(
    new ethereum.EventParam("level", ethereum.Value.fromUnsignedBigInt(level))
  )
  levelUpEvent.parameters.push(
    new ethereum.EventParam("attribute1", ethereum.Value.fromString(attribute1))
  )
  levelUpEvent.parameters.push(
    new ethereum.EventParam("value1", ethereum.Value.fromUnsignedBigInt(value1))
  )
  levelUpEvent.parameters.push(
    new ethereum.EventParam("attribute2", ethereum.Value.fromString(attribute2))
  )
  levelUpEvent.parameters.push(
    new ethereum.EventParam("value2", ethereum.Value.fromUnsignedBigInt(value2))
  )
  levelUpEvent.parameters.push(
    new ethereum.EventParam("attribute3", ethereum.Value.fromString(attribute3))
  )
  levelUpEvent.parameters.push(
    new ethereum.EventParam("value3", ethereum.Value.fromUnsignedBigInt(value3))
  )

  return levelUpEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
