import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

currentDATA: string;
campo: Array<{data: string, title: string, tag: string, evento:string}>;

constructor(private auth: AuthenticationService, private httpClient: HttpClient) {
    this.currentDATA= this.RetornaDataHoraAtual();
    this.httpClient.get('http://localhost:3000' + '/data').subscribe((res)=>{
      console.log(res[0].tag);
      this.campo = [{data: res[0].data, title: res[0].title, tag: res[0].tag, evento: res[0].evento}];
    });
    //{data: "2019-05-27T00:00:00-03:00", title: "Trabalho", tag: "aperture", evento: "Tasks"}
}

onLogout() {
    this.auth.logout()
}

atualiza(data: string | number | Date){
  var kar = this.campo.filter(function (comp) {
  var datadehoje = new Date(data);
  var localdatehoje = datadehoje.getFullYear() + '-' + (datadehoje.getMonth()+1) + '-' + datadehoje.getDate();
    if(comp.data === data) return true;
    if(comp.data === localdatehoje) return true;
    else return false;
  });
  return kar;
}

adicionarCampo(tag: string){
  var eve: string;
  if(tag==="radio-button-off") eve= "Tasks";
  if(tag==="aperture") eve ="Events";
  if(tag==="remove") eve = "Notes";
      this.campo.push({ data: this.currentDATA, title: "", tag: tag, evento: eve});
}

deletarCampo(currencie: { data: string; title: string; tag: string; evento: string; }){
    this.campo.splice(this.campo.indexOf(currencie),1);
}

mudar_tag(tag: string){
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


