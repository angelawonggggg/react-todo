import { Knex } from 'knex'; 
import { comparePassword } from './hash'; 
import jwtSimple from 'jwt-simple';
import { JWTPayload, ReadingsOverview } from './model';


export class UserService {
    constructor(public knex: Knex) {} 

    async createToken(username:string, password:string): Promise<string> {
        // let password_hash = await hashPassword(password)
        let row = await this.knex.select("id", "password_hash")
        .from("users")    // table name
        .where({ username })
        .first();

        if(!row) {
            throw new Error('Wrong username')
        }

        if(!(await comparePassword(password, row.password_hash))) {
            throw new Error('Wrong username or password')
        }

        let payload: JWTPayload = {
            id: row.id,
            username,
        }

        let token = jwtSimple.encode(payload, process.env.JWT_SECRET!!);
        return token
    };

    getReadings(user_id:number): Promise<ReadingsOverview[]> {
        return this.knex.select('id', 'title', 'content').from('readings').where({user_id});
    }
}

