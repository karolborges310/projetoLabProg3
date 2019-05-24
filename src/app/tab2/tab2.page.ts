import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

currentDATA: string;
campo: Array<{data: string, title: string, tag: string, evento:string}>;

constructor(private auth: AuthenticationService) {
    this.currentDATA= this.RetornaDataHoraAtual();
    this.campo = []; 
}

onLogout() {
    this.auth.logout()
}

atualiza(data){
  var kar = this.campo.filter(function (comp) {
  var datadehoje = new Date(data);
  var localdatehoje = datadehoje.getFullYear() + '-' + (datadehoje.getMonth()+1) + '-' + datadehoje.getDate();
    if(comp.data === data) return true;
    if(comp.data === localdatehoje) return true;
    else return false;
  });
  return kar;
}

adicionarCampo(tag){
  var eve;
  if(tag==="radio-button-off") eve= "Tasks";
  if(tag==="aperture") eve ="Events";
  if(tag==="remove") eve = "Notes";
      this.campo.push({ data: this.currentDATA, title: "", tag: tag, evento: eve});
}

deletarCampo(currencie){
    this.campo.splice(this.campo.indexOf(currencie),1);
}

mudar_tag(tag){
  if(tag==="aperture"|| tag=="remove") return tag;
  else {
    if(tag==="radio-button-off") return "close";
    if(tag=== "close") return "arrow-dropright";
    if(tag=== "arrow-dropright") return "arrow-dropleft";
    if(tag=== "arrow-dropleft") return "remove-circle";
    if(tag=== "remove-circle") return "radio-button-off";
  }
}

RetornaDataHoraAtual(){
  var dNow = new Date();
  var localdate = dNow.getFullYear() + '-' + (dNow.getMonth()+1) + '-' + dNow.getDate();
  return localdate;
}

}


