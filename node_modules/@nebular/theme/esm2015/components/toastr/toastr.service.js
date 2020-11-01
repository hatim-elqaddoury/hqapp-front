/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ComponentFactoryResolver, Inject, Injectable } from '@angular/core';
import { NbComponentPortal } from '../cdk/overlay/mapping';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbPositionBuilderService } from '../cdk/overlay/overlay-position';
import { NbPositionHelper } from '../cdk/overlay/position-helper';
import { patch } from '../cdk/overlay/overlay-service';
import { NbToastrContainerComponent } from './toastr-container.component';
import { NB_TOASTR_CONFIG, NbToastrConfig } from './toastr-config';
import { NB_DOCUMENT } from '../../theme.options';
export class NbToastRef {
    constructor(toastContainer, toast) {
        this.toastContainer = toastContainer;
        this.toast = toast;
    }
    close() {
        this.toastContainer.destroy(this.toast);
    }
}
export class NbToastContainer {
    constructor(position, containerRef, positionHelper) {
        this.position = position;
        this.containerRef = containerRef;
        this.positionHelper = positionHelper;
        this.toasts = [];
    }
    get nativeElement() {
        return this.containerRef.location.nativeElement;
    }
    attach(toast) {
        if (toast.config.preventDuplicates && this.isDuplicate(toast)) {
            return;
        }
        const toastComponent = this.attachToast(toast);
        if (toast.config.destroyByClick) {
            this.subscribeOnClick(toastComponent, toast);
        }
        if (toast.config.duration) {
            this.setDestroyTimeout(toast);
        }
        this.prevToast = toast;
        return new NbToastRef(this, toast);
    }
    destroy(toast) {
        this.toasts = this.toasts.filter(t => t !== toast);
        this.updateContainer();
    }
    isDuplicate(toast) {
        return this.prevToast
            && this.prevToast.message === toast.message
            && this.prevToast.title === toast.title;
    }
    attachToast(toast) {
        if (this.positionHelper.isTopPosition(toast.config.position)) {
            return this.attachToTop(toast);
        }
        else {
            return this.attachToBottom(toast);
        }
    }
    attachToTop(toast) {
        this.toasts.unshift(toast);
        this.updateContainer();
        return this.containerRef.instance.toasts.first;
    }
    attachToBottom(toast) {
        this.toasts.push(toast);
        this.updateContainer();
        return this.containerRef.instance.toasts.last;
    }
    setDestroyTimeout(toast) {
        setTimeout(() => this.destroy(toast), toast.config.duration);
    }
    subscribeOnClick(toastComponent, toast) {
        toastComponent.destroy.subscribe(() => this.destroy(toast));
    }
    updateContainer() {
        patch(this.containerRef, { content: this.toasts, position: this.position });
    }
}
let NbToastrContainerRegistry = class NbToastrContainerRegistry {
    constructor(overlay, positionBuilder, positionHelper, cfr, document) {
        this.overlay = overlay;
        this.positionBuilder = positionBuilder;
        this.positionHelper = positionHelper;
        this.cfr = cfr;
        this.document = document;
        this.overlays = new Map();
    }
    get(position) {
        const logicalPosition = this.positionHelper.toLogicalPosition(position);
        const container = this.overlays.get(logicalPosition);
        if (!container || !this.existsInDom(container)) {
            this.instantiateContainer(logicalPosition);
        }
        return this.overlays.get(logicalPosition);
    }
    instantiateContainer(position) {
        const container = this.createContainer(position);
        this.overlays.set(position, container);
    }
    createContainer(position) {
        const positionStrategy = this.positionBuilder.global().position(position);
        const ref = this.overlay.create({ positionStrategy });
        const containerRef = ref.attach(new NbComponentPortal(NbToastrContainerComponent, null, null, this.cfr));
        return new NbToastContainer(position, containerRef, this.positionHelper);
    }
    existsInDom(toastContainer) {
        return this.document.contains(toastContainer.nativeElement);
    }
};
NbToastrContainerRegistry = __decorate([
    Injectable(),
    __param(4, Inject(NB_DOCUMENT)),
    __metadata("design:paramtypes", [NbOverlayService,
        NbPositionBuilderService,
        NbPositionHelper,
        ComponentFactoryResolver, Object])
], NbToastrContainerRegistry);
export { NbToastrContainerRegistry };
/**
 * The `NbToastrService` provides a capability to build toast notifications.
 *
 * @stacked-example(Showcase, toastr/toastr-showcase.component)
 *
 * `NbToastrService.show(message, title, config)` accepts three params, title and config are optional.
 *
 * ### Installation
 *
 * Import `NbToastrModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbToastrModule.forRoot(config),
 *   ],
 * })
 * export class AppModule { }
 * ```
 *
 * ### Usage
 *
 * Calling `NbToastrService.show(...)` will render new toast and return `NbToastrRef` with
 * help of which you may close newly created toast by calling `close` method.
 *
 * ```ts
 * const toastRef: NbToastRef = this.toastrService.show(...);
 * toastRef.close();
 * ```
 *
 * Config accepts following options:
 *
 * `position` - determines where on the screen toast will be rendered.
 * Default is `top-end`.
 *
 * @stacked-example(Position, toastr/toastr-positions.component)
 *
 * `status` - coloring and icon of the toast.
 * Default is `primary`
 *
 * @stacked-example(Status, toastr/toastr-statuses.component)
 *
 * `duration` - the time after which the toast will be destroyed.
 * `0` means endless toast, that may be destroyed by click only.
 * Default is 3000 ms.
 *
 * @stacked-example(Duration, toastr/toastr-duration.component)
 *
 * `destroyByClick` - provides a capability to destroy toast by click.
 * Default is true.
 *
 * @stacked-example(Destroy by click, toastr/toastr-destroy-by-click.component)
 *
 * `preventDuplicates` - don't create new toast if it has the same title and the same message with previous one.
 * Default is false.
 *
 * @stacked-example(Prevent duplicates, toastr/toastr-prevent-duplicates.component)
 *
 * `hasIcon` - if true then render toast icon.
 * `icon` - you can pass icon class that will be applied into the toast.
 *
 * @stacked-example(Has icon, toastr/toastr-icon.component)
 * */
