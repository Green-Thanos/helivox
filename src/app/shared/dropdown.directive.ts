import { Directive, HostListener, HostBinding, OnInit } from '@angular/core';
import { DropdownService } from './dropdown.service';

@Directive({
    selector: '[app-dropdown]'
})
export class DropdownDirective implements OnInit{
    @HostBinding('class.current') isOpen = false;

    ngOnInit(): void {
       this.ddService.buttonEmitter.subscribe(isOpen => {
        this.isOpen = isOpen;
       })
    
    }
    
    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
        this.ddService.buttonEmitter.emit(this.isOpen);
    }
    constructor(private ddService: DropdownService) {}
}