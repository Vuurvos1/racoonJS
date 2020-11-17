// shorter queryselectors
const q = document.querySelector.bind(document);
const qa = document.querySelectorAll.bind(document);

import 'regenerator-runtime/runtime';


/**
 * List loop
 */
class MyList extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }

  get for() {
    // console.log(this.for);
    return this.getAttribute('🦝-for');
  }

  get name() {
    return this.getAttribute('name');
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChagedCallback(prop, oldVal, newVal) {
    // if (prop === '🦝-for') {
    //   console.log('🦝-for');
    // }
    if (prop === 'name') {
      this.render();
    }
  }

  connectedCallback() {
    // console.log(this[q('section')]);
    this.render();
  }

  /**
 * Render elements on page
 */
  render() {
    if (this.for) {
      for (const i of eval(this.for.split(' ')[2])) {
        this.shadow.innerHTML += `<li>${i.name} is cewl</li>`;
      }
    }
  }
}

customElements.define('my-racoon', MyList);

/**
 * Main async code
 */
async function mainCode() {
  // const url = `${window.location.origin}`;

  // const y = require('../compontents/main.racoon');
  // console.log(y);

  // const url = `main.racoon`;
  // const loadUrl = require(url);
  // console.log(loadUrl);

  // const y = `${url}/components/main.racoon`;

  // const y = await  './components/main.racoon';
  console.log(`${url}/components/main.racoon`);

  const x = await (await fetch(`./components/main.racoon`)).text();
  console.log(x);


  const list = [
    {
      name: 'Mik',
    },
    {
      name: 'Sam',
    },
    {
      name: 'Rowin',
    },
  ];

  const option = {
    name: 'Mike',
    emotie: 'blij',
  };

  console.log(parse(x, option));

  // q('body').innerHTML = tempalteing(x, option);
  q('body').innerHTML = parse(x, option);
}

mainCode();

// '<h1> {{var}} </h1>' > regex '{{}}' > var temp > {{}} == temp

// // function (obj.var text)

// const option = {
//   name: 'Mike',
//   emotie: 'blij',
// };
// const htmlText = `<h1>{{name}} is {{emotie}}</h1>`;

// const ptrn = /\{\{.*?\\}}/g;

/**
 * @param {string} html - tempalte string
 * @param {object} options - object containing custom variables
 * @return {string} - New html for in the body
 */
function tempalteing(html, options) {
  const regex1 = RegExp('\{\{.*?\}\}', 'g');

  let match;
  while ((match = regex1.exec(html)) !== null) {
    html = html.replace(match[0], options[match[0].replace(/[{}]/g, '').trim()]);
  }

  return html;
}

// tempalteing(htmlText, option);


// function looseJsonParse(obj) {
//   return Function('"use strict";return (' + obj + ')')();
// }
// console.log(looseJsonParse(
//     `for (let i = 0; i < 10; i ++) {console.log(i)}`));


// {{ if (a == b) {
//   return
// } }}


// function parse(str) {
//   return Function(`'use strict'; return (${str})`)();
// }

// parse(`for (let i = 0; i < 10; i ++) {console.log(i)}`);

// parse('4.12345 * 3.2344 - 9') // 4.336886679999999

// eval(`for (let i = 0; i < 10; i ++) {console.log(i)}`);
// Function(`for (let i = 0; i < 10; i ++) {console.log(i)}`);


// template > components

// template >

// {
//   `h1`

//   import component

//   `footer`

// }


// let match;
// while ((match = ptrn.exec(input)) != null) {
//   console.log(match);
// }

// let match;
// while (match == ptrn.exec(htmlText)) {
//   console.log(match);
// }

// let match;
// while ((match = ptrn.exec(htmlText)) != null) {
//   console.log(match);
// }


// console.log(/\{\{.*?\}\}/g.exec(htmlText));

// const matches = ptrn.execAll(htmlText);

// log('captured strings:', matches.map((m)=>m[1]));
// log(matches.map((m)=> [m[1], m.index]));
// for (const match of matches) log(match[1], 'found at', match.index);

// console.log(htmlText.match(/\{\{.*?\}\}/g));

/**
 *
 * @param {*} html
 * @param {*} options
 * @return
 */
function parse(html, options) {
  const re = /<%(.+?)%>/g;
  const reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g;
  let code = 'with(obj) { var r=[];\n';
  let cursor = 0;
  let result;
  let match;

  const add = function(line, js) {
		js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
			(code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
		return add;
  };

  while (match = re.exec(html)) {
    add(html.slice(cursor, match.index))(match[1], true);
    cursor = match.index + match[0].length;
  }
  add(html.substr(cursor, html.length - cursor));
  code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
  try {
    result = new Function('obj', code).apply(options, [options]);
  } catch (err) {
    console.error('\'' + err.message + '\'', ' in \n\nCode:\n', code, '\n');
  }
  return result;
};

// console.log(pasre(html));

// tempalte.js import main.js
