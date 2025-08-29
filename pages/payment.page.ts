import { Page } from '@playwright/test';

export class Payment {
    constructor(private page: Page) {}

    transferReceiverInput = this.page.getByTestId('transfer_receiver');
    accountNumberInput = this.page.getByTestId('form_account_to');
    amountInput = this.page.getByTestId('form_amount');
    executeTransferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
    closeButton = this.page.getByTestId('close-button');

    transferMessageText = this.page.getByTestId('message-text');
}