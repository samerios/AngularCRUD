import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogType } from 'src/app/enums/dialog-type';
import { City } from 'src/app/models/city';
import { Group } from 'src/app/models/group';
import { SelectConfig } from 'src/app/models/select-config';
import { User } from 'src/app/models/user';
import { HelperService } from 'src/app/services/helper.service';
import { ApiService } from 'src/app/shared/api.service';
import { UiService } from 'src/app/shared/ui.service';

/** Add or edit user component contains form with user data **/
@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  /** Form title */
  title!: string;

  /** All Cities array of objects for iterate in select option in html  */
  cities: City[] = [];

  /** Selected city for bind to select value  */
  selectedCity!: number;

  /** Gender list for iterate in radio button in html */
  genderList: string[] = ["Male", "Female"];

  /** All groups for send to ChipsAutocompleteComponent child component */
  groups!: Group[];

  /** Selected groups for bind to ChipsAutocompleteComponent child component */
  selectedGroups!: Group[];

  /** Groups auto complete config object for send to ChipsAutocompleteComponent child component  */
  groupsAutoCompleteConfig!: SelectConfig;

  /** User form group */
  userForm!: FormGroup;

  /** Action button name save/update by state  */
  actionIconButton: string = "save";

  /**
   * Constructor
   * @param formBuilder Form builder for use reactive form
   * @param ui Ui service use for open dialogs
   * @param api Api service use for get data
   * @param helper Helper service for use helper function
   * @param editData Edit data contains user data when edit user form
   * @param dialogRef Dialog reference for control dialog
   * @param _snackBar Snackbar use for show snackbar message
   */
  constructor(private formBuilder: FormBuilder,
    private ui: UiService,
    private api: ApiService,
    private helper: HelperService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public dialogRef: MatDialogRef<AddEditUserComponent>,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    // Init selected groups array by default with no values
    this.selectedGroups = [];

    // Init groups auto complete config
    this.groupsAutoCompleteConfig = new SelectConfig('id', 'groupName');

    // Init cities array
    this.api.getAll("http://localhost:3000/city/").subscribe({
      next: (cities) => {
        this.cities = cities;
      },
      error: () => {
        this.ui.openDialog(DialogType.Alert, "Error", "Error while get cities");
      }
    });

    //Init groups array
    this.api.getAll("http://localhost:3000/group/").subscribe({
      next: (groups) => {
        this.groups = groups;
      },
      error: () => {
        this.ui.openDialog(DialogType.Alert, "Error", "Error while get groups");
      }
    });

    // Init form group and set validators
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, this.emailUniqueValidator.bind(this)]],
      phoneNumber: ['', [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', [Validators.minLength(2), Validators.maxLength(20)]],
      gender: [''],
    });

    // Edit user form, init user controls
    if (this.editData && this.editData['data']) {

      // Change icon to update
      this.actionIconButton = "update";

      let user: User[] = Object.values(this.editData);

      this.userForm.controls['firstName'].setValue(user[0].firstName);
      this.userForm.controls['lastName'].setValue(user[0].lastName);
      this.userForm.controls['email'].setValue(user[0].email);
      this.userForm.controls['phoneNumber'].setValue(user[0].phoneNumber);
      this.userForm.controls['gender'].setValue(user[0].gender);
      this.selectedCity = user[0].city! ? user[0].city!.id : 0;

      // Init groups array
      if (user[0].groups) {
        user[0].groups.forEach(element => {
          this.selectedGroups.push(element);
        });
      }
    }
  }

  /**
   * Save or update form (when user click save/update icon button)
   * and check id data us valid if not valid show snackbar message 
   */
  saveOrUpdateData(): void {
    // Check if user in form as valid
    if (this.userForm.valid) {
      let city = this.cities.find(x => x.id == this.selectedCity);
      let user: User = new User(this.userForm.value['firstName'], this.userForm.value['lastName'],
        this.userForm.value['email'], this.userForm.value['phoneNumber'],
        this.userForm.value['address'], this.userForm.value['gender'], city, this.selectedGroups);

      // Edit user block
      if (this.editData && this.editData['data']) {
        this.editUserData(user, this.editData['data'].id);
      }
      else {
        // Add user block
        this.addNewUser(user);
      }
    }
    else {
      this._snackBar.open("Invalid data", "", {
        duration: 2000
      },
      );
    }
  }

  /**
   * Edit user data
   * @param user User to update
   */
  editUserData(user: User, userId: number) {
    this.api.put("http://localhost:3000/user/", userId, user).subscribe({
      next: (res => {
        // Show success snackbar message
        this._snackBar.open("User updated successfully!!!", "", {
          duration: 2000
        });
        this.userForm.reset();
        this.dialogRef.close("update");
      }),
      error: () => {
        this.ui.openDialog(DialogType.Alert, "Error", "Error while update user");
      }
    });
  }

  /**
   * Add new user
   * @param user User to add
   */
  addNewUser(user: User) {
    this.api.post<User>("http://localhost:3000/user/", user).subscribe({
      next: () => {
        // Show success snackbar message
        this._snackBar.open("User added successfully!!!", "", {
          duration: 2000
        }); this.userForm.reset();
        this.dialogRef.close("save");
      },
      error: () => {
        this.ui.openDialog(DialogType.Alert, "Error", "Error while adding the user");
      }
    });
  }

  /**
   * Email Uniq validator
   * @param control Abstract control
   */
  emailUniqueValidator(control: AbstractControl) {
    // Check if control is not null
    if (control) {

      // Get value and store it 
      const email = control.value;

      // If the value is valid go to the if block
      if (control.value) {

        // Get all users to check if email is uniq
        this.api.getAll("http://localhost:3000/user/").subscribe({
          next: (data) => {
            let users: User[] = data;

            // Check if email unique
            let isValueUnique = users.map(user => user.email).some(value => value === email);

            // If email already exist set error to control
            if ((isValueUnique && !this.editData['data']) ||
              (isValueUnique && this.editData['data'] && (this.editData['data']['email'] != email))) {
              this.helper.addErrors({ ['email']: 'Already Exist' }, control);
            }
          },
          error: () => {
            this.ui.openDialog(DialogType.Alert, "Error", "Error while getting users!!");
          }
        });
      }
    }
  }
}
