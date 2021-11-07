import { UserService } from "./user.service";
import { Request, Response } from "express";
import express from "express";
import { isLoggedIn } from "./guards";

export class UserController {
  constructor(private userService: UserService) {}

  toRouter() {
    let router = express.Router();
    router.post("/login", this.createToken); //當有人post呢條route既時候，就invoke呢個createToken
    router.get("/readings", isLoggedIn, this.getReadings)
    return router;
  }

  createToken = async (req: Request, res: Response) => {
    let { username, password } = req.body;
    // Check下有冇唔見嘢
    if (!username) {
      res.json({ error: "missing username in req.body" });
    }

    if (!password) {
      res.json({ error: "missing password in req.body" });
    }

    //所有async嘢都有可能失敗，所以做個try catch
    try {
      //攞個token出黎
      let token = await this.userService.createToken(username, password);
      //俾翻個token俾人
      res.json(token);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  };

  getReadings = async (req: Request, res: Response) => {
    try {
      let payload = req.jwtPayload; // user
      let readings = await this.userService.getReadings(payload.id);
      res.json({ readings });
    } catch (error) {
      error: (error as Error).toString();
    }
  };
}
