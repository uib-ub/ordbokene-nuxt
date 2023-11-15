# Ordbøkene: nuxt


## Project setup
### Add the inflection tables:
1. Clone [vue-inflection repo](https://git.app.uib.no/spraksamlingane/vue-inflection), e. g. in the parent directory of ordbokene-nuxt.
2. Create a symlink between vue-inflection/src/components and ordbokene-nuxt/vue-inflection
Windows:
```console
mklink /d C:\path\to\repos\ordbokene-nuxt\vue-inflection C:\path\to\repos\vue-inflection\src\components

```

Mac and Linux
```console
ln -s /path/to/repos/vue-inflection/src/components /path/to/repos/ordbokene-nuxt/vue-inflection
```

When deploying, the main branch will use the version of vue-inflection specified in .gitlab-ci.yml, while other branches will use the branch vue3-dev.


### Install packages
Installing and running dev environment:
```console
npm install
```

### Develop
```console
npm run dev
```

## Text content
The text content of the help pages, about pages and contact us page are fetched at build time from the master branch of this repo:
https://git.app.uib.no/spraksamlingane/ordbokene-content


## Sitemaps
Sitemaps for the production deployment are generated once a scheduled cicd pipeline. They are generated for the main branch.
There is a scheduled pipeline for the ordbokene-dev branch that can be activated for debugging.
