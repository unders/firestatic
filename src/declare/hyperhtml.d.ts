 declare module 'hyperhtml/cjs/index' {
     function wire(obj?: object, typeID?: string): (template: TemplateStringsArray, ...args : any[]) => string;
     function bind(element: HTMLElement): (template: TemplateStringsArray, ...args : any[]) => string;
 }
