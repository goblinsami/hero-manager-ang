import { Component } from '@angular/core';
import { HeroesService, Hero } from '../heroes.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent {
  isShowForm = false
  formAction: string = ''
  filterName: string = ''
  heroeId: number = 0
  formData: Hero = {
    name: '',
    age: 0,
    id: 0,
  }
  constructor(private heroesService: HeroesService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  get heroes() {
    return this.heroesService.heroes;
  }

  get filteredHeroes() {
    return this.heroesService.filteredHeroes;
  }

  filterHeroes() {
    this.heroesService.filterHeroes(this.filterName);
  }
  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: 'error-snackbar'
    });
  }
  showSuccessMessage(name: string) {
    this.snackBar.open(`Se ha creado el héroe ${name}`, 'Cerrar', {
      duration: 5000,
      panelClass: 'success-snackbar',
    });
  }

  validateForm() {
    if (this.formData.name === '') {
      this.showErrorMessage('Introduce nombre')
      return false
    } else if (this.formData.age === null) {
      this.showErrorMessage('Introduce edad')
      return false
    }
    return true
  }
  createHero() {
    if (this.validateForm()) {
      this.heroesService.createHero(this.formData);
      this.router.navigate(['/'])
      this.showSuccessMessage(this.formData.name)
    }
  }

  editHero() {
    if (this.validateForm()) {
      const id = parseInt(this.route.snapshot.params['id'])
      this.heroesService.editHero(id, this.formData);
      this.router.navigate(['/']);
      this.heroesService.loading = true
      setTimeout(() => {
        this.heroesService.loading = false
      }, 1000);
    }

  }

  setFormAction() {
    const route = this.route.snapshot.routeConfig?.path
    if (route === 'create') {
      this.formAction = 'Crear'
    } else if (route === 'edit/:id') {
      this.formAction = 'Editar'
    } else {
      this.formAction = 'Mostrar'
      this.isShowForm = true
    }
  }


  ngOnInit() {
    this.setFormAction()
    const id = parseInt(this.route.snapshot.params['id'])
    const hero = this.heroesService.selectHeroById(id)
    if (this.formAction !== 'Crear') {
      let name = hero?.name!
      let age = hero?.age!
      this.formData.name = name
      this.formData.age = age
    }
  }
}
