import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
auxTitle: string;
currentDATA: string;
campo: Array<{data: string, title: string, tag: string, evento:string}>;  

constructor(private auth: AuthenticationService, private httpClient: HttpClient) {
  this.currentDATA= this.RetornaDataHoraAtual();
  this.httpClient.get(auth.path + '/alldatatab2').subscribe((res)=>{
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
formatar(data){
  var aux= new Date(data);
  var dataformatada = (aux.getFullYear()) + '-' + (aux.getMonth()+1) + '-' + aux.getDate();
return dataformatada;
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
  var data = this.formatar(this.currentDATA);
  var eve: string;
  if(tag==="radio-button-off") eve= "Tasks";
  if(tag==="aperture") eve ="Events";
  if(tag==="remove") eve = "Notes";
  this.campo.push({ data: data, title: "", tag: tag, evento: eve});
  //var new_line = [{ data: this.currentDATA, title: "", tag: tag, evento: eve}]
  //console.log('new line added' + new_line)
  this.httpClient.post(this.auth.path+'/createlinetab2',{
    data: data,
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
updateLine(item){
  this.httpClient.put(this.auth.path+'/updatelinetab2/'+item.data+'/'+this.auxTitle,{
    title: item.title,
    tag: item.tag
  }).subscribe(
    res=>{console.log(res);},
    err=>{console.log('Error ocurred at update line')}
  );
}

diaseguinte(data){
  var dant = new Date(data);
  dant.setDate(dant.getDate() + 1);
  var dseg = (dant.getFullYear()) + '-' + (dant.getMonth()+1) + '-' + (dant.getDate());
  return dseg;
}

deletarCampo(currencie){
  console.log('Deletando a linha do dia'+currencie.data+' e com title '+currencie.title)
  //if(currencie.title == )
  this.httpClient.delete(this.auth.path+'/deletelinetab2/'+currencie.data+'/'+currencie.title).subscribe(
    () => console.log('Deletando a linha do dia'+currencie.data+' e com title '+currencie.title),
    (err) => console.log(err)
  );
  this.campo.splice(this.campo.indexOf(currencie),1);
}

mudar_tag(tag, data, title,evento){
  if(tag==="aperture"|| tag=="remove"){
    this.httpClient.put(this.auth.path+'/updatelinetab2/'+data+'/'+title,{
      title: title,
      tag: tag
    }).subscribe(
      res=>{console.log(res);},
      err=>{console.log('Error ocurred at update line')}
    );
    return tag;
  }
  else {
    if(tag==="radio-button-off"){
      this.httpClient.put(this.auth.path+'/updatelinetab2/'+data+'/'+title,{
      title: title,
      tag: "close"
    }).subscribe(
      res=>{console.log(res);},
      err=>{console.log('Error ocurred at update line')}
    );
      return "close";
    }
    if(tag=== "close"){ 
      this.campo.push({ data: this.diaseguinte(data), title: title, tag: "radio-button-off", evento: evento});
      this.httpClient.post(this.auth.path+'/createlinetab2/',{
        data: this.diaseguinte(data),
        title: title,
        tag: tag,
        evento: evento
    })
      .subscribe(
        res=>{console.log(res);},
        err=>{
          console.log('Error ocurred at adicionarCampo')
        }
  );
  this.httpClient.put(this.auth.path+'/updatelinetab2/'+data+'/'+title,{
    title: title,
    tag: "arrow-dropright"
  }).subscribe(
    res=>{console.log(res);},
    err=>{console.log('Error ocurred at update line')}
  );
      return "arrow-dropright";
    }
    if(tag=== "arrow-dropright"){
      this.deletarCampo({ data: this.diaseguinte(data), title: title, tag: "radio-button-off", evento: evento});
      this.httpClient.delete(this.auth.path+'/deletelinetab2/'+this.diaseguinte(data)+'/'+title).subscribe(
        () => console.log('Deletando a linha do dia'+this.diaseguinte(data)+' e com title '+title),
        (err) => console.log(err)
    ); 
    this.httpClient.put(this.auth.path+'/updatelinetab2/'+data+'/'+title,{
      title: title,
      tag: "arrow-dropleft"
    }).subscribe(
      res=>{console.log(res);},
      err=>{console.log('Error ocurred at update line')}
    );
      return "arrow-dropleft";
    }
    if(tag=== "arrow-dropleft"){
      this.httpClient.put(this.auth.path+'/updatelinetab2/'+data+'/'+title,{
    title: title,
    tag: "remove-circle"
  }).subscribe(
    res=>{console.log(res);},
    err=>{console.log('Error ocurred at update line')}
  );
      return "remove-circle";
    }
    if(tag=== "remove-circle"){
      this.httpClient.put(this.auth.path+'/updatelinetab2/'+data+'/'+title,{
    title: title,
    tag: "radio-button-off"
  }).subscribe(
    res=>{console.log(res);},
    err=>{console.log('Error ocurred at update line')}
  );
      return "radio-button-off";
    }
  }
}

RetornaDataHoraAtual(){
  var dNow = new Date();
  var localdate = dNow.getFullYear() + '-' + (dNow.getMonth()+1) + '-' + dNow.getDate();
  return localdate;
}

}


