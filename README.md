# Firestatic
Firestatic is used for:
* Developing static HTML websites, and
* Deploying them to the firebase hosting platform

## TODO
 * [ ] Add functionbox project
 * [ ] Fix so that when one add new images, favicons, fonts, the system
       will automatically handle that. at the moment we must restart the server.
 * [ ] Lacy load images.
 * [ ] add assets to
 * [ ] add postcss post processing of css add vendor prefixes.

## Setup

#### 1a. Manual steps
Install `https://imageoptim.com/mac`

Run these commands:
```
go get github.com/cortesi/modd/cmd/modd
go get https://github.com/unders/tmplgen
brew install openssl
npm install -g imageoptim-cli
brew install imagemagick graphicsmagick
npm install -g typescript
npm install -g firebase-tools
```

#### 2. Install project npm packages

Run command: `make install`


## Projects
* [Base](https://firestatic-base.firebaseapp.com/)


## Themes
* Autumn


## Add new project
First manually copy project/base

```
mkdir project/functionbox
cp -R project/base/* project/functionbox/
manually remove redundant files do updates...

mkdir sass/functionbox
```

## Deployment

Update the GITTAG (i.e: 0.0.1) in the Makefile. Then do this:

```
 make release
 git commit -m "bump to version: v0.0.1"
 git push
 git tag -a v0.0.1 -m "write a release message"
 git push origin v0.0.1
```

Go to project's folder and run:

```
make deploy
```

## Tools

### Performance
* [REDbot](https://redbot.org/?uri=https%3A%2F%2Ffirestatic-base.firebaseapp.com%2F)
* [Pingdom](https://tools.pingdom.com/)
* [Web Page Performance Test](https://www.webpagetest.org)
* [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

### Images
* [Pixel Density Display Listing](https://pixensity.com/)
* [Placeholder](https://placeholder.com/)
* [ImageOptim](https://imageoptim.com/mac)
* [ImageOptim-CLI](https://jamiemason.github.io/ImageOptim-CLI/)

### Responsiveness
* [XRespond](http://app.xrespond.com/)

### Colors
* [Color Tool](https://material.io/color/#!/?view.left=0&view.right=0)
* [Material Palette](https://www.materialpalette.com/)
* [Paletton](http://paletton.com/#uid=1000u0kllllaFw0g0qFqFg0w0aF)


### Site inspirations
* https://www.praqma.com/
* https://m.signalvnoise.com/
* https://unied.com/
* https://www.varvet.com/
* http://goposse.com/
* https://iveo.se/
* https://tenfifty.io/
* http://mindqore.se/
* http://goposse.com/
* http://demo.bootstrapious.com/under/
* https://borderleft.com/

## Help
Run command: `make` to list available commands.

## Docs

### Favicon
* [Favicon Generator](https://realfavicongenerator.net/)

### Icons
* [Material Icons Guide](http://google.github.io/material-design-icons/)
* [Material Design Icons](https://material.io/icons/)

### HTML
* [A free guide to HTML](http://htmlreference.io/)

### Testing
* [Browserstack](https://www.browserstack.com/)

### Firebase Hosting
* [Doc](https://firebase.google.com/docs/hosting/)
* [Report bugs](https://firebase.google.com/support/contact/bugs-features/)
* [server push using link headers](https://firebase.googleblog.com/2016/09/http2-comes-to-firebase-hosting.html)
* [Glob patterns](http://mywiki.wooledge.org/glob)

### HTTP Caching
* [HTTP Caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)


### CSS Grid
* [css-grid-supporting-browsers-without-grid](https://www.smashingmagazine.com/2017/11/css-grid-supporting-browsers-without-grid)
* [CodePen - set the width back to auto](https://codepen.io/rachelandrew/pen/vWmeOE/)

### CSS
* [Animista](http://animista.net/)
* [Material Design formular](https://codepen.io/unders/pen/QqNPrO?editors=1100)
* [Apple CSS](http://www.cssstats.com/stats?url=http%3A%2F%2Fapple.com&name=Apple)

### TypeScript
* [TypeScript](https://www.typescriptlang.org/)

### JavaScript
* [Plain JS](https://plainjs.com/javascript/)
* [Imager - Responsive images](https://github.com/BBC-News/Imager.js/)
* [Form Validation with Javascript](https://medium.com/the-ui-files/form-validation-with-javascript-4fcf4dd32846)
* [Form Validation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation)
* [HTML5 FORMS](https://daverupert.com/2017/11/happier-html5-forms/)

### Polyfills
* [Matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches)

### Images
* [ImageMagick Resize](http://www.imagemagick.org/Usage/resize/)
* [ImageMagick Crop](http://www.imagemagick.org/Usage/crop/#crop)
* [ImageMagick Shave](http://www.imagemagick.org/Usage/crop/#shave)
* [Responsive Images - Google](https://developers.google.com/web/fundamentals/design-and-ux/responsive/images)
* [picture element](https://www.html5rocks.com/en/tutorials/responsive/picture-element/)
* [Responsive Images - Opera](https://dev.opera.com/articles/responsive-images/)
* [native responsive images](https://dev.opera.com/articles/native-responsive-images/)
* [Udacity course - responsive images](https://www.udacity.com/course/responsive-images--ud882)
* [ChromeVox](http://www.chromevox.com/)
* [Picturefill](http://scottjehl.github.io/picturefill/)

### Photos
* [Unsplash](https://unsplash.com/)


### Libs
* [hyperHTML](https://github.com/WebReflection/hyperHTML)
