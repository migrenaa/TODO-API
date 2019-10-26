/**
 * @swagger
 * definitions:
 *  User:
 *      type: object
 *      required:
 *          - name
 *      properties:
 *            name:
 *              type: string
 */
export class User {
    id: string;
    name: string;
}