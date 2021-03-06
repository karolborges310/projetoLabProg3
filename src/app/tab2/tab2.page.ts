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
  this.httpClient.get('http://localhost:3000' + '/alldatatab2').subscribe((res)=>{
    //console.log(res);

    this.campo = []
    for(var index in res){
      //console.log(line);
      this.campo.push({data: res[index].data, title: res[index].title, tag: res[index].tag, evento: res[index].evento});
    }
  });
  //{data: "2019-05-27T00:00:00-03:00", title: "Trabalho", tag: "aperture", evento: "Tasks"}
}

onLogout() {
    this.auth.logout()
}

atualiza(data){
  var kar = this.campo.filter(function (comp) {
  var datadehoje = new Date(data);
  var localdatehoje = datadehoje.getFullYear() + '-' + (datadehoje.getMonth()+1) + '-' + datadehoje.getDate();
  var DATA = new Date(comp.data);
  var localdate = DATA.getFullYear() + '-' + (DATA.getMonth()+1) + '-' + DATA.getDate();
    if(comp.data === data) return true;
    if(comp.data === localdatehoje) return true;
    if(data === localdate) return true;
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
  //var new_line = [{ data: this.currentDATA, title: "", tag: tag, evento: eve}]
  //console.log('new line added' + new_line)
  this.httpClient.post('http://localhost:3000/createlinetab2',{
    data: this.currentDATA,
    title: "",
    tag: tag,
    evento: eve
})
  .subscribe(
    res=>{console.log(res);},
    err=>{
      console.log('Error ocurred at adicionarCampo')
    }
  );
}

diaseguinte(data){
  var dant = new Date(data);
  dant.setDate(dant.getDate() + 1);
  var dseg = (dant.getFullYear()) + '-' + (dant.getMonth()+1) + '-' + (dant.getDate());
  return dseg;
}

deletarCampo(currencie){
    this.campo.splice(this.campo.indexOf(currencie),1);
}

mudar_tag(tag, data, title,evento){
  if(tag==="aperture"|| tag=="remove") return tag;
  else {
    if(tag==="radio-button-off") return "close";
    if(tag=== "close"){ 
      this.campo.push({ data: this.diaseguinte(data), title: title, tag: "radio-button-off", evento: evento});
      return "arrow-dropright";
    }
    if(tag=== "arrow-dropright"){
      this.deletarCampo({ data: this.diaseguinte(data), title: title, tag: "radio-button-off", evento: evento}); 
      return "arrow-dropleft";
    }
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


