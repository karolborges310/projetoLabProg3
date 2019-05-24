import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  currentDATA: string;
  evento_ano: Array<{mes:string, evento_mes: Array<{dia: string, evento: string}>}>;
  karol: Array<{ano: string, mes:string, evento_mes: Array<{dia: string, evento: string}>}>;
  constructor(private auth: AuthenticationService) {
      this.currentDATA = this.RetornaDataHoraAtual();
      this.evento_ano = [
        {mes: "Jan", evento_mes: []},
        {mes: "Feb", evento_mes: []},
        {mes: "Mar", evento_mes: []},
        {mes: "Apr", evento_mes: []},
        {mes: "May", evento_mes: []},
        {mes: "Jun", evento_mes: []},
        {mes: "Jul", evento_mes: []},
        {mes: "Aug", evento_mes: []},
        {mes: "Sep", evento_mes: []},
        {mes: "Oct", evento_mes: []},
        {mes: "Nov", evento_mes: []},
        {mes: "Dec", evento_mes: []}
      ];
  }
  RetornaDataHoraAtual(){
  var dNow = new Date();
  var localdate = dNow.getFullYear() + '-' + (dNow.getMonth()+1) + '-' + dNow.getDate();
  return localdate;
}
atualiza(este){
  var kar = this.karol.filter(function (pilot) {
    return pilot.ano === este;
  });
  return kar;
}
adicionarCampo(este) {
    este.evento_mes.push({dia: "--", evento:""});
}
deletarCampo(este){
  este.evento_mes.pop();
}
  

  onLogout() {
    this.auth.logout()
  }
}
