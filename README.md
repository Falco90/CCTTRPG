# CrossChain TableTop RPG
The aim of this project is to create a decentralized crosschain tabletop experience (e.g. like Dungeons & Dragons )
The gamemechanics are stored in the Campaign contract which is owned by the GameMaster. Standard tabletop mechanics are included in the contract like ability checks through dicerolls, leveling up, finding items and treasure etcetera. This is all done by the GameMaster through storing objects and files on FileCoin through the Lighthouse.storage SDK. The cids of these objects (items, messages, equipment etc.) are stored in the item library on the contract. When creating an item, the GameMaster can choose to keep it open for all players, or encrypt it and only give some players access (secret information/messages for instance).

In the web-app the players can create a character, chat in a chatbox provided by PUSH Protocol and decrypt item cids provided by the game master. The game master can use the web-app to create and items, perform ability checks for players, and share messages and cids through the chat. A subgraph of the contract fills the Event Log with information of ingame events like whenever an ability check happens, a character is created etc.

## Sponsor technologies used:
-Filecoin/Lighthouse SDK for file storage, encryption/decryption </br>
-The Graph subgraph for querying in-game events, </br>
-Push Protocol for the group chat between players, </br>
-Smart Contract deployed on Scroll </br>