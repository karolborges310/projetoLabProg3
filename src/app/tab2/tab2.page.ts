import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
inputs: Array<{title: string, tag: string, evento:string}>;
currentDATA: string;
inputs2: Array<{data: string, title: string, tag: string, evento:string}>;
karol: Array<{data: string, title: string, tag: string, evento:string}>;
constructor(private auth: AuthenticationService) {
    this.inputs = [];
    this.currentDATA= this.RetornaDataHoraAtual();
    this.inputs2 = [];
    this.karol = this.inputs2.filter(function (pilot) {
      if(pilot.data === this.currentDATA) return true;
      else return false;
    });
  }
  onLogout() {
    this.auth.logout()
  }
adicionarCampo(este) {
  var eve;
if(este==="radio-button-off") eve= "Tasks";
if(este==="aperture") eve ="Events";
if(este==="remove") eve = "Notes";
    this.inputs.push({ title: "", tag: este, evento: eve});
}
atualizaINPUT(){
  this.karol = this.inputs2.filter(function (pilot) {
    return pilot.data === this.currentDATA;
  });
}

atualiza(este){
  var kar = this.inputs2.filter(function (pilot) {
  var datadehoje = new Date(este);
  var localdatehoje = datadehoje.getFullYear() + '-' + (datadehoje.getMonth()+1) + '-' + datadehoje.getDate();
    if(pilot.data === este) return true;
    if(pilot.data === localdatehoje) return true;
    else return false;
  });
  return kar;
}
adicionarCampo2(este){
  var eve;
  if(este==="radio-button-off") eve= "Tasks";
  if(este==="aperture") eve ="Events";
  if(este==="remove") eve = "Notes";
      this.inputs2.push({ data: this.currentDATA, title: "", tag: este, evento: eve});
      this.atualizaINPUT();
}

deletarCampo(currencie){
    this.inputs.splice(this.inputs.indexOf(currencie),1);
    this.inputs2.splice(this.inputs2.indexOf(currencie),1);
    this.atualizaINPUT();
  }

mudar(este){
  if(este==="aperture"|| este=="remove") return este;
  
  else {
    if(este==="radio-button-off") return "close";
    if(este=== "close") return "arrow-dropright";
    if(este=== "arrow-dropright") return "arrow-dropleft";
    if(este=== "arrow-dropleft") return "remove-circle";
    if(este=== "remove-circle") return "radio-button-off";
  }
}
evento(este){
if(este==="radio-button-off") return "Tasks";
if(este==="aperture") return "Events";
if(este==="remove") return "Notes";
}
RetornaDataHoraAtual(){
  var dNow = new Date();
  var localdate = dNow.getFullYear() + '-' + (dNow.getMonth()+1) + '-' + dNow.getDate();
  return localdate;
}
deleteCurrencie() {
    this.inputs.pop();
  }
public alert(): void{

    var color = "rgb("+ Math.floor(Math.random() * 255) + ","+ Math.floor(Math.random() * 255) + ","
  
    + Math.floor(Math.random() * 255) + ")";
  
    document.getElementById("karol").style.backgroundColor = color;

  }

}


