import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { HighlightService } from '../services/highlight.service'

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements OnInit {

  @Input() content: string;
  @Input() language: string;
  @ViewChild('code') code: ElementRef;
  innerContent: string;

  constructor(private highlightService: HighlightService) { }

  ngOnInit() {
    this.innerContent = this.content;
    if (this.language === 'html') {
        this.innerContent = this.innerContent.replace(/</gm, '&lt;');
        this.innerContent = this.innerContent.replace(/>/gm, '&gt;');
    }

    this.highlightService.highlight(this.code.nativeElement);
  }
}
