import { Component } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo';
  description = "What should I do today";


  filter: "all" | "active" | "done" = "all";


  allItems: Item[] = []

  get items() {
    if (this.filter === "all") {
      return this.allItems
    }
    if (this.allItems.length > 0) {
      return this.allItems.filter((item) => this.filter === "done" ? item.done : !item.done)
    }

    return this.allItems
  }

  addItem(description: string) {
    this.allItems.unshift({
      description,
      done: false
    })
  }

  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }


}
