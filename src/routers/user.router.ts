import { injectable } from "inversify";
import { Router } from "express";
import { UserController } from "../controllers/user.controller";

@injectable()
export class UserRouter {
  private readonly _router: Router;

  constructor(private userController: UserController) {
    this._router = Router({ strict: true });
    this.init();
  }

  private init(): void {

    this._router.post("/", this.userController.create);
    this._router.get("/:userId", this.userController.getById);

    this._router.post("/:userId/list", this.userController.createList);
    this._router.put("/:userId/list/:listId", this.userController.updateList);
    this._router.get("/:userId/list/:listId", this.userController.getList);

    this._router.post("/:userId/list/:listId/items", this.userController.addItem);
  }

  public get router(): Router {
    return this._router;
  }
}
