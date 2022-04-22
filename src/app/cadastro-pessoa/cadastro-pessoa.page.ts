import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { PessoaService } from '../_services/pessoa.service';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.page.html',
  styleUrls: ['./cadastro-pessoa.page.scss'],
})
export class CadastroPessoaPage implements OnInit {

  formGroup : FormGroup;

  headerModal : string = "Adicionar";
  dateValue : string;

  @Input() idPessoa : number = 0;

  constructor(
      public navCtrl: NavController,
      public formBulder : FormBuilder,
      public pessoaService: PessoaService,
      public alertCtrl: AlertController,
      public modalCtrl: ModalController
    ) {

    this.formGroup = formBulder.group({
      id:['0', []],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      sexo: [null, []], 
      dataNascimento: [null, [Validators.required]],
      naturalidade: [null, []],
      nacionalidade: [null, []],
    });

   }

  ngOnInit() {
    if(this.idPessoa > 0){
      this.headerModal = "Atualizar";
      this.pessoaService.findById(this.idPessoa).subscribe(response => {         
        this.dateValue = this.formatDate(response.dataNascimento);   
        this.formGroup.patchValue(response);        
      });
      
    }
  }

  formatDate(value: string) {
    var pipe = new DatePipe('en-US');
    return pipe.transform(new Date(value), 'dd/MM/yyyy');
    //return (parseISO(value), 'MMM dd yyyy');
  }

  registrar(){
    if(this.idPessoa > 0){
      this.pessoaService.update(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      }, error => {
        console.log(error)
      });
    } else {
      this.pessoaService.register(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      }, error => {
        console.log(error)
      });
    }
  }

  async showInsertOk(){
    const alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      message: `Pessoa ${this.idPessoa > 0 ? 'atualizada' : 'registrada'} com sucesso`,
      backdropDismiss: false,

      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.navCtrl.pop();
            this.modalCtrl.dismiss({
              'atualizado' : true
            });
          }
        }
      ]
    });
    alert.present();
  }

}
