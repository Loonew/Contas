import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Produto.models';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formProduct: FormGroup;

  constructor(private formBuilder: FormBuilder, public crud: CrudService) {
    this.formProduct = formBuilder.group({
      id: [''],
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      preco: ['', Validators.compose([Validators.required])],
      qtd: [Validators.compose([Validators.required, Validators.min(0)])]
      //como o id não está sendo preenchido, ele será setado na crud.service, onde antes de enviar, o ID é gerado
    })
  }

  ngOnInit(): void {
  }

  saveProduct() {
    if (this.formProduct.valid) {
      this.crud.save(this.formProduct.value)
        .then((res) => {
          this.formProduct.reset()
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      console.log("Todos os campos são obrigatórios!")
    }
  }

  edit(produto: Product) {
    this.formProduct.patchValue({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      qtd: produto.qtd

    })
  }

  deleteProduct(id: string) {

    this.crud.delete(id)
      .then((res) => {
        console.log("Produto excluído com sucesso")
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
 
