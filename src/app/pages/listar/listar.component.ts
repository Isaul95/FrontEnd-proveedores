import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2'
import { ProveedoresService } from 'src/app/services/proveedores.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit, AfterViewInit{

  listController : any = []

  displayedColumns: string[] = ['nombre', 'razonSocial', 'direccion', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // PAGINADOR TABLA
  @ViewChild(MatSort) sort!: MatSort; // SORT - ORDENAMIENDO TABLE


  constructor(private proveedoresService:ProveedoresService) {}


  ngOnInit(): void {
    this.listarProveedores();
  }



  public listarProveedores(){
    this.proveedoresService.listarProveedores().subscribe(
      (datos:any) => {
        this.listController = datos;
        console.log("Lista-datos->", this.listController);

        this.dataSource.data = this.listController; // ** Asignamos la lista al dataSource del DataTable() **
      }, (error) => {
        console.log(error);
        alert('Error al cargar la lista de Proveedores...');
      }
  )
  }




  ngAfterViewInit() { // Para el sort debe de ser en el After
    // Recomendable es dejarlos aqui una vez que ya se cargue completamente la tabla con la data del DB
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  onDeleteProv(element:any) {
  console.log("DELTE-11-> ", element.nombre);
  console.log("DELTE-22-> ", element);

  Swal.fire({
    title: 'Eliminar proveedor',
    text: '¿Esta seguro de eliminar el proveedor seleccionado.?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) =>{
    if(result.isConfirmed){
      this.proveedoresService.eliminarProveedor(element.nombre).subscribe(
        (data) => {
          Swal.fire('Proveedor eliminado..!!', 'El proveedor ha sido eliminado de forma correcta...!', 'success');
          this.listarProveedores();
        },
        (error) => {
          console.log(error);
          Swal.fire('Error..!!', 'Error al eliminar el proveedor...!', 'error');
          }
      )}
  })
}


}
