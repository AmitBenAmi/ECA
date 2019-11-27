import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

const TRANSLATION_LOCATION = "paginator.labels";
const ITEMS_PER_PAGE_TRANSLATION_LOCATION = `${TRANSLATION_LOCATION}.itemsPerPage`;
const NEXT_PAGE_TRANSLATION_LOCATION = `${TRANSLATION_LOCATION}.nextPage`;
const PREV_PAGE_TRANSLATION_LOCATION = `${TRANSLATION_LOCATION}.previousPage`;
const FIRST_PAGE_TRANSLATION_LOCATION = `${TRANSLATION_LOCATION}.firstPage`;
const LAST_PAGE_TRANSLATION_LOCATION = `${TRANSLATION_LOCATION}.lastPage`;
const PAGES_OUT_OF_TRANSLATION_LOCATION = `${TRANSLATION_LOCATION}.pagesOutOf`;

@Injectable()
export class MatPaginatorI18nService extends MatPaginatorIntl {
    constructor(@Inject(LOCALE_ID) public locale: string, private translate: TranslateService) {
        super();
        this.translate.setDefaultLang(locale);

        this.translate.onLangChange.subscribe((e: Event) => {
            this.setLabelsByTranslation();
        })

        this.setLabelsByTranslation();
    }

    private setLabelsByTranslation() {
        this.translate.get([
            ITEMS_PER_PAGE_TRANSLATION_LOCATION,
            NEXT_PAGE_TRANSLATION_LOCATION,
            PREV_PAGE_TRANSLATION_LOCATION,
            FIRST_PAGE_TRANSLATION_LOCATION,
            LAST_PAGE_TRANSLATION_LOCATION
        ]).subscribe((translations: Array<string>) => {
            this.itemsPerPageLabel = translations[ITEMS_PER_PAGE_TRANSLATION_LOCATION]
            this.nextPageLabel = translations[NEXT_PAGE_TRANSLATION_LOCATION];
            this.previousPageLabel = translations[PREV_PAGE_TRANSLATION_LOCATION];
            this.firstPageLabel = translations[FIRST_PAGE_TRANSLATION_LOCATION];
            this.lastPageLabel = translations[LAST_PAGE_TRANSLATION_LOCATION];

            this.changes.next();
        })
    }

    // This is the same implementation as the super class, but with the translation
    public getRangeLabel = (page, pageSize, length) => {
        if (length == 0 || pageSize == 0) {
            return `0 ${this.translate.instant(PAGES_OUT_OF_TRANSLATION_LOCATION)} ${length}`;
        }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        return `${startIndex + 1} – ${endIndex} ${this.translate.instant(PAGES_OUT_OF_TRANSLATION_LOCATION)} ${length}`;
    };
}