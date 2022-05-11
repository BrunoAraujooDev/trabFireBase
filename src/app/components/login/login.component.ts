import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AutorizacaoService } from '../services/autorizacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioEstaLogado: boolean = false

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [ Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private autorizacao: AutorizacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.usuarioEstaLogado = this.autorizacao.obterLoginStatus()
  }

  fazerLogin(){
    this.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.senha).then(item => {
      this.autorizacao.autorizar()
      this.usuarioEstaLogado = true
      this.router.navigateByUrl("/func-adm")
    }).catch(error => {
      this.autorizacao.deslogar()
      console.log("Deu erro! Erro: ", error);
      
    });
    
  }


  fazerLogout(){
    this.autorizacao.deslogar()
    this.usuarioEstaLogado = this.autorizacao.obterLoginStatus()
  }
}
