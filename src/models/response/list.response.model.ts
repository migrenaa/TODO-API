import { Item } from "../../models";


/**
 * @swagger
 * definitions:
 *  ListResponseModel:
 *      type: object
 *      required:
 *          - id
 *          - name
 *          - items
 *      properties:
 *            id:
 *              type: string
 *            name:
 *              type: string
 *            items:
 *              type: array
 *              items: 
 *                $ref: '#/definitions/Item'
 */
export class ListResponseModel {
    id: string;
    name: string;
    items: Item[];
}