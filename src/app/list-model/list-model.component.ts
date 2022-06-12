import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-list-model',
  templateUrl: './list-model.component.html',
  styleUrls: ['./list-model.component.css']
})
export class ListModelComponent implements OnInit {
  dataBrands:any=[];
  dataModels:any=[];
  myForm: FormGroup;
  editForm: FormGroup;
  modelSelect: any;

  @ViewChild('slcBrandName', {static: false})
  slcBrandName!: ElementRef;

  @ViewChild('fileImage', {static: false})
  fImage!: ElementRef;

  @ViewChild('modalEdit', {static: false})
  modEdit!: ElementRef;

  constructor(private serv:DataService, private fb:FormBuilder) { 
    this.myForm = this.fb.group({
      txtModelName: ['', Validators.required],
      fileImage: ['', Validators.required],
      txtDescription: ['', Validators.required],
      txtPrice: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      txtModelId: ['', Validators.required],
      txtBrandNameEdit: ['', Validators.required],
      txtModelNameEdit: ['', Validators.required],
      txtDescriptionEdit: ['', Validators.required],
      txtPriceEdit: ['', Validators.required]
    });    
  }

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(): void {
    this.serv.getAllBrands().subscribe(data=>{
      this.dataBrands = data;
    });
  }

  onFileChange(event:any) {
    this.myForm.get('fileImage')!.setValue(event.target.files[0]);
  }

  getAllModels(event:any) {
    this.serv.getAllModels(event.target.value).subscribe(data=>{
      this.dataModels = data;
      let dB = this.dataBrands;
      console.log(dB);
      for (let i=0; i<this.dataBrands.length; i++)
      {
        if (this.dataBrands[i]['brandid']==event.target.value)
        {
          this.modelSelect = this.dataBrands[i]['brandname'];
        }
      }
    });
  }

  getAllModelsAfterAction() {
    this.serv.getAllModels($(this.slcBrandName.nativeElement).val()).subscribe(data=>{
      console.log(data);
      this.dataModels = data;      
    });
  }

  addModel(): void {
    if (this.myForm.get('txtModelName')?.value=='')
    {
      alert("Insert model name!");
      return; 
    }
    if (this.myForm.get('fileImage')?.value=='')
    {
      alert("Insert file for logo!");
      return; 
    }
    if (this.myForm.get('txtDescription')?.value=='')
    {
      alert("Insert description for this model!");
      return; 
    }
    if (this.myForm.get('txtPrice')?.value=='')
    {
      alert("Insert price for this model!");
      return; 
    }
    const formData = new FormData();
    formData.append("txtModelName", this.myForm.get('txtModelName')!.value );
    formData.append("filePic", this.myForm.get('fileImage')!.value);
    formData.append("slcBrandId", $(this.slcBrandName.nativeElement).val() );
    formData.append("txtDescription", this.myForm.get('txtDescription')!.value );
    formData.append("txtPrice", this.myForm.get('txtPrice')!.value );
    this.serv.addModel(formData).subscribe(data=>{
      this.getAllModelsAfterAction();
      this.emptyModelForm('add');
      alert("One model has been added!");
    });
  }

  emptyModelForm(ty:any) {
    if (ty=='add')
    {
      this.myForm.get('txtModelName')!.setValue('');
      this.fImage.nativeElement.value=null;
      this.myForm.get('txtDescription')!.setValue('');
      this.myForm.get('txtPrice')!.setValue('');
    }
    else
    {
      this.editForm.get('txtBrandName')!.setValue('');
    }
  }

  getModel(item:any): void {
    this.editForm.get('txtModelId')!.setValue(item.modelid);
    this.editForm.get('txtBrandNameEdit')!.setValue( this.modelSelect );
    this.editForm.get('txtModelNameEdit')!.setValue( item.modelname );
    this.editForm.get('txtDescriptionEdit')!.setValue( item.desc );
    this.editForm.get('txtPriceEdit')!.setValue( item.price );
    $(this.modEdit.nativeElement).modal('show'); 
  }

  updateModel(): void {
    if (this.editForm.get('txtModelNameEdit')?.value=='')
    {
      alert("Insert model name!");
      return; 
    }
    if (this.editForm.get('txtDescriptionEdit')?.value=='')
    {
      alert("Insert description!");
      return; 
    }
    if (this.editForm.get('txtPrice')?.value=='')
    {
      alert("Insert price for this model!");
      return; 
    }

    const formData = new FormData();
    formData.append("txtModelId", this.editForm.get('txtModelId')!.value );
    formData.append("txtModelName", this.editForm.get('txtModelNameEdit')!.value);
    formData.append("txtDescription", this.editForm.get('txtDescriptionEdit')!.value);
    formData.append("txtPrice", this.editForm.get('txtPriceEdit')!.value);
    this.serv.updateModel(formData).subscribe(data=>{
      this.getAllModelsAfterAction();
      alert("One car model data has been change!");
      $(this.modEdit.nativeElement).modal('hide'); 
    });
  }

  delModel(modelid: any) {
    if (confirm("Delete this model?")==true)
    {
      this.serv.delModel(modelid).subscribe(data=>{
        this.getAllModelsAfterAction();
        alert("Delete one model : done!");
      });
    }
  }

}
