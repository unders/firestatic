import hyper = require('hyperhtml/cjs/index');

export declare type wireRender = (template: TemplateStringsArray, ...args : any[]) => string;

export const wire = function(obj?: object, typeID?: string): (template: TemplateStringsArray, ...args : any[]) => string {
    return hyper.wire(obj, typeID);
};

 export const bind = function(element: HTMLElement): (template: TemplateStringsArray, ...args : any[]) => string {
     return hyper.bind(element)
 };
