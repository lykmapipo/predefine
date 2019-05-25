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

