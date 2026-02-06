# Changelog

## [1.1.0](https://github.com/toddeTV/quick-conf/compare/v1.0.0...v1.1.0) (2026-02-06)


### Features

* add `AppLandingHeroSplit` block and refactor landing page ([#128](https://github.com/toddeTV/quick-conf/issues/128)) ([6620f9a](https://github.com/toddeTV/quick-conf/commit/6620f9aff410bd65e4053ca0a814bd494dbfe121))
* update CLI cleanup list and IDE folder preservation logic ([#120](https://github.com/toddeTV/quick-conf/issues/120)) ([8db5719](https://github.com/toddeTV/quick-conf/commit/8db57196292bb64e67e1a86f190efc8d71061053))


### Bug Fixes

* release-please auto tags for release PRs ([#121](https://github.com/toddeTV/quick-conf/issues/121)) ([df92bef](https://github.com/toddeTV/quick-conf/commit/df92beff00757b6ab57ca3893e13eba015514a8c))
* release-please configuration and add version marker ([#126](https://github.com/toddeTV/quick-conf/issues/126)) ([6598e17](https://github.com/toddeTV/quick-conf/commit/6598e17830d67edfacbb30d2824f92f3b4882eb3))


### Performance Improvements

* increase memory limit for nuxt build and nuxt generate ([#124](https://github.com/toddeTV/quick-conf/issues/124)) ([861e62f](https://github.com/toddeTV/quick-conf/commit/861e62f2d5e658660992862ef4e6c582d6886a5a))


### Miscellaneous Chores

* add `@nuxt/scripts` for third-party scripts with YouTube ([#127](https://github.com/toddeTV/quick-conf/issues/127)) ([712c2ef](https://github.com/toddeTV/quick-conf/commit/712c2efa24f388f5a3b34ba23f81053d23f70123))
* add label to release-please PRs & ignore in CodeRabbit ([#119](https://github.com/toddeTV/quick-conf/issues/119)) ([662c2b2](https://github.com/toddeTV/quick-conf/commit/662c2b2cf95b190b15de417d44d7ac3c1ed7252a))
* bump version to 1.1.0-rc.0 after release ([#115](https://github.com/toddeTV/quick-conf/issues/115)) ([528fd6b](https://github.com/toddeTV/quick-conf/commit/528fd6bb8db9aaf12b37deb918ebedf560fbb0a1))
* change release please configuration to not include project name ([#117](https://github.com/toddeTV/quick-conf/issues/117)) ([a5aca73](https://github.com/toddeTV/quick-conf/commit/a5aca73220b0e72272228e677c898056885df467))


### Documentation

* create documentation index with automated versioning ([#118](https://github.com/toddeTV/quick-conf/issues/118)) ([10fbc13](https://github.com/toddeTV/quick-conf/commit/10fbc1377b63dc607d95605f9214e66b2a08287f))
* include technology links and lockfile warnings ([#125](https://github.com/toddeTV/quick-conf/issues/125)) ([e56db7c](https://github.com/toddeTV/quick-conf/commit/e56db7c2708f17149005cb7c3ed65534e632a88d))


### Styles

* update demo banner to relative positioning and soft red ([#122](https://github.com/toddeTV/quick-conf/issues/122)) ([2a7d9e7](https://github.com/toddeTV/quick-conf/commit/2a7d9e7a9bead27271e5dce866fca505f35ec019))


### Code Refactoring

* replace static gray with configured neutral colors ([#123](https://github.com/toddeTV/quick-conf/issues/123)) ([0c18251](https://github.com/toddeTV/quick-conf/commit/0c182515c7079db573a3c23375490faa00e8d2a4))

## 1.0.0 (2026-02-05)


### Features

* add @nuxt/content module ([#8](https://github.com/toddeTV/quick-conf/issues/8)) ([58c5aa3](https://github.com/toddeTV/quick-conf/commit/58c5aa3f7158f79b13b9009f7de4fafa2410d7a9))
* add @nuxt/image module ([#7](https://github.com/toddeTV/quick-conf/issues/7)) ([1978156](https://github.com/toddeTV/quick-conf/commit/19781566f64715b012a58ec8e0e74f566259af86))
* add AppConfig schema to support general settings & add logos ([#39](https://github.com/toddeTV/quick-conf/issues/39)) ([e4a9554](https://github.com/toddeTV/quick-conf/commit/e4a9554bdbb1f68d690e3e7e6467b31ec228c102))
* add AppConfig schema to support NuxtUI settings ([#38](https://github.com/toddeTV/quick-conf/issues/38)) ([d7f6a54](https://github.com/toddeTV/quick-conf/commit/d7f6a549a0ed21cdace05b90177dd06ece586c77))
* add automated dev version bump GitHub CI Actions workflow ([#76](https://github.com/toddeTV/quick-conf/issues/76)) ([7341409](https://github.com/toddeTV/quick-conf/commit/734140906746c0877ae6316616036b6273c0327e))
* add Breadcrumbs to all pages ([#49](https://github.com/toddeTV/quick-conf/issues/49)) ([349f86e](https://github.com/toddeTV/quick-conf/commit/349f86e522a82625b46f85a265714e37007cfa2b))
* add clean and empty Nuxt3 template as project foundation ([#3](https://github.com/toddeTV/quick-conf/issues/3)) ([e0bcb19](https://github.com/toddeTV/quick-conf/commit/e0bcb19eb996fd29c63ab2be6f058026a4b20f75))
* Add color mode aware image paths, components & placeholder ([#40](https://github.com/toddeTV/quick-conf/issues/40)) ([856861a](https://github.com/toddeTV/quick-conf/commit/856861a6f33f319d582da64baacadbe36e697eff))
* Add complete FAQ page implementation ([#55](https://github.com/toddeTV/quick-conf/issues/55)) ([c575381](https://github.com/toddeTV/quick-conf/commit/c575381e04e9494d85030e094b77ab7abbd43050))
* add configurable "View all Sponsors" link to index ([#64](https://github.com/toddeTV/quick-conf/issues/64)) ([a3a53db](https://github.com/toddeTV/quick-conf/commit/a3a53db1ab5b55f4c2d1e801da68fcef095b6748))
* add data model with content collections ([#10](https://github.com/toddeTV/quick-conf/issues/10)) ([75a803b](https://github.com/toddeTV/quick-conf/commit/75a803b83382b0c589fe602674a87feb77e2196b))
* add dynamic `humans.txt` & template identification metadata ([#94](https://github.com/toddeTV/quick-conf/issues/94)) ([31fca92](https://github.com/toddeTV/quick-conf/commit/31fca92f239a10f1a94b629584e6d0be004bef3c))
* add dynamic footer content with AppConfig ([#37](https://github.com/toddeTV/quick-conf/issues/37)) ([054a58b](https://github.com/toddeTV/quick-conf/commit/054a58b176515fb338eab6e6e2d036a1a7a4ff54))
* add eslint for linting & formatting ([#5](https://github.com/toddeTV/quick-conf/issues/5)) ([4b5d2d1](https://github.com/toddeTV/quick-conf/commit/4b5d2d1ebc28f6bd9684c8df258ab56df0e63bae))
* add eslint rule for max line length & change VSCode lint settings ([#20](https://github.com/toddeTV/quick-conf/issues/20)) ([caaf6da](https://github.com/toddeTV/quick-conf/commit/caaf6dadd7d36ac24cce3aec0fbb4d89b3721f8c))
* Add example dummy pages for legal content ([#57](https://github.com/toddeTV/quick-conf/issues/57)) ([e15147d](https://github.com/toddeTV/quick-conf/commit/e15147da3bb50c30bfbf3c32f7e2acba88a8e28f))
* add fake time simulation for schedule demo mode ([#109](https://github.com/toddeTV/quick-conf/issues/109)) ([151543f](https://github.com/toddeTV/quick-conf/commit/151543ffa57b7603b0b2199170ac330332baa16f))
* add GitHub Actions CI workflow for validation & tests ([#74](https://github.com/toddeTV/quick-conf/issues/74)) ([9d84a69](https://github.com/toddeTV/quick-conf/commit/9d84a69600a12eb3a93787953cf7367515c1aa4f))
* add new CodeRabbit rules & improve OG image accessibility ([#99](https://github.com/toddeTV/quick-conf/issues/99)) ([bf85cef](https://github.com/toddeTV/quick-conf/commit/bf85cef58f284624faf52d3dc0abf7eed4449f60))
* add new demo data ([#96](https://github.com/toddeTV/quick-conf/issues/96)) ([36eb57a](https://github.com/toddeTV/quick-conf/commit/36eb57a070f580e99415ec91ecfabaeec38e2fc0))
* add nuxt content collection for sponsors ([#21](https://github.com/toddeTV/quick-conf/issues/21)) ([789d3c7](https://github.com/toddeTV/quick-conf/commit/789d3c7b54d9a8c2189367e8ff37f9e3f64b616c))
* add NuxtStudio configuration ([#9](https://github.com/toddeTV/quick-conf/issues/9)) ([f919cf4](https://github.com/toddeTV/quick-conf/commit/f919cf4d153af89c23d24210483ff87ac81938af))
* add NuxtUI ([#6](https://github.com/toddeTV/quick-conf/issues/6)) ([1f5325d](https://github.com/toddeTV/quick-conf/commit/1f5325deb8adb8889fb8069af3f095c8fa8df19b))
* add release please workflow (CI action) ([#66](https://github.com/toddeTV/quick-conf/issues/66)) ([2699d75](https://github.com/toddeTV/quick-conf/commit/2699d75c7f9f8ecedfc430e009a890a68cdd2a0d))
* add Renovate bot for automated dependency updates ([#75](https://github.com/toddeTV/quick-conf/issues/75)) ([0a499af](https://github.com/toddeTV/quick-conf/commit/0a499af85b7c6f0d138b71433ce7a8890d4d163f))
* add schema-driven field descriptions to Nuxt Studio CMS ([#88](https://github.com/toddeTV/quick-conf/issues/88)) ([ee5e30c](https://github.com/toddeTV/quick-conf/commit/ee5e30c4aaaefacdc46e4985a4cb7cbdd7e8562f))
* add schemaOrg identity configuration & `og:logo` tag ([#105](https://github.com/toddeTV/quick-conf/issues/105)) ([f49df68](https://github.com/toddeTV/quick-conf/commit/f49df686e1d470e0be2121be6c315ccca111ecb3))
* add SEO module with `robots.txt`, sitemap & OG images ([#95](https://github.com/toddeTV/quick-conf/issues/95)) ([20f1fd7](https://github.com/toddeTV/quick-conf/commit/20f1fd743ef3f8b1a7f973160abbce05973eaa8f))
* add speakers with list subpage, detail subpage & dummy data ([#45](https://github.com/toddeTV/quick-conf/issues/45)) ([6e3fec9](https://github.com/toddeTV/quick-conf/commit/6e3fec95e933b5d5031387428918f9fa40c83497))
* add subpages with routing & content queries ([#14](https://github.com/toddeTV/quick-conf/issues/14)) ([8850119](https://github.com/toddeTV/quick-conf/commit/8850119c6ed1e12a8a11f46f34be2e75efd0753f))
* add talk detail subpage with logic & design ([#47](https://github.com/toddeTV/quick-conf/issues/47)) ([7d3cb3d](https://github.com/toddeTV/quick-conf/commit/7d3cb3de210409db2ace30a74d7a9afc3573d8d0))
* Add ticket page ([#51](https://github.com/toddeTV/quick-conf/issues/51)) ([f7eabd7](https://github.com/toddeTV/quick-conf/commit/f7eabd7731ebe271297e20951e0ec525786de97f))
* add var `githubProjectLink` to nuxt schema to display in footer ([#62](https://github.com/toddeTV/quick-conf/issues/62)) ([ba2e69a](https://github.com/toddeTV/quick-conf/commit/ba2e69a8b33b965e50c21099c03f25debefcebbf))
* add version to `package.json` & display version in footer ([#65](https://github.com/toddeTV/quick-conf/issues/65)) ([38fe53f](https://github.com/toddeTV/quick-conf/commit/38fe53fc510d1ab11373d13f3e0b4e7f55f60812))
* add zod as explicit dependency & update all dependencies ([#44](https://github.com/toddeTV/quick-conf/issues/44)) ([bfcb0da](https://github.com/toddeTV/quick-conf/commit/bfcb0da5b35f7ea4565ec45f7dd49a276df4b175))
* enhance CLI installation and update logic & cleanup ([#79](https://github.com/toddeTV/quick-conf/issues/79)) ([6141250](https://github.com/toddeTV/quick-conf/commit/6141250a20b3472199856d789691bd707535728d))
* Implement automatic icon detection for URLs ([#46](https://github.com/toddeTV/quick-conf/issues/46)) ([d26a44f](https://github.com/toddeTV/quick-conf/commit/d26a44f9b120ae47c50709cd6906ed861efbf275))
* implement demo mode with warning banner ([#92](https://github.com/toddeTV/quick-conf/issues/92)) ([a42a5b5](https://github.com/toddeTV/quick-conf/commit/a42a5b5775293ea5b9c4c383cb4dd1098113ec84))
* Implement design foundation ([#22](https://github.com/toddeTV/quick-conf/issues/22)) ([e5ea525](https://github.com/toddeTV/quick-conf/commit/e5ea525beaaea9d691d32ddb697948fef6135a84))
* implement index page content and design ([#42](https://github.com/toddeTV/quick-conf/issues/42)) ([fb9a46c](https://github.com/toddeTV/quick-conf/commit/fb9a46c3f019ce8329d2f2e5836942055d6a375f))
* implement modular block-based landing page architecture ([#69](https://github.com/toddeTV/quick-conf/issues/69)) ([8ff862e](https://github.com/toddeTV/quick-conf/commit/8ff862e838c5243e674c47c7927128e2ae526b10))
* implement multi-column dynamic footer configuration ([#93](https://github.com/toddeTV/quick-conf/issues/93)) ([4819257](https://github.com/toddeTV/quick-conf/commit/48192578a81eb2e52249395faed97691615b5ce6))
* implement new landing page blocks & global block properties ([#70](https://github.com/toddeTV/quick-conf/issues/70)) ([c915d73](https://github.com/toddeTV/quick-conf/commit/c915d7353f52a4594050527da568b91fde7ac049))
* implement Quick Conf CLI ([#68](https://github.com/toddeTV/quick-conf/issues/68)) ([f21f25d](https://github.com/toddeTV/quick-conf/commit/f21f25d003e26a7a726a7b1b71f6bb11132b1d7c))
* implement schedule page ([#90](https://github.com/toddeTV/quick-conf/issues/90)) ([623492f](https://github.com/toddeTV/quick-conf/commit/623492fc30b984c541d97d780f5e7869f8c65d8a))
* implement schema-driven design configuration for OG images ([#106](https://github.com/toddeTV/quick-conf/issues/106)) ([563a433](https://github.com/toddeTV/quick-conf/commit/563a4332a321c9e5a95d03b38fa46ad15d6da45c))
* implement template starter strategy with minimal data ([#101](https://github.com/toddeTV/quick-conf/issues/101)) ([a15a948](https://github.com/toddeTV/quick-conf/commit/a15a94866cebe4d1ec0d7f74fadb7c66da52d19f))
* Implement ticket discount functionality ([#54](https://github.com/toddeTV/quick-conf/issues/54)) ([6b3e074](https://github.com/toddeTV/quick-conf/commit/6b3e074858ac8017bedef8b7685ee15a04bbb73f))
* Implemented responsive CFP button in AppHeader ([#53](https://github.com/toddeTV/quick-conf/issues/53)) ([8f9de42](https://github.com/toddeTV/quick-conf/commit/8f9de42a31fc1f6cbcea90dc3d68f194359aa425))
* improve CLI installation flow and update documentation ([#72](https://github.com/toddeTV/quick-conf/issues/72)) ([35bb348](https://github.com/toddeTV/quick-conf/commit/35bb34883fd3dba5f5400e6204834c9bcf7a9433))
* integrate `lodash-es` utility library ([#29](https://github.com/toddeTV/quick-conf/issues/29)) ([cd1ae81](https://github.com/toddeTV/quick-conf/commit/cd1ae81a62c19c9144b83febb77251f963efc1c1))
* Introduce `custom-styles.css` for user theming ([#60](https://github.com/toddeTV/quick-conf/issues/60)) ([fd88a6c](https://github.com/toddeTV/quick-conf/commit/fd88a6c2959aa136174f3998ae6e7d847e346941))
* migrate app config & env vars to content JSON configuration ([#81](https://github.com/toddeTV/quick-conf/issues/81)) ([9c97557](https://github.com/toddeTV/quick-conf/commit/9c9755733c8442228f774fc010da2c368336ee02))
* migrate Nuxt Studio to local open-source nuxt module ([#77](https://github.com/toddeTV/quick-conf/issues/77)) ([95fd708](https://github.com/toddeTV/quick-conf/commit/95fd7088dbd1ef2404ab97bb042b233a9d7283e1))
* refine UI styling & add example HTML to markdown content MDC ([#59](https://github.com/toddeTV/quick-conf/issues/59)) ([7637ecb](https://github.com/toddeTV/quick-conf/commit/7637ecb942aee0fb6b96cc8ead47b3148e1e939f))
* set loading indicator color to primary color ([#58](https://github.com/toddeTV/quick-conf/issues/58)) ([0e72298](https://github.com/toddeTV/quick-conf/commit/0e722983c24b035de80a8ac1a3d42510918cf25b))
* Update packages, modify package saving behavior & fix eslint ([#31](https://github.com/toddeTV/quick-conf/issues/31)) ([08a08b5](https://github.com/toddeTV/quick-conf/commit/08a08b560d0144a54f7f3f71c4e19c16e2548347))
* upgrade all dependencies & migrate to Nuxt 4 & NuxtUI 4 ([#28](https://github.com/toddeTV/quick-conf/issues/28)) ([498e4c8](https://github.com/toddeTV/quick-conf/commit/498e4c802e00797295a73fa01e5c512a29250f18))
* upgrade from NuxtUI Basic to NuxtUI Pro ([#15](https://github.com/toddeTV/quick-conf/issues/15)) ([d656738](https://github.com/toddeTV/quick-conf/commit/d656738544335f1e8808c2376fea608e0a570898))


### Bug Fixes

* allow pnpm dependency build ([#13](https://github.com/toddeTV/quick-conf/issues/13)) ([2267691](https://github.com/toddeTV/quick-conf/commit/22676913c2a4b27e4b0519e37de4ae95b743a73e))
* do not invert sponsor images in dark mode ([#82](https://github.com/toddeTV/quick-conf/issues/82)) ([3a197d0](https://github.com/toddeTV/quick-conf/commit/3a197d090c4c1fee4fb3625dfa4f6cd40f3302ba))
* force hard page reload for admin navigation in footer ([#103](https://github.com/toddeTV/quick-conf/issues/103)) ([dd8d987](https://github.com/toddeTV/quick-conf/commit/dd8d987519797ec5927cdec8ea47f02e20e248f9))
* force newer version of sharp for NuxtImg to be able to use it ([#16](https://github.com/toddeTV/quick-conf/issues/16)) ([391ef9d](https://github.com/toddeTV/quick-conf/commit/391ef9d3034cfe1ff5a70ac044d2ba58f7610e74))
* hide custom footer column if no content is present ([#61](https://github.com/toddeTV/quick-conf/issues/61)) ([63a5cf1](https://github.com/toddeTV/quick-conf/commit/63a5cf1d23409263dcf06d8ae6583f89bc89558b))
* images in OG image & document satori limitations in OG images ([#104](https://github.com/toddeTV/quick-conf/issues/104)) ([700994a](https://github.com/toddeTV/quick-conf/commit/700994a9b6b1afca3353614cc0a1605e5fffff18))
* improve talk type color contrast & page margins ([#97](https://github.com/toddeTV/quick-conf/issues/97)) ([c0f4b83](https://github.com/toddeTV/quick-conf/commit/c0f4b8322a843b3fc699d422e003a8a72485d424))
* lifecycle hooks in `useSchedule` & grid UI ([#110](https://github.com/toddeTV/quick-conf/issues/110)) ([72a71df](https://github.com/toddeTV/quick-conf/commit/72a71df7c0e2f7967ccf0dadf034fe9e4e76412e))
* resolve hydration mismatches ([#108](https://github.com/toddeTV/quick-conf/issues/108)) ([ddb71ef](https://github.com/toddeTV/quick-conf/commit/ddb71ef89138363380a799458b609d2c2cae1bdc))
* Responsive footer layout with stretch & column wraps ([#56](https://github.com/toddeTV/quick-conf/issues/56)) ([2ecac25](https://github.com/toddeTV/quick-conf/commit/2ecac257f6ec5a6cf0dae0cd622e597f0a934724))
* set countdown component content center ([#83](https://github.com/toddeTV/quick-conf/issues/83)) ([271f626](https://github.com/toddeTV/quick-conf/commit/271f626bd0134c9a669bc7cbfcebcb037d47ba73))
* update public directory path for Nuxt v4 folder structure ([#71](https://github.com/toddeTV/quick-conf/issues/71)) ([aaea66d](https://github.com/toddeTV/quick-conf/commit/aaea66deed3b57e1ac952f6583415f42045730f1))
* use one lint extensions to avoid multiple fighting over each other ([#19](https://github.com/toddeTV/quick-conf/issues/19)) ([ceaf94c](https://github.com/toddeTV/quick-conf/commit/ceaf94cec0f3902383ceacb914610c70a62cf074))
* Zod error object path after Zod version update ([#50](https://github.com/toddeTV/quick-conf/issues/50)) ([947ec49](https://github.com/toddeTV/quick-conf/commit/947ec4986ae56baf2f72f6b5601f7bcb5192f4f1))


### Miscellaneous Chores

* add CodeRabbitAI configuration file ([#78](https://github.com/toddeTV/quick-conf/issues/78)) ([25b9258](https://github.com/toddeTV/quick-conf/commit/25b9258a2e18ae15166fad74ecb0434edb21ede1))
* add funding file ([#2](https://github.com/toddeTV/quick-conf/issues/2)) ([4b291c1](https://github.com/toddeTV/quick-conf/commit/4b291c1549c3d866d07d7cc05615ef6131c39ff9))
* add license and base documentation ([#1](https://github.com/toddeTV/quick-conf/issues/1)) ([1b2ffd1](https://github.com/toddeTV/quick-conf/commit/1b2ffd189e53cda057b74d9b2b5bb555030ded27))
* add project VSCode settings & recommended extensions ([#4](https://github.com/toddeTV/quick-conf/issues/4)) ([98a8a2b](https://github.com/toddeTV/quick-conf/commit/98a8a2b6eb373eca2dfe4992da62460beb1ac01f))
* change release please PR title pattern ([#113](https://github.com/toddeTV/quick-conf/issues/113)) ([6660bf6](https://github.com/toddeTV/quick-conf/commit/6660bf6083ff675231b3bde6421c3d0373398e1f))
* change release please PR title pattern ([#114](https://github.com/toddeTV/quick-conf/issues/114)) ([49c16dc](https://github.com/toddeTV/quick-conf/commit/49c16dc2a314c0d6bb0509a5102e4a0527ee8c00))
* configure release-please tag prefix & force sections ([#112](https://github.com/toddeTV/quick-conf/issues/112)) ([c822096](https://github.com/toddeTV/quick-conf/commit/c82209672e9b1fd96a65cb3c63b2b40dbd848f82))
* enhance CI workflows with final status check and custom PAT ([#84](https://github.com/toddeTV/quick-conf/issues/84)) ([ba9262b](https://github.com/toddeTV/quick-conf/commit/ba9262bc4a44d26dc54267ce50c77b011d7d4192))
* exclude `.nuxt` folder from VSCode search & add gitkeep ([#17](https://github.com/toddeTV/quick-conf/issues/17)) ([0a07ed4](https://github.com/toddeTV/quick-conf/commit/0a07ed4d0977b4e1b37c83d75cee980bb68489a8))
* extend LICENSE to cover content individually ([#11](https://github.com/toddeTV/quick-conf/issues/11)) ([b35b1a4](https://github.com/toddeTV/quick-conf/commit/b35b1a4bd13d7194de6eb8003513dc04e5414b81))
* fine tune ESLint rules & apply lint rules to codebase ([#33](https://github.com/toddeTV/quick-conf/issues/33)) ([6a95e4e](https://github.com/toddeTV/quick-conf/commit/6a95e4ec5ec78f430fd9000c35ecc6aaaa8c96f1))
* generalization with license and configuration updates ([#26](https://github.com/toddeTV/quick-conf/issues/26)) ([14e5181](https://github.com/toddeTV/quick-conf/commit/14e518108b7680432bd0b03f2da629afb85e5012))
* improve project configuration and dependency management ([#30](https://github.com/toddeTV/quick-conf/issues/30)) ([9280dc6](https://github.com/toddeTV/quick-conf/commit/9280dc628d590cede86fe78f976d3e4028fea75b))
* pin GitHub actions workflow ubuntu runner to version 24.04 ([#100](https://github.com/toddeTV/quick-conf/issues/100)) ([fac652b](https://github.com/toddeTV/quick-conf/commit/fac652bccd9ef79b2d6e6b3e3696ab960620ee26))
* project cleanup and documentation updates ([#63](https://github.com/toddeTV/quick-conf/issues/63)) ([a1556cc](https://github.com/toddeTV/quick-conf/commit/a1556cc0106f6dad5d649658be27186d40167faf))
* remove strict file extension enforcement in imports ([#85](https://github.com/toddeTV/quick-conf/issues/85)) ([77eac64](https://github.com/toddeTV/quick-conf/commit/77eac64517e2b2d8f042f3b6d7b469dbeb47c887))
* rename project from printed-amsterdam.com to printed-europe.com ([#12](https://github.com/toddeTV/quick-conf/issues/12)) ([61eace6](https://github.com/toddeTV/quick-conf/commit/61eace642892044acd28d814026d6e927974417e))
* update & standardize `package.json` scripts & engines ([#73](https://github.com/toddeTV/quick-conf/issues/73)) ([49aed68](https://github.com/toddeTV/quick-conf/commit/49aed682777bea2b46fa617d7ffd0d0fd4c92ebf))
* update all dependencies to latest versions ([#87](https://github.com/toddeTV/quick-conf/issues/87)) ([3baa18b](https://github.com/toddeTV/quick-conf/commit/3baa18b19356fd479b1bc376890479a3c0326912))
* use custom PAT for release-please action ([#86](https://github.com/toddeTV/quick-conf/issues/86)) ([1af61c9](https://github.com/toddeTV/quick-conf/commit/1af61c99ff7f56a29e43bf2e52e6b5702c5bc09a))


### Documentation

* add contribution and GIT & GitHub conventions ([#80](https://github.com/toddeTV/quick-conf/issues/80)) ([0e1cc81](https://github.com/toddeTV/quick-conf/commit/0e1cc8183542bbd5466253933ed0e4ac11f56d97))
* Add developer onboarding documentation ([#27](https://github.com/toddeTV/quick-conf/issues/27)) ([2653d35](https://github.com/toddeTV/quick-conf/commit/2653d35274bee0327e7ec9137f16a9c1fd82c695))
* add documentation for projects using this template ([#52](https://github.com/toddeTV/quick-conf/issues/52)) ([a414cb8](https://github.com/toddeTV/quick-conf/commit/a414cb8abb34468af2fe2ff4d8cb76b30da6228a))
* add live demo link, screenshots & author socials to README ([#98](https://github.com/toddeTV/quick-conf/issues/98)) ([d4558d1](https://github.com/toddeTV/quick-conf/commit/d4558d176db2397556c84db4736249b7ef596fd6))
* add more detailed Contribution & Attribution information ([#18](https://github.com/toddeTV/quick-conf/issues/18)) ([4a225ac](https://github.com/toddeTV/quick-conf/commit/4a225ace6a3e807d3a0db88bb29a664aa705b005))
* add OAuth App flow to template usage documentation ([#102](https://github.com/toddeTV/quick-conf/issues/102)) ([22ec6bb](https://github.com/toddeTV/quick-conf/commit/22ec6bb6dd40aa85ca32ce61f947f44ea5e7aaa6))
* enhance README screenshots & refactor captions ([#111](https://github.com/toddeTV/quick-conf/issues/111)) ([a197069](https://github.com/toddeTV/quick-conf/commit/a197069e6d02bd04462ed37ab1ddedb9599d2032))
* huge new landing page block doc & component prop refactor ([#89](https://github.com/toddeTV/quick-conf/issues/89)) ([e3563f4](https://github.com/toddeTV/quick-conf/commit/e3563f41fd8ec3e0212f74f8d3c98224385da603))
* update Nuxt Studio CMS usage & first install instructions ([#107](https://github.com/toddeTV/quick-conf/issues/107)) ([4354357](https://github.com/toddeTV/quick-conf/commit/4354357a3ae29f182c445dbb5c1af37acb02c60f))


### Code Refactoring

* Convert SEO util to composable to use app config ([#43](https://github.com/toddeTV/quick-conf/issues/43)) ([be89653](https://github.com/toddeTV/quick-conf/commit/be89653308841c490f47cc7ffdf59a7e04f979d3))
* replace all `NuxtLink` with `ULink` component ([#36](https://github.com/toddeTV/quick-conf/issues/36)) ([e418ae5](https://github.com/toddeTV/quick-conf/commit/e418ae5877e908738daf0143cb8670f993c8afef))
* standardize content naming convention with prefixes ([#91](https://github.com/toddeTV/quick-conf/issues/91)) ([ff7cd1f](https://github.com/toddeTV/quick-conf/commit/ff7cd1f83ceef0295292ecd85cb95644c856138a))
