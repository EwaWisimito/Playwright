import { Page } from '@playwright/test';

export class SideMenuComponents {
    constructor(private page: Page) {}

    paymentMenuButton = this.page.getByRole('link', { name: 'płatności' });

}