import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { format } from 'util';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  auxTitle: string;
  auxData: string;
  campo: Array<{data: string, title: string, tag: string, evento:string}>;
  currentDATA: string;
  meses: Array<{mes:string, mes_num: string}>;
  
  
  constructor(private auth: AuthenticationService, private httpClient: HttpClient) {
    console.log('the user email is '+ auth.email)
    const headers = {'Authorization': auth.email}
     
    this.httpClient.get(auth.path + '/alldatatab1',{headers: headers}).subscribe((res)=>{
    //console.log(res);

    this.campo = []
    for(var index in res){
      //console.log(line);
      this.campo.push({data: res[index].data, title: res[index].title, tag: res[index].tag, evento: res[index].evento});
    }
  });
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

formataAtualiza(item){
  var tempData = this.formatar(item)
  this.atualizar(item)
  return tempData
}

atualizar(item){
  const headers = {'Authorization': this.auth.email}
  console.log('rodou atualizar com data: '+ item.data)
  this.httpClient.put(this.auth.path+'/updatedatalinetab1/'+this.auxData+'/'+item.title,{
    data: this.formatar(item),
    title: item.title,
  },{headers: headers}).subscribe(
    res=>{console.log(res);},
    err=>{console.log('Error ocurred at update line')}
  );
}

formatar(item){
  console.log('rodou o formatar com data: '+ item.data)
  var aux= new Date(item.data);
  var dataformatada = (aux.getFullYear()) + '-' + (aux.getMonth()+1) + '-' + aux.getDate();

return dataformatada;
}

updateLine(item){
  const headers = {'Authorization': this.auth.email}
  this.httpClient.put(this.auth.path+'/updatetitlelinetab1/'+item.data+'/'+this.auxTitle,{
    title: item.title,
  },{headers: headers}).subscribe(
    res=>{console.log(res);},
    err=>{console.log('Error ocurred at update line')}
  );
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
  const headers = {'Authorization': this.auth.email}
  var ANO = new Date(ano);
  var an = ANO.getFullYear();
  var data = an + '-' + (mes) + '-' + '1';
  this.campo.push({ data: data, title: "", tag: "", evento: ""});
  this.httpClient.post(this.auth.path+'/createlinetab1',{
    data: data,
    title: "",
    tag: "",
    evento: ""
},{headers: headers})
  .subscribe(
    res=>{console.log(res);},
    err=>{
      console.log('Error ocurred at adicionarCampo in tab1')
    }
  );
}
  
deletar(currencie){
  const headers = {'Authorization': this.auth.email}
  this.httpClient.delete(this.auth.path+'/deletelinetab1/'+currencie.data+'/'+currencie.title,{headers: headers}).subscribe(
    () => console.log('Deletando a linha do dia'+currencie.data+' e com title '+currencie.title),
    (err) => console.log(err)
  );
  this.campo.splice(this.campo.indexOf(currencie),1);
}

onLogout() {
    this.auth.logout()
}

}