let NbToastrService = class NbToastrService {
    constructor(globalConfig, containerRegistry) {
        this.globalConfig = globalConfig;
        this.containerRegistry = containerRegistry;
    }
    /**
     * Shows toast with message, title and user config.
     * */
    show(message, title, userConfig) {
        const config = new NbToastrConfig(Object.assign({}, this.globalConfig, userConfig));
        const container = this.containerRegistry.get(config.position);
        const toast = { message, title, config };
        return container.attach(toast);
    }
    /**
     * Shows success toast with message, title and user config.
     * */
    success(message, title, config) {
        return this.show(message, title, Object.assign({}, config, { status: 'success' }));
    }
    /**
     * Shows info toast with message, title and user config.
     * */
    info(message, title, config) {
        return this.show(message, title, Object.assign({}, config, { status: 'info' }));
    }
    /**
     * Shows warning toast with message, title and user config.
     * */
    warning(message, title, config) {
        return this.show(message, title, Object.assign({}, config, { status: 'warning' }));
    }
    /**
     * Shows primary toast with message, title and user config.
     * */
    primary(message, title, config) {
        return this.show(message, title, Object.assign({}, config, { status: 'primary' }));
    }
    /**
     * Shows danger toast with message, title and user config.
     * */
    danger(message, title, config) {
        return this.show(message, title, Object.assign({}, config, { status: 'danger' }));
    }
    /**
     * Shows default toast with message, title and user config.
     * */
    default(message, title, config) {
        return this.show(message, title, Object.assign({}, config, { status: '' }));
    }
};
NbToastrService = __decorate([
    Injectable(),
    __param(0, Inject(NB_TOASTR_CONFIG)),
    __metadata("design:paramtypes", [NbToastrConfig,
        NbToastrContainerRegistry])
], NbToastrService);
export { NbToastrService };
//# sourceMappingURL=toastr.service.js.map