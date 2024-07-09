import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TUI_SANITIZER } from "@taiga-ui/core";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiInputModule } from "@taiga-ui/kit";
import { SearchDirective } from "./search.directive";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TuiRootModule, TuiDialogModule, TuiInputModule, SearchDirective, ReactiveFormsModule   ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Task 5';

  searchQuery = new FormControl('')
  color = '#1F75CB'
}
