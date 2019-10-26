
/**
 * @swagger
 * definitions:
 *  Item:
 *      type: object
 *      required:
 *          - listId
 *          - description
 *          - status
 *      properties:
 *            listId:
 *              type: string
 *            description:
 *              type: string
 *            status:
 *              type: string
 *              enum: [new, done]
 *            members:
 *              type: array
 *              items: 
 *                type: string
 */
export class Item {
    id: string;
    listId: string;
    description: string;
    status: ItemStatus;
    members: string[]; 
}

export enum ItemStatus {
    new = "new", 
    done = "done"
}