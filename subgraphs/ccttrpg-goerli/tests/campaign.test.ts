import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { AbilityCheck } from "../generated/schema"
import { AbilityCheck as AbilityCheckEvent } from "../generated/Campaign/Campaign"
import { handleAbilityCheck } from "../src/campaign"
import { createAbilityCheckEvent } from "./campaign-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let name = "Example string value"
    let attribute = "Example string value"
    let roll = BigInt.fromI32(234)
    let result = "boolean Not implemented"
    let newAbilityCheckEvent = createAbilityCheckEvent(
      name,
      attribute,
      roll,
      result
    )
    handleAbilityCheck(newAbilityCheckEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AbilityCheck created and stored", () => {
    assert.entityCount("AbilityCheck", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AbilityCheck",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "AbilityCheck",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "attribute",
      "Example string value"
    )
    assert.fieldEquals(
      "AbilityCheck",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "roll",
      "234"
    )
    assert.fieldEquals(
      "AbilityCheck",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "result",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
