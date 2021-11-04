import Knex from "knex"; 
import dotenv from 'dotenv';
dotenv.config();


let configs = require("./knexfile");

let mode = process.env.NODE_ENV    // let mode = process.env.NODE_ENV || 'development' --> default is 'development' 

//如果唔想有default setting就throw error 話佢唔記得set個node env ？？？？？？
if(!mode) {
    throw new Error('missing NODE_ENV in process.env');
}

let config = configs[mode]

export let knex = Knex(config)

// 去翻server就可以攞翻knex黎用