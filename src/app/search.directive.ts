import {
  AfterViewInit,
  computed,
  Directive,
  ElementRef,
  input,
  Input,
  OnDestroy,
  Renderer2,
  Signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appSearch]',
  standalone: true,
})
export class SearchDirective implements AfterViewInit, OnDestroy {
  color = input<string>('yellow');
  @Input('searchQuery') searchQuery: FormControl = new FormControl();
  unsubscribe$ = new Subject<void>()

  styles: Signal<string> = computed(() => `display: inline-flex; background: ${ this.color() }`)

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const text: string = this.elementRef.nativeElement.textContent;

    this.searchQuery.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.wordSearch(value, text);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
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
