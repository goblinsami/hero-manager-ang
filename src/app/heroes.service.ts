import { Injectable } from '@angular/core';

export interface Hero {
  name: string;
  age: number;
  id: number;
}
@Injectable({
  providedIn: 'root'
})


export class HeroesService {


  heroes: Hero[]= []
  filteredHeroes: Hero[] = []
  loading_ = false


  filterHeroes(name: string) {
    this.filteredHeroes = this.heroes.filter(el => el.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
  }

  selectHeroeById(id: number) {
    const hero = this.heroes.find(el => el.id === id)
    return hero
  }

  get isLoading(): boolean {
    return this.loading_;
  }

  set isLoading(value: boolean) {
    this.loading_ = value;
  }

  deleteHero(id: number) {
    const hero = this.selectHeroeById(id)
    const index = this.heroes.indexOf(hero as Hero)
    this.heroes.splice(index, 1)
  }

  editHeroe(id: number, newData: object) {
    const hero = this.selectHeroeById(id)
    const newHero = newData as Hero
    if (hero) {
      hero.name = newHero.name
      hero.age = newHero.age
    }
  }


  createHeroe(data: object) {
    const maxId = Math.max(...(this.heroes.map(el => el.id)))
    const newHero = {...data, id: (maxId + 1) } as Hero
    this.heroes.push(newHero)
  }
  constructor() {
    this.heroes = [{ name: 'Superman', age: 30, id: 1 }, { name: 'Aquaman', age: 30, id: 2 }, { name: 'Antman', age: 26, id: 3 }, { name: 'Spiderman', age: 26, id: 4 }, { name: 'Ironman', age: 26, id: 5 }, { name: 'Captain America', age: 26, id: 6 }, { name: 'Hulk', age: 26, id: 7 }];
    this.filteredHeroes = this.heroes
  }
}
