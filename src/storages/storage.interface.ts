import { injectable } from "inversify";

/**
 * Represents storage service.
 * May be adapted for different types 
 * (Item/List/User)
 * @interface
*/
export interface Storage<T> {

    /**
     * Creates an entity
     * @async
     * @param  {T} entity The entity's object
     * @returns {Promise<T>} Returns a promise for a Entity
     */
    create(entity: T): Promise<T>;

    /**
     * Updates a entity
     * @async
     * @param  {T} entity entity to update
     * @returns {Promise<T>} Returns a promise for a entity object
     */
    update(entity: T): Promise<T>;

    /**
     * Retrieves a entity by unique identifier
     * @async
     * @param  {string} id id to find the entity by
     * @returns {Promise<T>} Returns a promise for a entity object
     */
    getById(uuid: string): Promise<T>;

    /**
     * Retrieves all entitys
     * @async
     * @returns {Promise<T[]>} Returns a promise for a entitys
     */
    getAll(): Promise<T[]>;

    /**
     * Searches for entitys based on a property filter
     * @async
     * @param {string} filterProperty The property by which to search
     * @param {string} filterValue The desired value of the property
     * @returns {Promise<T[]>} Returns a promise for an entity array
     */
    searchByFiler(filterProperty: string, filterValue: string): Promise<T[]>;
}
