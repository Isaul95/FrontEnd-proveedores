import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit{

  public datosprov = {
    nombre : '',
    razon : '',
    direccion : ''
  }


  constructor(private proveedoresService:ProveedoresService, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }



 formSubmit(){
  console.log(this.datosprov);
  console.log(this.datosprov.nombre)


  if(this.datosprov.nombre == '' || this.datosprov.razon == null || this.datosprov.direccion == null){
    this.snack.open("Los datos son requeridos...!", "Aceptar", {
      duration : 3000,
      verticalPosition : 'top',
      horizontalPosition : 'right'
    });
    return;
  }

  this.proveedoresService.registrarUsuario(this.datosprov).subscribe(
    (data: any) => {
      console.log(data);

      if(data.code=='200'){
        Swal.fire('Proveedor guardado', data.descripcion, 'success');
        //window.location.href = '/listar';
      }else{
        Swal.fire('Error', data.descripcion, 'warning');
      }
    },(error) => {
      console.log(error);
       this.snack.open("A ocurrido un error en el sistema...!", "Aceptar", {
        duration : 3000,
      });
      return;
    }
  )


 }


}
