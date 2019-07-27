#### 0.6.0 (2019-07-27)

##### Chores

* **deps:**  force latest version & audit fix ([9d9eb804](https://github.com/lykmapipo/predefine/commit/9d9eb804f15d98b11fe60c677af2e580ad73125e))

##### New Features

*  implement getOneOrDefault ([93d0838d](https://github.com/lykmapipo/predefine/commit/93d0838d59f14989a25919b90391ec9f40edb4ea))

##### Code Style Changes

*  improve model jsdocs ([0b6ed5fa](https://github.com/lykmapipo/predefine/commit/0b6ed5fa48fc118df765dce943438a5f24dfd7d5))

#### 0.5.0 (2019-07-27)

##### Chores

* **deps:**  force latest version & audit fix ([02999413](https://github.com/lykmapipo/predefine/commit/029994131d5937613e7299ff22874afe0bd4a7b0))

##### New Features

*  expose autopopulate options ([be2b190c](https://github.com/lykmapipo/predefine/commit/be2b190cfcd169f2a380ce6c63c192c46de60969))

#### 0.4.0 (2019-07-22)

##### Chores

* **ci:**  re-restore mongodb service ([9e1224c2](https://github.com/lykmapipo/predefine/commit/9e1224c25b869656f35fab59577f8c1d55d21609))
* **deps:**
  *  force latest version & audit fix ([f8e9d8b0](https://github.com/lykmapipo/predefine/commit/f8e9d8b08bf0f58cc31294bf909a0d9485c18004))
  *  add test coverage deps ([4ad76c2b](https://github.com/lykmapipo/predefine/commit/4ad76c2b970cb0e3e99d43b16ffe07e15c0f7258))
* **scripts:**  update package scripts ([a63aa288](https://github.com/lykmapipo/predefine/commit/a63aa288078a8311ac65f3e62f3b93681bcb38a7))
*  ensure locales on example seeds ([d6dd61c2](https://github.com/lykmapipo/predefine/commit/d6dd61c260793cad8f1f0011907ee9cc153eaf5c))
* **security:**  use latest lodash.template version ([eb8fbac7](https://github.com/lykmapipo/predefine/commit/eb8fbac7e4cfd8eeff473185b90e4f3263048960))

##### Documentation Changes

*  add test coverage status badge ([763acae6](https://github.com/lykmapipo/predefine/commit/763acae617d2db391ce112b05055051cd4204a88))

##### New Features

*  add localized abbreviation creator ([a7ad0ba5](https://github.com/lykmapipo/predefine/commit/a7ad0ba5219a2c3b1e895afdea0cdf0d245fffe3))
*  implement createRelationsSchema ([097537e1](https://github.com/lykmapipo/predefine/commit/097537e19e3af972a8652107bb448bc0f8eec870))
*  add parseGivenRelations ([685b81e2](https://github.com/lykmapipo/predefine/commit/685b81e2bfe2bfe862657ed3ee64751c5cd89ea9))
*  map namespace to relation definition ([87b37b88](https://github.com/lykmapipo/predefine/commit/87b37b88779caa6a3089ae32fbca9a91a2a4f2b7))
*  add relations schema creator ([f2578793](https://github.com/lykmapipo/predefine/commit/f257879355f39a58ddee00c8afc3f71414dc3257))
*  add preset flag ([a6e37613](https://github.com/lykmapipo/predefine/commit/a6e3761343999d38ea8b80eafe01dc58de1ffa18))
*  add default flag ([a2ce0bb6](https://github.com/lykmapipo/predefine/commit/a2ce0bb6486edfe7d44d41f78547c336988e7d31))
* **model:**  add relations into predefine model fields ([2554a759](https://github.com/lykmapipo/predefine/commit/2554a75925350f94cbb0b26bac2d17a99dde5822))

##### Refactors

*  ensure localized name before seed ([4019c289](https://github.com/lykmapipo/predefine/commit/4019c289a80ddea2edd0d56cf6b8c9eb15a709eb))
*  ensure localized abbreviation on pre validate ([73893b7d](https://github.com/lykmapipo/predefine/commit/73893b7d2c2b6cc469d33ff57857f4129a6a0fbd))
*  ensure localized description on pre validate ([a68b5e06](https://github.com/lykmapipo/predefine/commit/a68b5e0672c6b477da58a234c5cd33215981ff5f))
*  ensure prepare seed normalize name fields ([1f0b68ed](https://github.com/lykmapipo/predefine/commit/1f0b68ed1fa853d3f186ba76fb90b338fcac0be5))
*  add localizeValuesFor helper ([92a4cc79](https://github.com/lykmapipo/predefine/commit/92a4cc79073a373dc2f8e87b76dae59fa6b95789))
*  add localized fields name helper ([c84be5b8](https://github.com/lykmapipo/predefine/commit/c84be5b8ded9fd1f69992e07a014b74d8d01f286))
*  add unique indexes create helper ([7c7ec3d6](https://github.com/lykmapipo/predefine/commit/7c7ec3d67f8e0bbb4f4d961924998b535327a7ff))
*  ensure unique namespace from env ([709e2938](https://github.com/lykmapipo/predefine/commit/709e29385b621c6bf742a6ff5facd492eb0b06d2))
*  use common helper for random color ([e4a9e135](https://github.com/lykmapipo/predefine/commit/e4a9e13574e94b9d3fb26017a6e716fcee351fc6))
*  extract constants to utils ([dc02a50f](https://github.com/lykmapipo/predefine/commit/dc02a50f1a4c4af60b8b6721336f4a25eabb3bdb))
*  ensure name locale pair in unique indexes ([d9d1ecdf](https://github.com/lykmapipo/predefine/commit/d9d1ecdf5a54b576d068c3c33036016795c1eee4))
*  migrate name, description, abbreviation to locale schema ([9a5c82f5](https://github.com/lykmapipo/predefine/commit/9a5c82f5c32efbe66446c1c283a8980705362a63))

##### Code Style Changes

*  improve model jsdocs ([5eb089fc](https://github.com/lykmapipo/predefine/commit/5eb089fc444f2d47ad390dba1e78d2c13b75ec72))
*  fix typo ([77ca10d9](https://github.com/lykmapipo/predefine/commit/77ca10d96fc59c02164943cfb6d2a94559a310c5))
*  improve code jsdocs ([c81a59de](https://github.com/lykmapipo/predefine/commit/c81a59de1a039cc925afca9721d0eb88fb6d8d89))

##### Tests

*  improve code generation specs ([8d774e7f](https://github.com/lykmapipo/predefine/commit/8d774e7f6d17440f10fc375755997f527d81a806))
*  add relation create specs ([4d88f992](https://github.com/lykmapipo/predefine/commit/4d88f9927b9a26d0bc0d3e90b5fb2c022c9c7c19))
*  add releations schema spec ([51a7c16e](https://github.com/lykmapipo/predefine/commit/51a7c16e49cf075af7b33b2a6122e01f5f72b46e))
*  improve name, abbreviation, description locale specs ([7116cb24](https://github.com/lykmapipo/predefine/commit/7116cb24f71fdc194d5ec52d684751048bd4d6d0))
*  fix integration assertions & improve seed prepare ([81585a2f](https://github.com/lykmapipo/predefine/commit/81585a2f1e42049fe05bc398768c4aeaa9befeef))
*  ensure correct namespace and bucket on preValidate ([86251897](https://github.com/lykmapipo/predefine/commit/86251897458472b3d0a67bbdcd20e2e53fdf5a36))

#### 0.3.3 (2019-07-12)

##### Chores

* **deps:**  force latest version & audit fix ([41da2562](https://github.com/lykmapipo/predefine/commit/41da25627fdc96ebf127e770f1b0287f3399abc2))

#### 0.3.2 (2019-07-09)

##### Chores

* **deps:**  force latest version & audit fix ([3dcc86af](https://github.com/lykmapipo/predefine/commit/3dcc86afb46ae90c7ad8345c0c51e4422ffc4c60))

#### 0.3.1 (2019-06-19)

##### Chores

* **deps:**  force latest version & audit fix ([7b1658c8](https://github.com/lykmapipo/predefine/commit/7b1658c816c0f3f3e8f25740f0bb335d7fadefb5))
* **ci:**  force latest node version ([bdb1f0d9](https://github.com/lykmapipo/predefine/commit/bdb1f0d9132c4051d64850cae44d0e1ad552aeae))
*  force latest engines ([93b80a6b](https://github.com/lykmapipo/predefine/commit/93b80a6bca1af15f67ab9bc5991e7fa3edcfc45f))

#### 0.3.0 (2019-06-14)

##### New Features

*  allow bucket data export ([28e33341](https://github.com/lykmapipo/predefine/commit/28e3334164e00dff7b75c2d2b359be0fd7c4ed89))

##### Bug Fixes

*  ensure correct bucket and namespace ([35636407](https://github.com/lykmapipo/predefine/commit/356364072d111d6d205aeacf186843eddc02af7e))

#### 0.2.4 (2019-06-14)

##### Chores

* **deps:**  force latest version & audit fix ([91196a7f](https://github.com/lykmapipo/predefine/commit/91196a7f540307136296dcc2cdec7665021efb77))

#### 0.2.3 (2019-06-10)

##### Chores

* **deps:**  force latest version & audit fix ([5015fbe8](https://github.com/lykmapipo/predefine/commit/5015fbe868cba555b27f0dd9a794973c5834b8a8))

#### 0.2.2 (2019-06-10)

##### Chores

* **deps:**  force latest version & audit fix ([b361df63](https://github.com/lykmapipo/predefine/commit/b361df6385f74c5d7418cf570f7a347a41bd8c17))

#### 0.2.1 (2019-06-08)

##### Chores

* **deps:**  force latest version & audit fix ([d39a2874](https://github.com/lykmapipo/predefine/commit/d39a287468c9d8d5383a264c8019cfcdeb4906dc))

#### 0.2.0 (2019-05-25)

##### Chores

* **deps:**
  *  force latest version & audit fix ([411bbe18](https://github.com/lykmapipo/predefine/commit/411bbe18c44e1cd5fcc341acffd206b1162f3c90))
  *  force latest version & audit fix ([83012859](https://github.com/lykmapipo/predefine/commit/830128599faaa1391cd5817fc8d19cb14d653039))
  *  force latest versions & audit fix ([2257c55a](https://github.com/lykmapipo/predefine/commit/2257c55af6be22cf57b7df0083d730117367c748))
  *  update and re-organize used ([8d969178](https://github.com/lykmapipo/predefine/commit/8d969178dd81e79dddf26ace44591300e1c3d00c))
* **es6:**
  *  refactor to use es6 imports ([999f7f9b](https://github.com/lykmapipo/predefine/commit/999f7f9b6f521750b433728efd61f22fe1993e96))
  *  configure package with es6 dependencies ([7e033d2e](https://github.com/lykmapipo/predefine/commit/7e033d2ea8299a91da8b77a3098409f197a274f0))
  *  add .eslintrc for test ([25109ca7](https://github.com/lykmapipo/predefine/commit/25109ca789a3201d4dbd851e4664dc4b87064f52))
  *  add mongodb on .travis.yml ([fe8f3a38](https://github.com/lykmapipo/predefine/commit/fe8f3a38431e789e89613195ebcace21bd0114af))
  *  add common config files ([147a03d1](https://github.com/lykmapipo/predefine/commit/147a03d1b0bfb413450324d1ba71759477647dc6))
* **ci:**  force latest nodejs ([26f1e578](https://github.com/lykmapipo/predefine/commit/26f1e578843074ce69ef730c4a0ed6e36872163d))
* **dependencies:**  force latest versions ([1e0b5875](https://github.com/lykmapipo/predefine/commit/1e0b58757c9da08a04d63b866226f59d8f5251b6))

##### Documentation Changes

*  clear apidocs & improve examples ([ad3ef005](https://github.com/lykmapipo/predefine/commit/ad3ef005a6ec2c1e7a5fa260224884fb94ed2603))
*  fix typos on lisense ([f343440b](https://github.com/lykmapipo/predefine/commit/f343440b0f42fb3a45b65d767fb75651fdd81603))
*  improve usage docs & drop year on license ([b678571a](https://github.com/lykmapipo/predefine/commit/b678571a4486ee9f6d539bda2b4aa244c47e1612))

##### New Features

*  export app start ([932559bf](https://github.com/lykmapipo/predefine/commit/932559bf3da9a1b825bba76b9073c5be97932ab2))
*  restore namespace enum validator ([458abe9b](https://github.com/lykmapipo/predefine/commit/458abe9b1a725c24c9a3035f707710f7f4ba0072))
* **http:**  enforce bucket on routes ([2e7afe25](https://github.com/lykmapipo/predefine/commit/2e7afe250c8253c7b68123a22bddf69cb325f56d))
* **model:**
  *  improve geometry and properties fields ([35842cc9](https://github.com/lykmapipo/predefine/commit/35842cc946e9277bd10a798c899a4bb0e51e36cf))
  *  refactor weight & color fields ([d7f5d29e](https://github.com/lykmapipo/predefine/commit/d7f5d29e8dfaa97ffb8098cd461c4c330642f283))
  *  add symbol & exportable into predefine ([f717acbb](https://github.com/lykmapipo/predefine/commit/f717acbb95b9e0006ad545fe9d3cd080fcaae003))

##### Refactors

*  use es6 imports on model ([8bf79417](https://github.com/lykmapipo/predefine/commit/8bf794173e0eb8122666119da2cf71f8dbca1523))
*  migrate to use latest dependencies & api ([8c6136e3](https://github.com/lykmapipo/predefine/commit/8c6136e3f2db8e17915c9a71728cadbab7ab970a))
*  add bucket and, name and code fields ([15c0e225](https://github.com/lykmapipo/predefine/commit/15c0e2257dedda4f87708a25962575bd0dfbaeb9))
*  migrate to common seed logics ([d379c077](https://github.com/lykmapipo/predefine/commit/d379c077c82815abaa7e63c3d19fe29a144c9d4e))
*  use latest express-common exports structure ([6852caad](https://github.com/lykmapipo/predefine/commit/6852caad3aaa09d3bc6d3349639b99fb64c2be4b))
* **model:**
  *  use createSchema helpers ([ca86a184](https://github.com/lykmapipo/predefine/commit/ca86a18408b666b414b47bbef0ef6ad4389098d8))
  *  remove unused codes ([a5d001fd](https://github.com/lykmapipo/predefine/commit/a5d001fdbac670176e467e842f73cdc5a2e5afa0))
  *  ensure Setting in namespaces ([c41cbdb8](https://github.com/lykmapipo/predefine/commit/c41cbdb87cdd0b259ce9120a5eef30b19fb2cc97))
* **router:**  use express rest actions ([1fed0f09](https://github.com/lykmapipo/predefine/commit/1fed0f09204b626a4362a83c70b1336c401bdb2c))
* ***:**  force es6 usage on jshint ([96369f0a](https://github.com/lykmapipo/predefine/commit/96369f0aa50aad1bb7fdb31f389f6d6ea8f68844))

##### Code Style Changes

*  improve model example jsdoc ([8d3e07cd](https://github.com/lykmapipo/predefine/commit/8d3e07cd15946cc2ae4ffc8c7c50127e69ac446b))
*  improve apidoc ([fcdd01a5](https://github.com/lykmapipo/predefine/commit/fcdd01a514a0fac4f9c4b9bf85f4f2221bd6832c))

##### Tests

* **unit:**
  *  refactor to use es6 ([8e13dc30](https://github.com/lykmapipo/predefine/commit/8e13dc3092bebb1655c3852ee56f6036a36baaed))
  *  refactor to use arrow for readability ([0ab81bc4](https://github.com/lykmapipo/predefine/commit/0ab81bc4c2a743cc9812c5572d4aeba1704fa975))
  *  fix schema redefinition ([4aacc1ff](https://github.com/lykmapipo/predefine/commit/4aacc1ff9f624347f83d8baa13fd2e5a589a62a1))
* **integration:**
  *  refactor to use arrow for readability ([034e5dc4](https://github.com/lykmapipo/predefine/commit/034e5dc42f83ea0828516bf27ca42f9b94fa4a41))
  *  fix and migrate to use mongoose-test-helpers ([d305db63](https://github.com/lykmapipo/predefine/commit/d305db639afd76697b4cdea30c6c2eb9d635f859))
  *  fix model get specs ([5bcc561f](https://github.com/lykmapipo/predefine/commit/5bcc561fd20f12a9d8fac9dd54f46061140d5335))
  *  refactor seed tests ([9b1f6125](https://github.com/lykmapipo/predefine/commit/9b1f6125782580aa2f5a0a17fdbc7d598715de4a))
* **http:**
  *  refactor to use arrows ([296a6996](https://github.com/lykmapipo/predefine/commit/296a6996368d5449eea53410f19614051d307567))
  *  refactor to use express-test-helpers ([3fa43a1d](https://github.com/lykmapipo/predefine/commit/3fa43a1d4a347079a8f4401583b5fbb5cb5b2cc8))
* ***:**  refactor to use latest dependencies structures ([26b073d3](https://github.com/lykmapipo/predefine/commit/26b073d3483598b001870e4cac1813a7c708bdf0))

#### 0.1.1 (2019-03-15)

##### New Features

*  allow post http verb ([60267802](https://github.com/lykmapipo/predefine/commit/60267802285d8e16fd72b56ca8ab3e5bb67137b1))

#### 0.1.0 (2019-03-14)

##### New Features

*  implement predefined model and rest api ([cf72a504](https://github.com/lykmapipo/predefine/commit/cf72a50495bf8f00676ed2603c439d34c478ab48))

##### Refactors

*  remove predefine collection field ([accc0a47](https://github.com/lykmapipo/predefine/commit/accc0a477cd3debf1b5078fe5bf7a0dde9717662))
*  allow namespace to be out of model names ([936e401c](https://github.com/lykmapipo/predefine/commit/936e401c78d816120c3b4ef7e7c9bb0ae6dd083a))

