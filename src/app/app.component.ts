import { Component, OnInit } from '@angular/core';
import { AddEditUserComponent } from './components/custom/add-edit-user/add-edit-user.component';
import { DialogType } from './enums/dialog-type';
import { TableColumnConfig } from './models/table-column-config';
import { SelectConfig } from './models/select-config';
import { TableConfig } from './models/table-config';
import { User } from './models/user';
import { ApiService } from './shared/api.service';
import { UiService } from './shared/ui.service';
import { ButtonType } from './enums/button-type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /** Users table config object for send as parameter to table component */
  usersTableConfig!: TableConfig;

  /**
   * Constructor
   * @param api Api service for CRUD data
   * @param ui Ui service for ope dialogs
   * @param _snackBar Mat snackbar for show snackbar
   */
  constructor(private api: ApiService, private ui: UiService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initUsersTable();
  }

  /**
   * Init users table
   */
  initUsersTable() {
    // Table data source variable
    let tableDataSource: User[];

    let columnsConfig: TableColumnConfig[] = [new TableColumnConfig("id", "ID"),
    new TableColumnConfig("firstName", "First Name"), new TableColumnConfig("email", "Email"),
    new TableColumnConfig("phoneNumber", "Phone Number"), new TableColumnConfig("city", "City",
      new SelectConfig("id", "name")),
    new TableColumnConfig("address", "Address"), new TableColumnConfig("gender", "Gender")];

    this.api.getAll("http://localhost:3000/user/").subscribe(
      {
        next: (data) => {
          tableDataSource = data;
          this.usersTableConfig = new TableConfig(tableDataSource, columnsConfig, "id", true, true);
        },
        error: () => {
          this.ui.openDialog(DialogType.Alert, "Error", "Error while fetching records");
        }
      }
    );
  }

  /**
   * Open Add User form in dialog and if added new user 
   * then call to initUsersTable function to refresh data
   */
  openAddUserFormInDialog() {
    this.ui.openComponentInDialog(AddEditUserComponent, "Add User Form", null, "50%").afterClosed().subscribe(value => {
      if (value == 'save') {
        this.initUsersTable();
      }
    });
  }

  /**
   *  Edit user (when clicked edit button on record from child component) 
   *  and send selected row data and if user updated 
   *  then call to initUsersTable function to refresh data
   * @param userData User data
   */
  editUser(userData: any) {
    this.ui.openComponentInDialog(AddEditUserComponent, "Edit User Form", userData).afterClosed().subscribe(value => {
      if (value == 'update') {
        this.initUsersTable();
      }
    });
  }

  /**
   * Delete user (when clicked delete button on record from child component) ask before
   * @param userId user id for delete
   */
  deleteUser(userId: any) {
    this.ui.openDialog(DialogType.YesNoCancelPrompt, "Warning", "Are you sure to delete user : " + userId + " ?").subscribe((result: ButtonType) => {
      let buttonType: unknown = ButtonType[result];

      // Delete user if clicked on yes button
      if (buttonType == ButtonType.Yes) {
        this.api.delete("http://localhost:3000/user/", userId).subscribe({
          next: () => {
            this.initUsersTable();

            // Show success snackbar message
            this._snackBar.open("User deleted successfully!!!", "", {
              duration: 2000
            });
          },
          error: () => {
            this.ui.openDialog(DialogType.Alert, "Error", "Error while fetching records");
          }
        });
      }
    });
  }
}
