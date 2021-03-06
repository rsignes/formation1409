import { map } from 'rxjs/operators';
import { PoneyService } from './../../services/poney.service';
import { DataService } from './../../services/data.service';
import { Race } from './../../interfaces/race.interface';
import { PoneyComponent } from './../poney/poney.component';
import { Poney } from './../../interfaces/poney.interface';
import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent {

  raceInput$: Observable<Race>
  
  ponies$: Observable<Poney[]>

  @ViewChildren('poneyChildren') poneyChildren: QueryList<PoneyComponent>

  handleWin(poney: Poney) {
    console.log('WINNER : ', poney.name)
    this.poneyChildren.forEach((poneyComponent: PoneyComponent) => {
      poneyComponent.stopRunning()
    })
  }

  ngOnInit() {
    this.ponies$ = this.poneyService.entities$.pipe(map(ponies => JSON.parse(JSON.stringify(ponies))))

    // this.route.params.toPromise().then(() => {
    //   (params) => {
    //     console.log(params)
    //   }
    // })
    
    this.route.params.subscribe({
      next: (params) => {
        this.raceInput$ = this.dataService.getRaceById(params.id)
      }
    })
  }

  constructor(private dataService: DataService, private route: ActivatedRoute, private poneyService: PoneyService) {}

}
