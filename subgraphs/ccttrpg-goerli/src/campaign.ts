import {
  AbilityCheck as AbilityCheckEvent,
  CharacterCreated as CharacterCreatedEvent,
  LevelUp as LevelUpEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/Campaign/Campaign"
import {
  AbilityCheck,
  CharacterCreated,
  LevelUp,
  OwnershipTransferred
} from "../generated/schema"

export function handleAbilityCheck(event: AbilityCheckEvent): void {
  let entity = new AbilityCheck(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.attribute = event.params.attribute
  entity.roll = event.params.roll
  entity.result = event.params.result

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCharacterCreated(event: CharacterCreatedEvent): void {
  let entity = new CharacterCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.role = event.params.role

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLevelUp(event: LevelUpEvent): void {
  let entity = new LevelUp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.level = event.params.level
  entity.attribute1 = event.params.attribute1
  entity.value1 = event.params.value1
  entity.attribute2 = event.params.attribute2
  entity.value2 = event.params.value2
  entity.attribute3 = event.params.attribute3
  entity.value3 = event.params.value3

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
