import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  auxTitle: string;
  currentDATA: string;
  campo: Array<{data: string, title: string, tag: string, evento:string}>;
  
  aux: Array<{num_day: string, week: string}>;

  constructor(private auth: AuthenticationService, private httpClient: HttpClient) {
    this.currentDATA= this.RetornaDataHoraAtual();
    this.aux=[];

    this.httpClient.get('http://localhost:3000' + '/alldatatab3').subscribe((res)=>{
    //console.log(res);

    this.campo = []
    for(var index in res){
      //console.log(line);
      this.campo.push({data: res[index].data, title: res[index].title, tag: res[index].tag, evento: res[index].evento});
    }
  });

    var dNow = new Date(this.currentDATA);
    var localdate = dNow.getFullYear() + '-' + (dNow.getMonth()+1) + '-' + '1';
  
    for (var i = 1; i < 32; i++) {
      this.aux.push({num_day: (this.dia(localdate)), week: this.semana(localdate)});
      var dant = new Date(localdate);
  dant.setDate(dant.getDate() + 1);
  localdate = (dant.getFullYear()) + '-' + (dant.getMonth()+1) + '-' + (dant.getDate());
    }
}
formatar(data){
  var aux= new Date(data);
  var dataformatada = (aux.getFullYear()) + '-' + (aux.getMonth()+1) + '-' + aux.getDate();
return dataformatada;
}
atualiza(dia, dataAnoMes){
  var ANO = new Date(dataAnoMes);
  var an = ANO.getFullYear();
  var data = an + '-' + (ANO.getMonth()+1) + '-' + dia;
  var kar = this.campo.filter(function (comp) {
  var datadehoje = new Date(data);
  var localdatehoje = datadehoje.getFullYear() + '-' + (datadehoje.getMonth()+1) + '-' + (datadehoje.getDate());
  var DATA = new Date(comp.data);
  var localdate = DATA.getFullYear() + '-' + (DATA.getMonth()+1) + '-' + DATA.getDate();
    if(comp.data === data) return true;
    if(comp.data === localdatehoje) return true;
    if(data === localdate) return true;
    else return false;
  });
  return kar;
}

mudarsemana(){
  this.aux=[];
  var dNow = new Date(this.currentDATA);
  var localdate = dNow.getFullYear() + '-' + (dNow.getMonth()+1) + '-' + '1';
  for (var i = 1; i < this.nummaxmes(dNow.getMonth()); i++) {
    this.aux.push({num_day: (this.dia(localdate)), week: this.semana(localdate)});
    var dant = new Date(localdate);
dant.setDate(dant.getDate() + 1);
localdate = (dant.getFullYear()) + '-' + (dant.getMonth()+1) + '-' + (dant.getDate());
  }
}

nummaxmes(num_mes){
  if(num_mes==0||num_mes==2||num_mes==4||num_mes==6||num_mes==7||num_mes==9||num_mes==11) return 32;
  if(num_mes==1) return 29;
  else return 31;
}

updateLine(item){
console.log('dando update na tab1 com data = ' + item.data + ' e old title = '+ this.auxTitle);

  this.httpClient.put('http://localhost:3000/updatetitlelinetab3/'+item.data+'/'+this.auxTitle,{
    title: item.title,
    data: item.data,
  }).subscribe(
    res=>{console.log(res);},
    err=>{console.log('Error ocurred at update line')}
  );
}

adicionar(day, MesAno){
  var ANO = new Date(MesAno);
  var data = (ANO.getFullYear()) + '-' + (ANO.getMonth()+1) + '-' + day;
  this.campo.push({ data: data, title: "", tag: "", evento: ""});

  this.httpClient.post('http://localhost:3000/createlinetab3',{
    data: data,
    title: "",
    tag: "",
    evento: ""
})
  .subscribe(
    res=>{console.log(res);},
    err=>{
      console.log('Error ocurred at adicionarCampo in tab1')
    }
  );
}
  
deletar(currencie){
  console.log('Deletando a linha do dia'+currencie.data+' e com title '+currencie.title)
  this.httpClient.delete('http://localhost:3000/deletelinetab3/'+currencie.data+'/'+currencie.title).subscribe(
    () => console.log('Deletando a linha do dia'+currencie.data+' e com title '+currencie.title),
    (err) => console.log(err)
  );
  this.campo.splice(this.campo.indexOf(currencie),1);
}
semana(data){
  var dNow = new Date(data);
  var day = dNow.getDate();
  var s;
  var dNow = new Date(this.currentDATA);
  var d = new Date(dNow.getFullYear(), dNow.getMonth(),  day, 10, 33, 30, 0);
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
dia(data){
  var dNow = new Date(data);
  var day = dNow.getDate().toString();
  return day;
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
