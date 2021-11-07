import { Response, Request, NextFunction } from "express";
import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import { jwtConfig } from "./jwt";
import { JWTPayload } from "./model";


const permit = new Bearer({
  query: "access_token",
});

export async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  let token: string;
  
  try {
    token = permit.check(req);
    if (!token) {
      return res.status(401).json({ error: "Missing bearer token in req" });
    }
  } catch (error) {
    res.json({ error: "failed to decode Bearer token in req" });
  }

  let payload: JWTPayload

  try {
    payload = jwtSimple.decode(token, jwtConfig.SECRET);
  } catch (error) {
    res.json({ error: "failed to decode JWT token in req" });
  }

  // TODO validate the user permission with database using UserService

  req.jwtPayload = payload;
  next();
}
