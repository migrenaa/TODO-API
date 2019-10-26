import { Request, Response } from "express";
import { injectable } from "inversify";
import { User, List, UserResponseModel, Item } from "../models";
import { Storage, userInMemoryStorage, listInMemoryStorage, itemInMemoryStorage } from "../storages";
import { ListResponseModel } from "../models/";

@injectable()
export class UserController {

  private readonly userStorage: Storage<User>;
  private readonly listStorage: Storage<List>;
  private readonly itemStorage: Storage<Item>;
  constructor() {
    this.userStorage = userInMemoryStorage;
    this.listStorage = listInMemoryStorage;
    this.itemStorage = itemInMemoryStorage;
  }


  /**
   * @swagger
   * /user:
   *  post:
   *      description: Creates a user
   *      parameters:
   *          - name: user
   *            type: User
   *            in: body
   *            schema:
   *               $ref: '#/definitions/User'
   *      tags:
   *          - User
   *      produces:
   *          - application/json
   *      responses:
   *          200:
   *              description: OK
   *          400:
   *              description: Invalid payload!
   *          500:
   *              description: Server error
   */
  public create = async (req: Request, res: Response) => {
    const user: User = req.body;
    if (!user) {
      return res.status(400).send({ message: "User is required." });
    }

    const created = await this.userStorage.create(user);
    return res.status(201).send({ id: created.id });
  }



  /**
   * @swagger
   * /user/{userId}:
   *  get:
   *      description: Creates a user
   *      parameters:
   *          - name: userId
   *            type: string
   *            in: path
   *      tags:
   *          - User
   *      produces:
   *          - application/json
   *      responses:
   *          200:
   *              description: OK
   *          400:
   *              description: Invalid payload!
   *          500:
   *              description: Server error
   */
  public getById = async (req: Request, res: Response) => {
    const userId: string = req.params.userId;

    const user = await this.userStorage.getById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    } 
    const response: UserResponseModel = user as UserResponseModel;
    response.lists = await this.listStorage.searchByFiler("ownerId", userId);
    res.status(200).send(user);
  }


  /**
   * @swagger
   * /user/{userId}/list:
   *  post:
   *      description: Creates a list
   *      parameters:
   *          - name: userId
   *            type: string
   *            in: path
   *          - name: list
   *            type: List
   *            in: body
   *            schema:
   *               $ref: '#/definitions/List'
   *      tags:
   *          - User
   *      produces:
   *          - application/json
   *      responses:
   *          200:
   *              description: OK
   *          400:
   *              description: Invalid payload!
   *          500:
   *              description: Server error
   */
  public createList = async (req: Request, res: Response) => {
    const userId: string = req.params.userId;
    const list: List = req.body;
    if (!list) {
      return res.status(400).send({ message: "List is required." });
    }
    const user = await this.userStorage.getById(userId);

    if(!user) {
      return res.status(404).send({ message: "User with such id hasn't been found." });
    }

    list.ownerId = userId;
    const created = await this.listStorage.create(list)
    return res.status(200).send({ id: created.id });
  }


  /**
   * @swagger
   * /user/{userId}/list/{listId}:
   *  put:
   *      description: Creates a list
   *      parameters:
   *          - name: userId
   *            type: string
   *            in: path
   *          - name: listId
   *            type: string
   *            in: path
   *          - name: list
   *            type: List
   *            in: body
   *            schema:
   *               $ref: '#/definitions/List'
   *      tags:
   *          - User
   *      produces:
   *          - application/json
   *      responses:
   *          200:
   *              description: OK
   *          400:
   *              description: Invalid payload!
   *          500:
   *              description: Server error
   */
  public updateList = async (req: Request, res: Response) => {
    const userId: string = req.params.userId;
    const listId: string = req.params.listId;
    const list: List = req.body;
    if (!list) {
      return res.status(400).send({ message: "List is required." });
    }

    const user = await this.userStorage.getById(userId);
    if(!user) {
      return res.status(404).send({ message: "User with such id hasn't been found." });
    }

    const listToUpdate = await this.listStorage.getById(listId);
    if(!listToUpdate) {
      return res.status(400).send({ message: "List not found." });
    }

    if(listToUpdate.ownerId !== userId) {
      return res.status(403).send({ message: "The user can modify only the lists which he owns."});
    }

    await this.listStorage.update(listToUpdate);
    return res.status(200).send({ message: "List updated." });
  }


  /**
   * @swagger
   * /user/{userId}/list/{listId}:
   *  get:
   *      description: Gets a list by id
   *      parameters:
   *          - name: userId
   *            type: string
   *            in: path
   *          - name: listId
   *            type: string
   *            in: path
   *      tags:
   *          - User
   *      produces:
   *          - application/json
   *      responses:
   *          200:
   *              description: OK
   *          400:
   *              description: Invalid payload!
   *          500:
   *              description: Server error
   */
  public getList = async (req: Request, res: Response) => {
    const userId: string = req.params.userId;
    const listId: string = req.params.listId;

    const user = await this.userStorage.getById(userId);
    if(!user) {
      return res.status(404).send({ message: "User with such id hasn't been found." });
    }

    const list = await this.listStorage.getById(listId);
    if(!list) {
      return res.status(400).send({ message: "List not found." });
    }

    if(list.ownerId !== userId) {
      return res.status(403).send({ message: "The user can see only the lists which he owns."});
    }

    const response: ListResponseModel = {
      id: list.id,
      name: list.name,
      items: await this.itemStorage.searchByFiler("listId", listId)
    };

    return res.status(200).send(response);
  }




  /**
   * @swagger
   * /user/{userId}/list/{listId}/items:
   *  post:
   *      description: Creates an item in a list
   *      parameters:
   *          - name: userId
   *            type: string
   *            in: path
   *          - name: listId
   *            type: string
   *            in: path
   *          - name: Item
   *            type: Item
   *            in: body
   *            schema:
   *               $ref: '#/definitions/Item'
   *      tags:
   *          - User
   *      produces:
   *          - application/json
   *      responses:
   *          200:
   *              description: OK
   *          400:
   *              description: Invalid payload!
   *          500:
   *              description: Server error
   */
  public addItem = async (req: Request, res: Response) => {
    const userId: string = req.params.userId;
    const listId: string = req.params.listId;
    const item: Item = req.body;
    if (!item) {
      return res.status(400).send({ message: "List is required." });
    }

    const user = await this.userStorage.getById(userId);
    if(!user) {
      return res.status(404).send({ message: "User with such id hasn't been found." });
    }

    const listToUpdate = await this.listStorage.getById(listId);
    if(!listToUpdate) {
      return res.status(400).send({ message: "List not found." });
    }

    if(listToUpdate.ownerId !== userId) {
      return res.status(403).send({ message: "The user can add items only the lists which he owns."});
    }

    item.listId = listId;
    const created = await this.itemStorage.create(item);
    return res.status(200).send({ id: created.id });
  }
}
