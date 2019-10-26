
import { Storage } from "../storage.interface";
import { User } from "../../models";
import { injectable } from "inversify";
import { v4 as uuid } from "uuid";

@injectable()
export class UserInMemoryStorage implements Storage<User> {

    private users: User[];

    constructor() {
        this.users = [];
    }
    create(entity: User): Promise<User> {
        entity.id = uuid();
        this.users.push(entity);
        return Promise.resolve(entity);
    }
    update(entity: User): Promise<User> {
        const toUpdate = this.users.find(x => x.id === entity.id);
        toUpdate.name = entity.name;
        return Promise.resolve(toUpdate);
    }
    getById(id: string): Promise<User> {
        const user = this.users.find(x => x.id === id);
        return Promise.resolve(user);
    }
    getAll(): Promise<User[]> {
        return Promise.resolve(this.users);
    }
    searchByFiler(filterProperty: string, filterValue: string): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
}

export const userInMemoryStorage = new UserInMemoryStorage();