import { Component } from '@angular/core';
import { LocalService } from './local.service';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo';
  description = "What should I do today";
  year = new Date().getFullYear()
  owner = 'Raymond Thurman'

  filter: "all" | "active" | "done" = "all";

  allItems: Item[] = []

  constructor(private localStore: LocalService) { }

  ngOnInit() {
    const storedItems = this.localStore.getData('todoItems');

    if (storedItems) {
      this.allItems = JSON.parse(storedItems)
    }
  }

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
    this.saveItemsToLocalStorage();
  }

  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
    this.saveItemsToLocalStorage();
  }

  private saveItemsToLocalStorage() {
    this.localStore.saveData('todoItems', JSON.stringify(this.allItems))
  }
}
