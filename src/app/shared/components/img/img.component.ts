/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  img: string  = '';
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input("img")
  set changeImg(newImg: string){
    this.img = newImg;
  }

  @Input() alt:string = "";
  @Output() loaded = new EventEmitter<string>();

  imgDefault = "../../../assets/imgs/default.png";
  //counter = 0;
  //counterFn: number | undefined;

  constructor(){
    //before render
  }

  imgError(){
    this.img = this.imgDefault;
  }
  imgLoaded(){
    this.loaded.emit(this.img);
  }
}
