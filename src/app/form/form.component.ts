import { Component } from '@angular/core';
import { HeroesService } from '../heroes.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent {
  isEditForm = false
  isShowForm = false
  value = 'Clear me';
  formAction = ''
  filterName = ''
  heroeId: number = 0
  formData = {
    name: '',
    age: 0,
    id: 0,
  }
  constructor(private heroesService: HeroesService, private router: Router, private route: ActivatedRoute) { }

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
    this.router.navigate(['/']);
  }

  editHeroe() {
    const id = parseInt(this.route.snapshot.params['id'])
    this.heroesService.editHeroe(id, this.formData);
    this.router.navigate(['/']);
    this.heroesService.loading_ = true
    setTimeout(() => {
      this.heroesService.loading_ = false
    }, 1000);
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
    // Obtener el parámetro "id" de la ruta actual
    this.setFormAction()
    const id = parseInt(this.route.snapshot.params['id'])

    const hero = this.heroesService.selectHeroeById(id)
    if (this.formAction !== 'Crear') {
      let name = hero?.name!
      let age = hero?.age!
      this.formData.name = name
      this.formData.age = age
    }

}}
