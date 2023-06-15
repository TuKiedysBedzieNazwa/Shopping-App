import Realm from 'realm';
import { createRealmContext } from '@realm/react';


export class Products extends Realm.Object<Products>{

    _id!: number;
    name!: string;
    describe!: string;
    date!: number;
    lastBuy!: number;
    toBuy!: number;
    purchases!: number;
    image!: string;

    static schema = {
        name: 'Products',
        properties: {
            _id: 'int',
            name: 'string',
            describe: 'string',
            date: 'int',
            lastBuy: 'int',
            toBuy: 'int',
            purchases: 'int',
            image: 'string',
        },
        primaryKey: '_id',
    };
}


const realmConfig: Realm.Configuration = {
    schema: [Products]
}

export const realmContext = createRealmContext(realmConfig);