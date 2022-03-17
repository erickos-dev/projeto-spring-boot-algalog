import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent implements OnInit {

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor() { }

  ngOnInit() {
  }

}
