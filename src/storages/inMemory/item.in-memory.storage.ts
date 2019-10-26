
import { Storage } from "../storage.interface";
import { Item } from "../../models";
import { injectable } from "inversify";
import { v4 as uuid } from "uuid";

@injectable()

export class ItemInMemoryStorage implements Storage<Item> {
    private items: Item[];

    constructor() {
        this.items = [];
    }
    create(entity: Item): Promise<Item> {
        entity.id = uuid();
        this.items.push(entity);
        return Promise.resolve(entity);
    }
    update(entity: Item): Promise<Item> {
        const toUpdate = this.items.find(x => x.id === entity.id);
        toUpdate.description = entity.description;
        toUpdate.status = entity.status;
        toUpdate.members = entity.members;
        return Promise.resolve(toUpdate);
    }
    getById(id: string): Promise<Item> {
        const item = this.items.find(x => x.id === id);
        return Promise.resolve(item);
    }
    getAll(): Promise<Item[]> {
        throw new Error("Method not implemented.");
    }
    searchByFiler(filterProperty: string, filterValue: string): Promise<Item[]> {
        const items = this.items.filter(x => x[filterProperty] === filterValue);
        return Promise.resolve(items);
    }
}

export const itemInMemoryStorage = new ItemInMemoryStorage();