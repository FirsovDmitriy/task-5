import {
  AfterViewInit,
  computed,
  Directive,
  ElementRef,
  input,
  Input,
  Renderer2,
  Signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appSearch]',
  standalone: true,
})
export class SearchDirective implements AfterViewInit {
  color = input<string>('yellow');
  @Input('searchQuery') searchQuery: FormControl = new FormControl();

  styles: Signal<string> = computed(() => `display: inline-flex; background: ${ this.color() }`)

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const text: string = this.elementRef.nativeElement.textContent;

    this.searchQuery.valueChanges
      .subscribe((value) => {
        this.wordSearch(value, text);
      });
  }

  wordSearch(value: string, text: string) {
    if (!value) {
      return this.renderer.setProperty(
        this.elementRef.nativeElement,
        'innerHTML',
        text
      );
    }

    const regexp = new RegExp(`\\b${ value }`, 'gi');
    const matchArray = text.match(regexp);
    let index = 0;

    const formattedText = text.replace(
      regexp,
      () => `<span style='${ this.styles() }'> ${ matchArray?.[index++] } </span>`
    );

    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      formattedText
    );
  }
}
