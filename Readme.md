# Endomondo API in Javascript

Endomondo doesn't provide an official API, and I couldn't find any existing implementations in JS so I thought I'd take a stab at it myself. 

# Usage

**Note:** This is the first working attempt at getting data, not a full featured API.

1. Clone repository

```shell
$ git clone https://github.com/swyphcosmo/endomondo-js.git
$ cd endomondo-js
```

2. Copy `config.js.example` to `config.js`

```shell
$ cp config.js.example config.js
```

3. Open `config.js` in your text editor of choice and add your Endomondo login credentials { email address and password }

4. Install dependences

```shell
$ npm install
```

5. Run in Node

```shell
$ node endomondo.js
```

# Acknowledgements

Several projects were helpful while I was figuring out how Endomondo handled query data:

* [Endomondo Export](https://endomondoexport.codeplex.com/)
* [Sports Tracker Liberator](https://github.com/isoteemu/sports-tracker-liberator)
* [Endomonod-php](https://github.com/Odyno/Endomondo-php)
* [mondo-endo-export](https://github.com/Madsn/mundo-endo-import)

# License

MIT