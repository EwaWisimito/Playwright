import { Page } from '@playwright/test';

export class Desktop {
  constructor(private page: Page) {}

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
}
