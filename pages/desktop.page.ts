import { Page } from '@playwright/test';
import { SideMenuComponents } from '../components/side-menu.component';

export class Desktop {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponents(this.page);
  //paymentMenuButton = this.page.getByRole('link', { name: 'płatności' });

  userNameID = this.page.getByTestId('user-name');
  receiverInput = this.page.locator('#widget_1_transfer_receiver');
  transferAmountInput = this.page.locator('#widget_1_transfer_amount');
  transferTitleInput = this.page.locator('#widget_1_transfer_title');
  desktopExecuteButton = this.page.locator('#execute_btn');

  topUpReceiver = this.page.locator('#widget_1_topup_receiver');
  topUpAmount = this.page.locator('#widget_1_topup_amount');
  topUpAgreement = this.page.locator('#widget_1_topup_agreement');
  executePhoneButton = this.page.locator('#execute_phone_btn');
  topUpMoneyValue = this.page.locator('#money_value');

  desktopCloseButton = this.page.getByTestId('close-button');
  showMessages = this.page.locator('#show_messages');

  async makeQuickPayment(
    reciverID: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.receiverInput.selectOption(reciverID);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferTitleInput.fill(transferTitle);

    await this.desktopExecuteButton.click();
    await this.desktopCloseButton.click();
  }

  async rechargePhone(
    topupReciver: string,
    topupAmount: string,
  ): Promise<void> {
    await this.topUpReceiver.selectOption(topupReciver);
    await this.topUpAmount.fill(topupAmount);
    await this.topUpAgreement.click();

    await this.executePhoneButton.click();
    await this.desktopCloseButton.click();
  }
}
