// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AbilityCheck extends ethereum.Event {
  get params(): AbilityCheck__Params {
    return new AbilityCheck__Params(this);
  }
}

export class AbilityCheck__Params {
  _event: AbilityCheck;

  constructor(event: AbilityCheck) {
    this._event = event;
  }

  get name(): string {
    return this._event.parameters[0].value.toString();
  }

  get attribute(): string {
    return this._event.parameters[1].value.toString();
  }

  get roll(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get result(): boolean {
    return this._event.parameters[3].value.toBoolean();
  }
}

export class CharacterCreated extends ethereum.Event {
  get params(): CharacterCreated__Params {
    return new CharacterCreated__Params(this);
  }
}

export class CharacterCreated__Params {
  _event: CharacterCreated;

  constructor(event: CharacterCreated) {
    this._event = event;
  }

  get name(): string {
    return this._event.parameters[0].value.toString();
  }

  get role(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class LevelUp extends ethereum.Event {
  get params(): LevelUp__Params {
    return new LevelUp__Params(this);
  }
}

export class LevelUp__Params {
  _event: LevelUp;

  constructor(event: LevelUp) {
    this._event = event;
  }

  get name(): string {
    return this._event.parameters[0].value.toString();
  }

  get level(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get attribute1(): string {
    return this._event.parameters[2].value.toString();
  }

  get value1(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get attribute2(): string {
    return this._event.parameters[4].value.toString();
  }

  get value2(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get attribute3(): string {
    return this._event.parameters[6].value.toString();
  }

  get value3(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Campaign__getCharacterInventoryResultValue0Struct extends ethereum.Tuple {
  get items(): Array<Campaign__getCharacterInventoryResultValue0ItemsStruct> {
    return this[0].toTupleArray<
      Campaign__getCharacterInventoryResultValue0ItemsStruct
    >();
  }

  get equipment(): Array<
    Campaign__getCharacterInventoryResultValue0EquipmentStruct
  > {
    return this[1].toTupleArray<
      Campaign__getCharacterInventoryResultValue0EquipmentStruct
    >();
  }
}

export class Campaign__getCharacterInventoryResultValue0ItemsStruct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get itemType(): i32 {
    return this[1].toI32();
  }

  get cid(): string {
    return this[2].toString();
  }
}

export class Campaign__getCharacterInventoryResultValue0EquipmentStruct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get itemType(): i32 {
    return this[1].toI32();
  }

  get cid(): string {
    return this[2].toString();
  }
}

export class Campaign__itemLibraryResult {
  value0: string;
  value1: i32;
  value2: string;

  constructor(value0: string, value1: i32, value2: string) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set(
      "value1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value1))
    );
    map.set("value2", ethereum.Value.fromString(this.value2));
    return map;
  }

  getName(): string {
    return this.value0;
  }

  getItemType(): i32 {
    return this.value1;
  }

  getCid(): string {
    return this.value2;
  }
}

export class Campaign extends ethereum.SmartContract {
  static bind(address: Address): Campaign {
    return new Campaign("Campaign", address);
  }

  abilityCheck(
    character: Address,
    attribute: string,
    difficulty: BigInt
  ): boolean {
    let result = super.call(
      "abilityCheck",
      "abilityCheck(address,string,uint256):(bool)",
      [
        ethereum.Value.fromAddress(character),
        ethereum.Value.fromString(attribute),
        ethereum.Value.fromUnsignedBigInt(difficulty)
      ]
    );

    return result[0].toBoolean();
  }

  try_abilityCheck(
    character: Address,
    attribute: string,
    difficulty: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "abilityCheck",
      "abilityCheck(address,string,uint256):(bool)",
      [
        ethereum.Value.fromAddress(character),
        ethereum.Value.fromString(attribute),
        ethereum.Value.fromUnsignedBigInt(difficulty)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getCharacterAttribute(character: Address, attribute: string): BigInt {
    let result = super.call(
      "getCharacterAttribute",
      "getCharacterAttribute(address,string):(uint256)",
      [
        ethereum.Value.fromAddress(character),
        ethereum.Value.fromString(attribute)
      ]
    );

    return result[0].toBigInt();
  }

  try_getCharacterAttribute(
    character: Address,
    attribute: string
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getCharacterAttribute",
      "getCharacterAttribute(address,string):(uint256)",
      [
        ethereum.Value.fromAddress(character),
        ethereum.Value.fromString(attribute)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getCharacterAvatar(character: Address): Array<string> {
    let result = super.call(
      "getCharacterAvatar",
      "getCharacterAvatar(address):(string[3])",
      [ethereum.Value.fromAddress(character)]
    );

    return result[0].toStringArray();
  }

  try_getCharacterAvatar(
    character: Address
  ): ethereum.CallResult<Array<string>> {
    let result = super.tryCall(
      "getCharacterAvatar",
      "getCharacterAvatar(address):(string[3])",
      [ethereum.Value.fromAddress(character)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toStringArray());
  }

  getCharacterInventory(
    character: Address
  ): Campaign__getCharacterInventoryResultValue0Struct {
    let result = super.call(
      "getCharacterInventory",
      "getCharacterInventory(address):(((string,uint8,string)[],(string,uint8,string)[]))",
      [ethereum.Value.fromAddress(character)]
    );

    return changetype<Campaign__getCharacterInventoryResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getCharacterInventory(
    character: Address
  ): ethereum.CallResult<Campaign__getCharacterInventoryResultValue0Struct> {
    let result = super.tryCall(
      "getCharacterInventory",
      "getCharacterInventory(address):(((string,uint8,string)[],(string,uint8,string)[]))",
      [ethereum.Value.fromAddress(character)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Campaign__getCharacterInventoryResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getPlayers(): Array<Address> {
    let result = super.call("getPlayers", "getPlayers():(address[])", []);

    return result[0].toAddressArray();
  }

  try_getPlayers(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall("getPlayers", "getPlayers():(address[])", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  itemLibrary(param0: string): Campaign__itemLibraryResult {
    let result = super.call(
      "itemLibrary",
      "itemLibrary(string):(string,uint8,string)",
      [ethereum.Value.fromString(param0)]
    );

    return new Campaign__itemLibraryResult(
      result[0].toString(),
      result[1].toI32(),
      result[2].toString()
    );
  }

  try_itemLibrary(
    param0: string
  ): ethereum.CallResult<Campaign__itemLibraryResult> {
    let result = super.tryCall(
      "itemLibrary",
      "itemLibrary(string):(string,uint8,string)",
      [ethereum.Value.fromString(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Campaign__itemLibraryResult(
        value[0].toString(),
        value[1].toI32(),
        value[2].toString()
      )
    );
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  rollDie(sides: BigInt): BigInt {
    let result = super.call("rollDie", "rollDie(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(sides)
    ]);

    return result[0].toBigInt();
  }

  try_rollDie(sides: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("rollDie", "rollDie(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(sides)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get initialOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AbilityCheckCall extends ethereum.Call {
  get inputs(): AbilityCheckCall__Inputs {
    return new AbilityCheckCall__Inputs(this);
  }

  get outputs(): AbilityCheckCall__Outputs {
    return new AbilityCheckCall__Outputs(this);
  }
}

export class AbilityCheckCall__Inputs {
  _call: AbilityCheckCall;

  constructor(call: AbilityCheckCall) {
    this._call = call;
  }

  get character(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get attribute(): string {
    return this._call.inputValues[1].value.toString();
  }

  get difficulty(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class AbilityCheckCall__Outputs {
  _call: AbilityCheckCall;

  constructor(call: AbilityCheckCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class AddPlayerCall extends ethereum.Call {
  get inputs(): AddPlayerCall__Inputs {
    return new AddPlayerCall__Inputs(this);
  }

  get outputs(): AddPlayerCall__Outputs {
    return new AddPlayerCall__Outputs(this);
  }
}

export class AddPlayerCall__Inputs {
  _call: AddPlayerCall;

  constructor(call: AddPlayerCall) {
    this._call = call;
  }

  get playerAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddPlayerCall__Outputs {
  _call: AddPlayerCall;

  constructor(call: AddPlayerCall) {
    this._call = call;
  }
}

export class CreateCharacterCall extends ethereum.Call {
  get inputs(): CreateCharacterCall__Inputs {
    return new CreateCharacterCall__Inputs(this);
  }

  get outputs(): CreateCharacterCall__Outputs {
    return new CreateCharacterCall__Outputs(this);
  }
}

export class CreateCharacterCall__Inputs {
  _call: CreateCharacterCall;

  constructor(call: CreateCharacterCall) {
    this._call = call;
  }

  get name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get roleId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get contractAddress(): string {
    return this._call.inputValues[2].value.toString();
  }

  get tokenId(): string {
    return this._call.inputValues[3].value.toString();
  }

  get _strength(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _intelligence(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get _dexterity(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }

  get _constitution(): BigInt {
    return this._call.inputValues[7].value.toBigInt();
  }

  get _charisma(): BigInt {
    return this._call.inputValues[8].value.toBigInt();
  }
}

export class CreateCharacterCall__Outputs {
  _call: CreateCharacterCall;

  constructor(call: CreateCharacterCall) {
    this._call = call;
  }
}

export class CreateItemCall extends ethereum.Call {
  get inputs(): CreateItemCall__Inputs {
    return new CreateItemCall__Inputs(this);
  }

  get outputs(): CreateItemCall__Outputs {
    return new CreateItemCall__Outputs(this);
  }
}

export class CreateItemCall__Inputs {
  _call: CreateItemCall;

  constructor(call: CreateItemCall) {
    this._call = call;
  }

  get name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get kind(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get cid(): string {
    return this._call.inputValues[2].value.toString();
  }
}

export class CreateItemCall__Outputs {
  _call: CreateItemCall;

  constructor(call: CreateItemCall) {
    this._call = call;
  }
}

export class GiveItemCall extends ethereum.Call {
  get inputs(): GiveItemCall__Inputs {
    return new GiveItemCall__Inputs(this);
  }

  get outputs(): GiveItemCall__Outputs {
    return new GiveItemCall__Outputs(this);
  }
}

export class GiveItemCall__Inputs {
  _call: GiveItemCall;

  constructor(call: GiveItemCall) {
    this._call = call;
  }

  get character(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get itemName(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class GiveItemCall__Outputs {
  _call: GiveItemCall;

  constructor(call: GiveItemCall) {
    this._call = call;
  }
}

export class LevelUpCall extends ethereum.Call {
  get inputs(): LevelUpCall__Inputs {
    return new LevelUpCall__Inputs(this);
  }

  get outputs(): LevelUpCall__Outputs {
    return new LevelUpCall__Outputs(this);
  }
}

export class LevelUpCall__Inputs {
  _call: LevelUpCall;

  constructor(call: LevelUpCall) {
    this._call = call;
  }

  get character(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class LevelUpCall__Outputs {
  _call: LevelUpCall;

  constructor(call: LevelUpCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateAttributeCall extends ethereum.Call {
  get inputs(): UpdateAttributeCall__Inputs {
    return new UpdateAttributeCall__Inputs(this);
  }

  get outputs(): UpdateAttributeCall__Outputs {
    return new UpdateAttributeCall__Outputs(this);
  }
}

export class UpdateAttributeCall__Inputs {
  _call: UpdateAttributeCall;

  constructor(call: UpdateAttributeCall) {
    this._call = call;
  }

  get character(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get attribute(): string {
    return this._call.inputValues[1].value.toString();
  }

  get value(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class UpdateAttributeCall__Outputs {
  _call: UpdateAttributeCall;

  constructor(call: UpdateAttributeCall) {
    this._call = call;
  }
}
