import { Injectable, EventEmitter } from '@angular/core'

@Injectable({providedIn: 'root'})


export class DropdownService {

    // Tells the viewport
    buttonEmitter = new EventEmitter<boolean>();
    // Updates the directive
    buttonEmitterCancelled = new EventEmitter<boolean>();
}