import { Injectable } from "@angular/core";

import { Item } from "./item";

@Injectable({
    providedIn: "root"
})
export class ItemService {
    private items = new Array<Item>(
        { id: '1', name: 'Ter Stegen', role: 'Goalkeeper' },
        { id: 'UiMaterialButton', name: 'UiMaterialButton', role: 'Goalkeeper' }
    );

    getItems(): Array<Item> {
        return this.items;
    }

    getItem(id: string): Item {
        return this.items.filter((item) => item.id === id)[0];
    }
}
