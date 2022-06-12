import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.css']
})

 
export class ListBrandComponent implements OnInit {
  dataBrands:any=[];
  myForm: FormGroup;
  editForm: FormGroup;

  @ViewChild('fileLogo', {static: false})
  fLogo!: ElementRef;

  @ViewChild('modalEdit', {static: false})
  modEdit!: ElementRef;

  constructor(private serv:DataService, private fb:FormBuilder) { 
    this.myForm = this.fb.group({
      txtBrandName: ['', Validators.required],
      fileLogo: ['', Validators.required],
    });

    this.editForm = this.fb.group({
      txtBrandId: ['', Validators.required],
      txtBrandNameEdit: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllBrand();
  }

  getAllBrand(): void {
    this.serv.getAllBrands().subscribe(data=>{
      this.dataBrands = data;
    });
  }

  getBrand(item:any): void {
    this.editForm.get('txtBrandId')!.setValue(item.brandid);
    this.editForm.get('txtBrandNameEdit')!.setValue(item.brandname);
    $(this.modEdit.nativeElement).modal('show'); 
  }

  updateBrand(): void {
    if (this.editForm.get('txtBrandNameEdit')?.value=='')
    {
      alert("Insert brand name!");
      return; 
    }
    const formData = new FormData();
    formData.append("txtId", this.editForm.get('txtBrandId')!.value );
    formData.append("txtBrandName", this.editForm.get('txtBrandNameEdit')!.value);
    this.serv.updateBrand(formData).subscribe(data=>{
      this.getAllBrand();
      this.emptyBrandForm('add');
      alert("One brand data has been change!");
      $(this.modEdit.nativeElement).modal('hide'); 
    });
  }
  
  onFileChange(event:any) {
    this.myForm.get('fileLogo')!.setValue(event.target.files[0]);
  }

  addBrand(): void {
    if (this.myForm.get('txtBrandName')?.value=='')
    {
      alert("Insert brand name!");
      return; 
    }
    if (this.myForm.get('fileLogo')?.value=='')
    {
      alert("Insert file for logo!");
      return; 
    }

    const formData = new FormData();
    formData.append("txtBrandName", this.myForm.get('txtBrandName')!.value );
    formData.append("fileLogo", this.myForm.get('fileLogo')!.value);
    this.serv.addBrand(formData).subscribe(data=>{
      this.getAllBrand();
      this.emptyBrandForm('edit');
      alert("One brand data has been added!");
    });
  }

  delBrand(brandid: any) {
    if (confirm("Delete this brand?")==true)
    {
      this.serv.delBrand(brandid).subscribe(data=>{
        this.getAllBrand();
        alert("Delete one brand : done!");
      });
    }
  }

  emptyBrandForm(ty:any) {
    if (ty=='add')
    {
      this.myForm.get('txtBrandName')!.setValue('');
      this.fLogo.nativeElement.value=null;
    }
    else
    {
      this.editForm.get('txtBrandName')!.setValue('');
    }
  }

  randomId(): string {
    var obText = "";
    var obPossible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++)
      obText += obPossible.charAt(Math.floor(Math.random() * obPossible.length));
    return obText;
  }
  
}
