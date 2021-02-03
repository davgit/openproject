import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ElementRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {I18nService} from "core-app/modules/common/i18n/i18n.service";

@Component({
  selector: 'op-ium-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.sass'],
})
export class RoleComponent implements OnInit {
  @Input('type') type:string = '';
  @Input('project') project:any = null;
  @Input('principal') principal:any = null;
  @Input('role') role:any = null;

  @Output('close') close = new EventEmitter<void>();
  @Output('back') back = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ role:any }>();

  public text = {
    title: this.I18n.t('js.invite_user_modal.title.invite_principal_to_project', {
      principal: this.principal?.name,
      project: this.project?.name,
    }),
    label: this.I18n.t('js.invite_user_modal.role.label', {
      project: this.project.name
    }),
    description: this.I18n.t('js.invite_user_modal.role.description'),
    required: this.I18n.t('js.invite_user_modal.role.required'),
    backButton: this.I18n.t('js.invite_user_modal.back'),
    nextButton: this.I18n.t('js.invite_user_modal.role.next_button'),
  };

  roleForm = new FormGroup({
    role: new FormControl(null, [ Validators.required ]),
  });

  get roleControl() { return this.roleForm.get('role'); }

  constructor(
    readonly I18n:I18nService,
    readonly elementRef:ElementRef,
  ) {}

  ngOnInit() {
    this.roleControl?.setValue(this.role);
  }

  onSubmit($e:Event) {
    $e.preventDefault();
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }

    this.save.emit({ role: this.roleForm?.value });
  }
}
