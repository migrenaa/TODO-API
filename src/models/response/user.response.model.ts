import { List } from "../../models";

/**
 * @swagger
 * definitions:
 *  UserResponseModel:
 *      type: object
 *      required:
 *          - id
 *          - name
 *      properties:
 *            id:
 *              type: string
 *            name:
 *              type: string
 *            lists:
 *              type: array
 *              items: 
 *                $ref: '#/definitions/List'
 */
export class UserResponseModel {
    id: string;
    name: string;
    lists: List[];
}