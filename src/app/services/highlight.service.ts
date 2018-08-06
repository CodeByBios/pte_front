import { Injectable, ElementRef } from '@angular/core';
import * as Highlight from 'highlight.js';

@Injectable({
    providedIn: 'root'
})
export class HighlightService {

    constructor() {}
    
    highlight(codeBlock: any, useBr?: boolean, tabReplace?: boolean): void {
        if (useBr) {
            Highlight.configure({ useBR: true });
        }
        if (tabReplace) {
            Highlight.configure({ tabReplace: '  '});
        }
        Highlight.highlightBlock(codeBlock);
    }
}