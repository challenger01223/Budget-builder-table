import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './context-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ContextMenuComponent,
    RouterOutlet,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('contextMenu') myInput!: ContextMenuComponent;
  monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  title = 'budget-builder';
  startMonth = "2024-01-01";
  endMonth = "2024-12-01";
  monthCount = 0;
  months = [{ year: 2024, month: 'Feb', row: 0, col: 0 }]
  showBalance = 0;
  menuItems = [
    { label: 'Apply to all', action: this.applyToAll.bind(this) },
  ];

  ngOnInit(): void {
    this.onMonthChange()
  }

  onRightClick(event: MouseEvent, i: number, j: number, type: number) {
    event.preventDefault();
    if (this.myInput) {
      this.myInput.i = i;
      this.myInput.j = j;
      this.myInput.type = type;
      this.myInput.show(event.clientX, event.clientY)
    }
  }

  incomes = [
    {
      name: 'General Income',
      values: new Array,
      tvalues: new Array,
      type: 0,
    },
    {
      name: 'Sales',
      values: new Array,
      tvalues: new Array,
      type: 1,
    },
    {
      name: 'Commission',
      values: new Array,
      tvalues: new Array,
      type: 1,
    },
    {
      name: 'Add a new ‘General Income’ Category',
      values: new Array,
      tvalues: new Array,
      type: 4,
    },
    {
      name: 'Sub Totals',
      values: new Array,
      tvalues: new Array,
      type: 2,
    },
    {
      name: 'Other Income',
      values: new Array,
      tvalues: new Array,
      type: 0,
    },
    {
      name: 'Training',
      values: new Array,
      tvalues: new Array,
      type: 1,
    },
    {
      name: 'Consulting',
      values: new Array,
      tvalues: new Array,
      type: 1,
    },
    {
      name: 'New income category',
      values: new Array,
      tvalues: new Array,
      type: 4,
    },
    {
      name: 'Sub Totals',
      values: new Array,
      tvalues: new Array,
      type: 2,
    },
    {
      name: 'Add New Parent Category',
      values: new Array,
      tvalues: new Array,
      type: 5,
    },
    {
      name: 'Income Total',
      values: new Array,
      tvalues: new Array,
      type: 3,
    }];

  expenses = [
    {
      name: 'Operational Expenses',
      values: new Array,
      tvalues: new Array,
      type: 0,
    },
    {
      name: 'Management Fees',
      values: new Array,
      tvalues: new Array,
      type: 1,
    },
    {
      name: 'Cloud Hosting',
      values: new Array,
      tvalues: new Array,
      type: 1,
    },
    {
      name: 'Add new ‘Operational Expenses’ category',
      values: new Array,
      tvalues: new Array,
      type: 4,
    },
    {
      name: 'Sub Totals',
      values: new Array,
      tvalues: new Array,
      type: 2,
    },
    {
      name: 'Salaries & Wages',
      values: new Array,
      tvalues: new Array,
      type: 0,
    },
    {
      name: 'Full Time Dev Salaries',
      values: new Array,
      tvalues: new Array,
      type: 1,
    },
    {
      name: 'Part Time Dev Salaries',
      values: new Array,
      tvalues: new Array,
      type: 1,
    },
    {
      name: 'Remote Salaries',
      values: new Array,
      tvalues: new Array,
      type: 1,
    },
    {
      name: 'Add new ‘Sales and Wages’ category',
      values: new Array,
      tvalues: new Array,
      type: 4,
    },
    {
      name: 'Sub Totals',
      values: new Array,
      tvalues: new Array,
      type: 2,
    },
    {
      name: 'Add New Parent Category',
      values: new Array,
      tvalues: new Array,
      type: 5,
    },
    {
      name: 'Total Expenses',
      values: new Array,
      tvalues: new Array,
      type: 3,
    }];
  balances = [
    {
      name: 'Profit / Loss',
      values: new Array,
      tvalues: new Array,
    },
    {
      name: 'Opening Balance',
      values: new Array,
      tvalues: new Array,
    },
    {
      name: 'Closing Balance',
      values: new Array,
      tvalues: new Array,
    },
  ];
  onMonthChange(): void {
    this.months.splice(0, this.months.length)
    let col = 0
    const sDate = new Date(this.startMonth), eDate = new Date(this.endMonth)
    const year1 = sDate.getFullYear(), month1 = sDate.getMonth(), year2 = eDate.getFullYear(), month2 = eDate.getMonth()
    this.monthCount = 0;
    for (let year = year1; year <= year2; year++)
      for (let month = (year == year1 ? month1 : 0); month <= (year == year2 ? month2 : 11); month++) {
        this.monthCount++;
        this.months.push({ year, month: this.monthString[month], row: 0, col: col++ })
      }
    for (let i = 0; i < this.incomes.length; i++) {
      this.incomes[i].tvalues = new Array(this.monthCount);
      this.incomes[i].values = new Array(this.monthCount + 1);
      for (let j = 0; j <= this.monthCount; j++)
        this.incomes[i].values[j] = 0;
    }
    for (let i = 0; i < this.expenses.length; i++) {
      this.expenses[i].tvalues = new Array(this.monthCount);
      this.expenses[i].values = new Array(this.monthCount + 1);
      for (let j = 0; j <= this.monthCount; j++)
        this.expenses[i].values[j] = 0;
    }
    for (let i = 0; i < 3; i++) {
      this.balances[i].tvalues = new Array(this.monthCount);
      this.balances[i].values = new Array(this.monthCount + 1);
      for (let j = 0; j <= this.monthCount; j++)
        this.balances[i].values[j] = 0;
    }
  }
  onDataChange(): void {
    let PL: Array<number> = Array(this.monthCount + 1).fill(0);
    let income: number = 0;
    let income1: number = 0;
    let expense: number = 0;
    let expense1: number = 0;
    for (let i = 0; i <= this.monthCount; i++) {
      for (let j = 0; j < this.incomes.length; j++) {
        if (this.incomes[j].type == 3) {
          this.incomes[j].values[i] = income1;
          PL[i] = PL[i] + income1;
          income1 = 0;
        }
        else if (this.incomes[j].type == 2) {
          this.incomes[j].values[i] = income;
          income1 += income;
          income = 0;
        }
        else if (this.incomes[j].type != 4)
          income += Number(this.incomes[j].values[i]);
      }

      for (let j = 0; j < this.expenses.length; j++) {
        if (this.expenses[j].type == 3) {
          this.expenses[j].values[i] = expense1;
          PL[i] = PL[i] - expense1;
          expense1 = 0;
        }
        else if (this.expenses[j].type == 2) {
          this.expenses[j].values[i] = expense;
          expense1 += expense;
          expense = 0;
        }
        else if (this.expenses[j].type != 4)
          expense += Number(this.expenses[j].values[i]);
      }

      this.balances[0].values[i] = PL[i];
      if (i === 1) {
        this.balances[1].values[i] = 0;
      } else {
        this.balances[1].values[i] = this.balances[2].values[i - 1]
      }
      this.balances[2].values[i] = this.balances[1].values[i] + this.balances[0].values[i];
    }
  }

  applyToAll(i: number, j: number, type: number): void {
    if (type === 0) {
      for (let m = 0; m <= this.monthCount; m++) {
        this.incomes[i].values[m] = this.incomes[i].values[j + 1]
      }
    } else {
      for (let m = 0; m <= this.monthCount; m++) {
        this.expenses[i].values[m] = this.expenses[i].values[j + 1]
      }
    }
    this.onDataChange();
  }

  onDeleteRow(row: number, type: number): void {
    type == 0 ? this.incomes.splice(row, 1) : this.expenses.splice(row, 1);
    this.onDataChange();
  }

  onKeyDown(event: KeyboardEvent, element: HTMLInputElement, row: number, content: string): void {
    switch (event.key) {
      case 'Enter':
        if (element.getAttribute('name') != null && element.value != '') {
          let newCategory = {
            name: content || "",
            values: new Array,
            tvalues: new Array,
            type: 0,
          };
          let addCategory = {
            name: "Add new ‘" + content + "’ category",
            values: new Array,
            tvalues: new Array,
            type: 4,
          };
          addCategory.tvalues = new Array(this.monthCount);
          addCategory.values = new Array(this.monthCount + 1);
          let totalCategory = {
            name: "Sub Totals",
            values: new Array,
            tvalues: new Array,
            type: 2,
          };
          totalCategory.tvalues = new Array(this.monthCount);
          totalCategory.values = new Array(this.monthCount + 1);
          for (let j = 0; j <= this.monthCount; j++)
            totalCategory.values[j] = 0;
          if (element.getAttribute('name') == 'addSubIncome' || element.getAttribute('name') == 'addSubExpense')
            newCategory.type = 1;
          newCategory.tvalues = new Array(this.monthCount);
          newCategory.values = new Array(this.monthCount + 1);
          for (let j = 0; j <= this.monthCount; j++)
            newCategory.values[j] = 0;
          if (element.getAttribute('name') == 'addSubExpense' || element.getAttribute('name') == 'addParentExpense') {
            this.expenses.splice(row, 0, newCategory)
            if (newCategory.type == 0) {
              this.expenses.splice(row + 1, 0, addCategory)
              this.expenses.splice(row + 2, 0, totalCategory)
            }
          }
          else {
            this.incomes.splice(row, 0, newCategory)
            if (newCategory.type == 0) {
              this.incomes.splice(row + 1, 0, addCategory)
              this.incomes.splice(row + 2, 0, totalCategory)
            }
          }
          element.value = ''
        }
        break;
      default:
        break;
    }
  }

  onArrow(event: KeyboardEvent, element: HTMLElement): void {
    let index;
    switch (event.key) {
      case 'ArrowUp':
        index = element.id.split('_');
        if (Number(index[0]) > 0) {
          document.getElementById(Number(index[0]) - 1 + '_' + index[1])?.focus();
        }
        break;
      case 'ArrowDown':
        index = element.id.split('_');
        if (Number(index[0]) < this.incomes.length + this.expenses.length + this.balances.length) {
          document.getElementById(Number(index[0]) + 1 + '_' + index[1])?.focus();
        }
        break;
      case 'ArrowLeft':
        index = element.id.split('_');
        if (Number(index[1]) > 0) {
          document.getElementById(index[0] + '_' + (Number(index[1]) - 1))?.focus();
        }
        break;
      case 'ArrowRight':
        index = element.id.split('_');
        if (Number(index[1]) < this.monthCount) {
          document.getElementById(index[0] + '_' + (Number(index[1]) + 1))?.focus();
        }
        break;
      default:
        break;
    }
  }
}
