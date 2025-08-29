import { Page } from '@playwright/test';
import { SideMenuComponents } from '../components/side-menu.component';

export class Payment {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponents(this.page);
  //paymentMenuButton = this.page.getByRole('link', { name: 'płatności' });

  transferReceiverInput = this.page.getByTestId('transfer_receiver');
  accountNumberInput = this.page.getByTestId('form_account_to');
  amountInput = this.page.getByTestId('form_amount');
  executeTransferButton = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });
  closeButton = this.page.getByTestId('close-button');

  transferMessageText = this.page.getByTestId('message-text');

  async makeTransfer(
    transferReceiver: string,
    accountNumber: string,
    transferAmount: string,
  ): Promise<void> {
    await this.transferReceiverInput.fill(transferReceiver);
    await this.accountNumberInput.fill(accountNumber);
    await this.amountInput.fill(transferAmount);

    await this.executeTransferButton.click();
    await this.closeButton.click();
  }
}
