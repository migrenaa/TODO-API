import "reflect-metadata";
import * as dotenv from "dotenv";
import { container } from "./inversify.config";

import { App } from "./app";
import { LoggerService } from "./services/logger.service";
import { Storage, UserInMemoryStorage } from "./storages"
import { User, Item, List } from "./models";
import { ItemInMemoryStorage, ListInMemoryStorage } from "./storages/inMemory";


// initialize configuration
dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

// TODO fix
// switch (process.env.STORAGE_TYPE) {
//   case "in-memory":
//     container.bind<Storage<User>>("UserStorage").to(UserInMemoryStorage);
//     container.bind<Storage<List>>("ListStorage").to(ListInMemoryStorage);
//     container.bind<Storage<Item>>("ItemStorage").to(ItemInMemoryStorage);
//     break;
//   default: 
//     throw Error("Storage type not implemented yet.");
// }
const application = container.get<App>(App);
const logger = container.get<LoggerService>(LoggerService);

application.app.listen(PORT, () => {
  logger.info("TODO API is listening on port " + PORT);
});
