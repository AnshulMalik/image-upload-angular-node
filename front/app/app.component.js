"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var upload_service_1 = require("./services/upload.service");
var AppComponent = (function () {
    function AppComponent(uploadService) {
        this.uploadService = uploadService;
        this.files = null;
        this.result = '';
        this.acceptedTypes = ['image/jpeg', "image/jpg", "image/gif", "image/png"];
    }
    AppComponent.prototype.onChange = function (event) {
        var files = event.srcElement.files;
        var type = files[0].type;
        if (this.acceptedTypes.indexOf(type) === -1) {
            this.files = null;
            return alert('Please select an image');
        }
        this.files = files;
    };
    AppComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.files) {
            return alert('Please select an image file');
        }
        this.uploadService.makeFileRequest('http://localhost:3000/upload', this.files).subscribe(function (response) {
            _this.result = JSON.stringify(response);
        }, function (err) {
            console.log(err);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './form.component.html',
        providers: [upload_service_1.UploadService]
    }),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map