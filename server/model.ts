export type ReadingsOverview = {
    id: number
    title:string
    content: string

}


export interface User {        // export type ? 
    id:number
    username:string
    password:string
}

export type JWTPayload = {
    id: number
    username?: string
    name?: string
    picture?: string
  }

// 因為用req.user果陣會紅咗話冇呢樣嘢，所以要用declare global呢舊嘢
declare global {                 
    namespace Express{
        interface Request{
            user?: User
            jwtPayload: JWTPayload
                             
        }
    }
}
