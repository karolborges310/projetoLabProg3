import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  campo: Array<{data: string, title: string, tag: string, evento:string}>;
  currentDATA: string;
  meses: Array<{mes:string, mes_num: string}>;
  
  constructor(private auth: AuthenticationService) {
    this.campo = [];  
    this.currentDATA = this.RetornaDataHoraAtual();
      this.meses = [
        {mes: "Jan", mes_num: "1"},
        {mes: "Feb", mes_num: "2"},
        {mes: "Mar", mes_num: "3"},
        {mes: "Apr", mes_num: "4"},
        {mes: "May", mes_num: "5"},
        {mes: "Jun", mes_num: "6"},
        {mes: "Jul", mes_num: "7"},
        {mes: "Aug", mes_num: "8"},
        {mes: "Sep", mes_num: "9"},
        {mes: "Oct", mes_num: "10"},
        {mes: "Nov", mes_num: "11"},
        {mes: "Dec", mes_num: "12"}
      ];
  }

RetornaDataHoraAtual(){
  var dNow = new Date();
  var localdate = dNow.getFullYear() + '-' + (dNow.getMonth()+1) + '-' + dNow.getDate();
  return localdate;
}

atualiza(mes,dataAno){
  var ANO = new Date(dataAno);
  var an = ANO.getFullYear();
  var data = an + '-' + (mes) + '-' + '1';
  var kar = this.campo.filter(function (comp) {
  var datadehoje = new Date(data);
  var localdatehoje = datadehoje.getFullYear() + '-' + (datadehoje.getMonth()+1) + '-' + '1';
  var DATA = new Date(comp.data);
  var localdate = DATA.getFullYear() + '-' + (DATA.getMonth()+1) + '-' + '1';
    if(comp.data === data) return true;
    if(comp.data === localdatehoje) return true;
    if(data === localdate) return true;
    else return false;
  });
  return kar;
}

adicionar(mes,ano){
  var ANO = new Date(ano);
  var an = ANO.getFullYear();
  var data = an + '-' + (mes) + '-' + '1';
      this.campo.push({ data: data, title: "", tag: "", evento: ""});
}
  
deletar(currencie){
  this.campo.splice(this.campo.indexOf(currencie),1);
}

onLogout() {
    this.auth.logout()
}

}
