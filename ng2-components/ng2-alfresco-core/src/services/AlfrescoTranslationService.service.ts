/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable, Optional } from 'angular2/core';
import { Http } from 'angular2/http';
import { MissingTranslationHandler, TranslateService } from 'ng2-translate/ng2-translate';
import { AlfrescoTranslationLoader } from './AlfrescoTranslationLoader.service';

@Injectable()
export class AlfrescoTranslationService extends TranslateService {
    userLang: string = 'en' ;
    currentLoader: AlfrescoTranslationLoader;

    constructor(http: Http, currentLoader: AlfrescoTranslationLoader, @Optional() missingTranslationHandler: MissingTranslationHandler) {
        super(http, currentLoader, missingTranslationHandler);
    }

    translationInit(name: string = ''): void {
        let userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
        this.userLang = userLang;
        this.setDefaultLang(this.userLang);
        this.addComponent(name);
        this.use(this.userLang);
    }

    addComponent(name: string) {
        if (!this.currentLoader.existComponent(name)) {
            this.currentLoader.addComponentList(name);
            this.getTranslation(this.userLang);
        }
    }
}