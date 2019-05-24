import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  inputs: Array<{dia: string, semana:string}>;
  inputs2: Array<{ano: string, mes: string, dia: string, semana:string, title:string}>;
  currentDATA: string;
getsemana(este){
  var s;
  var dNow = new Date(this.currentDATA);
  var d = new Date(dNow.getFullYear(), dNow.getMonth(),  este, 10, 33, 30, 0);
  var arrayDia = new Array(7);
        arrayDia[0] = "S";
        arrayDia[1] = "M";
        arrayDia[2] = "T";
        arrayDia[3] = "W";
        arrayDia[4] = "T";
        arrayDia[5] = "F";
        arrayDia[6] = "S";
  s = arrayDia[d.getDay()];
  return s;
}
  constructor(private auth: AuthenticationService) {
    this.currentDATA= this.RetornaDataHoraAtual();
    this.inputs = [];
    this.inputs2=[];
    var day;
    for (var i = 1; i < 31; i++) {
      day = i.toString();
      this.inputs.push({dia: day, semana: this.getsemana(day)});
      this.inputs2.push({ano: "", mes: "", dia: day, semana: this.getsemana(day), title:""});
    }
}
 
onLogout() {
  this.auth.logout()
}
  RetornaDataHoraAtual(){
    var dNow = new Date();
    var localdate = dNow.getFullYear() + '-' + (dNow.getMonth()+1) + '-' + dNow.getDate();
    return localdate;
  }

}
