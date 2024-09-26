import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>
  private _color: string = 'red'
  private _errors?: ValidationErrors | null

  @Input() set color(value: string){
   this._color = value
   this.setStyle()
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value
    this.setErrorMsg()
  }

  constructor(private el: ElementRef<HTMLElement>) {
    console.log('Constructor de la directiva')
    this.htmlElement = el

    // this.htmlElement.nativeElement.innerHTML = 'HOla mundo'
  }
  ngOnInit(): void {
    console.log('Directiva ngOnInit')
    this.setStyle()
  }

  setStyle():void {
    if(!this.htmlElement) return
    this.htmlElement!.nativeElement.style.color = this._color
  }

  setErrorMsg(): void {
    if(!this.htmlElement) return
    if(!this._errors){
      this.htmlElement.nativeElement.innerText = ''
      return
    }

    const errors = Object.keys(this._errors)
    if (errors.includes('required')){
      this.htmlElement.nativeElement.innerText = 'Campo requerido'
      return
    }
    if ( errors.includes('email') )  {
      this.htmlElement.nativeElement.innerText = 'Formato de correo erroneo.';
      return;
    }

    if ( errors.includes('minlength') )  {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      console.log('min', min)
      console.log('current', current)

      this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${ min } caracteres.`;
      return;
    }


  }

}
