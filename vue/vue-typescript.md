# vue and typescript

* install global vue-cli and create vue project
> npm install -g @vue/cli 
 
> yarn add global @vue/cli  

look version #> vue --version  

> vue create < project name >  
* new create vue.config.js
```javascript
module.exports = {
    publicPath:'./',
    pages:{
        index:{
            entry:'./src/main.ts',
            template:'./public/index.html',
            filename:'index.html',
        }
    },
    chainWebpack: config => {

    },
    css:{
        loaderOptions:{
            sass:{
                data: `@import "@/styles/variable.scss";`
            }
        }
    }
}
```
* install modules
> cnpm install vue-class-component vue-property-decorator --save    

> cnpm install ts-loader typescript tslint tslint-loader tslint-config-standard --save-dev  

```json
{
  "name": "ts-vue",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^2.6.5",
    "vue": "^2.6.10",
    "vue-class-component": "^7.1.0",
    "vue-property-decorator": "^8.2.1"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.9.2",
    "@vue/cli-plugin-eslint": "^3.9.2",
    "@vue/cli-plugin-typescript": "^3.9.0",
    "@vue/cli-service": "^3.9.2",
    "@vue/eslint-config-typescript": "^4.0.0",
    "babel-eslint": "^10.0.1",
    "eslint": "^5.16.0",
    "eslint-plugin-vue": "^5.0.0",
    "node-sass": "^4.12.0",
    "sass-loader": "^7.1.0",
    "ts-loader": "^6.0.4",
    "tslint": "^5.18.0",
    "tslint-config-standard": "^8.0.1",
    "tslint-loader": "^3.5.4",
    "typescript": "^3.5.3",
    "vue-template-compiler": "^2.6.10"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "rules": {},
    "parserOptions": {
      "parser": "babel-eslint"
    }
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
}
```
* new create file of tsconfig.json  
```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "esnext",
        "strict": true,
        "jsx": "preserve",
        "importHelpers": true,
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "sourceMap": true,
        "baseUrl": ".",
        "types": [
            "node",
            "jest",
            "webpack-env"
        ],
        "paths": {
            "@/*": [
                "src/*"
            ]
        },
        "lib": [
            "esnext",
            "dom",
            "dom.iterable",
            "scripthost"
        ]
    },
    "include": [
        "src/**/*.ts",
        "src/**/*.tsx",
        "src/**/*.vue",
        "tests/**/*.ts",
        "tests/**/*.tsx"
    ],
    "exclude": [
        "node_modules"
    ]
}
```
* new create file of tslint.json   
```json
{
    "defaultSeverity": "warning",
    "extends": [
        "tslint:recommended"
    ],
    "linterOptions": {
        "exclude": [
            "node_modules/**"
        ]
    },
    "rules": {
        "quotemark": [
            true,
            "single"
        ],
        "indent": [
            true,
            "spaces",
            2
        ],
        "interface-name": false,
        "ordered-imports": false,
        "object-literal-sort-keys": false,
        "no-consecutive-blank-lines": false,
        "no-debugger": false,
        "no-console": false
    }
}
```
* change main.js to main.ts   
* change App.vue   
```javascript
<script lang="ts">
import { Component,Vue } from 'vue-property-decorator'
@Component({
    name: 'App',
    components:{
        
    }
})
class App extends Vue {}
export default App
</script>
```