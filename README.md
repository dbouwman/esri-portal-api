# esri-portal-api

Node js wrapper to streamline communication with the ArcGIS Online / Portal API.

Note: This is a work in progress, and does not wrap the entire Portal API.

## Getting started
Install the package from npm

```
npm install esri-portal-api
```

In your project create an instance of the wrapper

```
var AGO = require('esri-portal-api');

var ago = new AGO();
//use the wrapper
ago.portal.self('YOUR-VALID-TOKEN')
.then(function(json){
  //do whatever
});

```

All methods return [q promises](https://github.com/kriskowal/q)


### Options
The constructor accepts an options object.
```
var opts ={
  baseUrl: 'http://some-other-ago-portal-url.com',
  logger: <some object that exposes a .info function>
}

var ago = new AGO(opts);
```


