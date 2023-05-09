import { Component } from '@angular/core';
import { HeroesService } from './heroes.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private heroesService: HeroesService) { }

  title = 'hero-manager-ang';
  filterName = ''
  formData = {
    name: '',
    age: 0,
     }

  get heroes() {
    return this.heroesService.heroes;
  }

  get filteredHeroes() {
    return this.heroesService.filteredHeroes;
  }

  filterHeroes() {
    this.heroesService.filterHeroes(this.filterName);
  }
  createHeroe() {
    this.heroesService.createHeroe(this.formData);
  }
}
