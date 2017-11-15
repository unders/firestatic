# Firestatic
Firestatic is used for:
* Developing static HTML websites, and
* Deploying them to the firebase hosting platform

## TODO
 * [ X ] Fix bin/hasher.sh: The ordering must change: images, CSS, JS, and finally HTML files.

## Setup

#### 1a. Manual steps (if you have Go installed)

Run these commands:
```
go get github.com/cortesi/modd/cmd/modd
brew install openssl
npm install -g typescript
npm install -g firebase-tools
```

#### 1b. Manual steps (if Go is not installed)

First install: [modd](https://github.com/cortesi/modd/releases), then:
```
brew install openssl
npm install -g typescript
npm install -g firebase-tools
```


#### 2. Install npm packages

Run command: `make install`


## Projects
* [Base](https://firestatic-base.firebaseapp.com/)


## Themes
* Autumn


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

## Help
Run command: `make` to list available commands.

## Docs

### Firebase Hosting
* [Doc](https://firebase.google.com/docs/hosting/)
* [Report bugs](https://firebase.google.com/support/contact/bugs-features/)
* [server push using link headers](https://firebase.googleblog.com/2016/09/http2-comes-to-firebase-hosting.html)

### CSS
* [Apple CSS](http://www.cssstats.com/stats?url=http%3A%2F%2Fapple.com&name=Apple)

### TypeScript
* [TypeScript](https://www.typescriptlang.org/)
