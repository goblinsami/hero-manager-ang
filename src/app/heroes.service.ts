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
  heroes: Hero[] = [{ name: 'Superman', age: 30, id: 1 }, { name: 'Aquaman', age: 30, id: 2 }, { name: 'Antman', age: 26, id: 3 }, { name: 'Spiderman', age: 26, id: 4 }, { name: 'Ironman', age: 46, id: 5 }, { name: 'Captain America', age: 36, id: 6 }, { name: 'Hulk', age: 41, id: 7 }]
  filteredHeroes: Hero[] = []
  loading = false

  filterHeroes(name: string) {
    this.filteredHeroes = this.heroes.filter(el => el.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
  }

  selectHeroById(id: number) {
    const hero = this.heroes.find(el => el.id === id)
    return hero
  }
  createHero(data: object) {
    const maxId = Math.max(...(this.heroes.map(el => el.id)))
    const newHero = { ...data, id: (maxId + 1) } as Hero
    this.heroes.push(newHero)
  }

  editHero(id: number, newData: object) {
    const hero = this.selectHeroById(id)
    const newHero = newData as Hero
    if (hero) {
      hero.name = newHero.name
      hero.age = newHero.age
    }
  }

  deleteHero(id: number) {
    const hero = this.selectHeroById(id)
    const index = this.heroes.indexOf(hero as Hero)
    this.heroes.splice(index, 1)
  }

  constructor() {
    this.filteredHeroes = this.heroes
  }
}
