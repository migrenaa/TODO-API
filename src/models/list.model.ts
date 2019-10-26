import { Item } from "./item.model";


/**
 * @swagger
 * definitions:
 *  List:
 *      type: object
 *      required:
 *          - name
 *          - items
 *      properties:
 *            name:
 *              type: string
 */
export class List {
    id: string;
    name: string;
    ownerId: string;
}