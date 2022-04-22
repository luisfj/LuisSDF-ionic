import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { CadastroPessoaPage } from '../cadastro-pessoa/cadastro-pessoa.page';
import { PessoaDTO } from '../_models/pessoa.dto';
import { PessoaService } from '../_services/pessoa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  items : PessoaDTO[] = [];
  pagina : number = 0;
  itensPorPagina : number = 20;

  constructor(
    public pessoaService : PessoaService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public navCtrl: NavController
    ) { 
      this.carregarDados(); 
    }

  ngOnInit() {
  }


  async carregarDados() {
    this.pessoaService.findAll(this.pagina, this.itensPorPagina).subscribe(response => {
      this.items = this.items.concat(response);
    });
  }

  loadData(event) {
    this.pagina++;
    this.carregarDados();
    setTimeout(() => {      
      event.target.complete();
      let d = this.items.length % this.itensPorPagina;
        console.log(d);
      if (this.items.length % this.itensPorPagina !== 0) {
        
        event.target.disabled = true;
      }
    }, 500);
  }

  doRefresh(event) {
    this.resetarPaginaECarregar();

    setTimeout(() => {      
      event.target.complete();
    }, 1000);
  }

  resetarPaginaECarregar(){
    this.pagina = 0;
    this.items = [];

    this.carregarDados();
  }

  async abrirDialogoPessoa(idPessoa : number = 0){
    const md = await this.modalCtrl.create({
      component: CadastroPessoaPage,
      componentProps: {
        'idPessoa': idPessoa
      }
    });
    
    md.present();

    const { data } = await md.onWillDismiss();

    if(data && data.atualizado){
      this.resetarPaginaECarregar();
    }
  }

  formatarSexo(sexo:string){
    switch (sexo) {
      case undefined:
        return 'Não informado';
      case 'M':
        return 'Masculino';
      case 'F':
        return 'Feminino';    
      default:
        return 'Outro';
    }
  }

  async mensagemPessoaRemovida(){
    
    const alert = await this.alertCtrl.create({
      header: 'Removida',
      message: 'Pessoa removida com sucesso!',
      backdropDismiss: false,

      buttons: [
        {
          text: "Ok",
          handler: () => {            
            this.navCtrl.pop();         
          }
        }
      ]
    });
    alert.present();
  }

  async confirmarRemoverPessoa(idPessoa : number){
    let pessoaRemover = this.items.find(p => p.id === idPessoa);

    const alert = await this.alertCtrl.create({
      header: 'Deseja excluir?',
      message: `Confirma a exclusão da pessoa com nome <strong>${pessoaRemover.nome}</strong> e cpf <strong>${pessoaRemover.cpf}</strong>?`,
      backdropDismiss: false,

      buttons: [
        {
          text: "Sim",
          cssClass: "danger",
          handler: () => {
            this.pessoaService.remove(idPessoa)
              .subscribe(response => {
                this.items = this.items.filter(p => p.id !== idPessoa);
                this.navCtrl.pop();
                this.mensagemPessoaRemovida();
              });         
          }
        },
        {
          text: "Não",
          handler: () => {
            this.navCtrl.pop();         
          }
        }
      ]
    });
    alert.present();
  }

}
