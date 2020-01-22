import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import {FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  closeResult: string;
  choices:string[]=["first","last","handle"]
   reactiveForm:FormGroup;
   selectedArray:string[];
   value=true;
   value2=true;
   value3=true;
   arr1:any=[{
     name:"First",
     value:"First",
     selected:true
   },{
    name:"Last",
    value:"Last",
    selected:true
  },{
    name:"Handle",
    value:"Handle",
    selected:true
  },]
  constructor(private modalService: NgbModal,private fb:FormBuilder) { }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  selected(){

    console.log(this.choices2.value[0].showField)
    this.value=this.choices2.value[0].showField;
    this.value2=this.choices2.value[1].showField;
    this.value3=this.choices2.value[2].showField;

    
  
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addchoicescontrol(){
    const arr=this.arr1.map(element=>{
      return this.fb.group({
        fieldName:[element.name],
        fieldValue:[element.value],
        showField:[element.selected]
      })
    })
    return this.fb.array(arr)
  }
  
  get choices2(){
    return <FormArray> this.reactiveForm.get('choices2')
  }
  ngOnInit() {
    this.reactiveForm=this.fb.group({
      choices2:this.addchoicescontrol()
    })
      
    
  }

}
