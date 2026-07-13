export type PurchaseStoreType = 'audiobook' | 'physical_book' | 'ebook';

export type PurchaseStoreGroupTitleKey =
  | 'audiobookTitle'
  | 'physicalBookTitle'
  | 'ebookTitle';

export interface PurchaseStore {
  name: string;
  href: string;
}

export interface PurchaseStoreGroup {
  type: PurchaseStoreType;
  titleKey: PurchaseStoreGroupTitleKey;
  stores: PurchaseStore[];
}

export const purchaseStoreGroups: PurchaseStoreGroup[] = [
  {
    type: 'audiobook',
    titleKey: 'audiobookTitle',
    stores: [
      { name: 'Odilo', href: 'https://marketplace.odilo.us/opac/?id=08823311#recordCard' },
      { name: 'OverDrive', href: 'https://www.overdrive.com/media/12642146' },
      { name: 'Apple Books', href: 'https://books.apple.com/us/audiobook/negociando-bonito/id1858248569' },
      { name: 'Kobo', href: 'https://www.kobo.com/mx/en/audiobook/negociando-bonito' },
      { name: 'Google Play', href: 'https://play.google.com/store/audiobooks/details?id=AQAAAEDq2hya5M' },
    ],
  },
  {
    type: 'physical_book',
    titleKey: 'physicalBookTitle',
    stores: [
      { name: 'Thyrso Editorial', href: 'https://thyrsoeditorial.com/producto/negociando-bonito-de-roberto-luna/' },
      { name: 'Amazon (On Demand)', href: 'https://www.amazon.com/dp/B0GQLYNSFV' },
    ],
  },
  {
    type: 'ebook',
    titleKey: 'ebookTitle',
    stores: [
      { name: 'Kindle (Español - amazon.com)', href: 'https://www.amazon.com/Negociando-bonito-Spanish-Roberto-Luna-ebook/dp/B0GNJ9T3R7/' },
      { name: 'Kindle (Español - amazon.mx)', href: 'https://www.amazon.com.mx/dp/B0GNJ9T3R7' },
      { name: 'Kindle (English)', href: 'https://www.amazon.com.mx/dp/B0GPLW9ZYT' },
      { name: 'Kindle (Português)', href: 'https://www.amazon.com.mx/dp/B0G6XRGRPG' },
    ],
  },
];
