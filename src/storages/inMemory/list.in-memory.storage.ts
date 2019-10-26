
import { Storage } from "../storage.interface";
import { List } from "../../models";
import { injectable } from "inversify";
import { v4 as uuid } from "uuid";

@injectable()
export class ListInMemoryStorage implements Storage<List> {

    private lists: List[];

    constructor() {
        this.lists = [];
    }
    create(entity: List): Promise<List> {
        entity.id = uuid();
        this.lists.push(entity);
        return Promise.resolve(entity);
    }
    update(entity: List): Promise<List> {
        const index = this.lists.findIndex(x => x.id === entity.id);
        this.lists[index].name = entity.name;
        return Promise.resolve(this.lists[index]);
    }
    getById(id: string): Promise<List> {
        const list = this.lists.find(x => x.id === id);
        return Promise.resolve(list);
    }
    getAll(): Promise<List[]> {
        return Promise.resolve(this.lists);
    }

    searchByFiler(filterProperty: string, filterValue: string): Promise<List[]> {
        const lists = this.lists.filter(x => x[filterProperty] === filterValue);
        return Promise.resolve(lists);
    }
}

export const listInMemoryStorage = new ListInMemoryStorage();