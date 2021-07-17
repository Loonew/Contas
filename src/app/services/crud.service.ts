import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/Produto.models';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  public lista: any
  public user_id: any;

  constructor(private afd: AngularFirestore, private afa: AngularFireAuth) {
    this.afa.authState.subscribe((user) => {
      if (user?.uid) {
        this.user_id = user?.uid;
        console.log(this.user_id)
        this.list(this.user_id)

      }else{
        this.user_id = ''
      }
    })

  }

  save(produto: Product) { //por ser do tipo de uma interface, verifica se todos os campos estão preenchidos
    produto.id == '' ? produto.user_create = this.user_id : produto.user_edit = this.user_id
    produto.id == '' ? produto.id = this.afd.createId() : produto.id = produto.id//se não tiver ID, cria uma antes de salvar, else traz ela
    return this.afd.collection('Produtos').doc(produto.id).set(produto, { merge: true })//na collection tal,salva um produto com o ID criado antes, setado na tabela tal.
    //merge = se já existe o produto só altera os campos

  }


  list(uid: string) {
    this.lista = this.afd.collection('Produtos', ref => { //da collection Produtos, traga ref
      return ref.where('user_create', '==', uid)//que retorna os campos que possuem o mesmo uid que do user
    }).valueChanges()//e valida as mudanças
  }

  listById() {

  }

  delete(id: string) {
    return this.afd.collection('Produtos').doc(id).delete()//essa função já existe em algum lugar
  }
}
