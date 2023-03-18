// do something!

const Nav = (category) => {

  const root = document.getElementById('root');
  const nav = CreateDom('nav', ['category-list']);  // nav class="category-list" 생성
  const ul = CreateDom('ul'); // ul 생성

  const cate_li = new Array();
  for (let i = 0; i < category.length; i++) {
    cate_li.push(CreateDom(category[i][0], category[i][1], category[i][2], category[i][3])); // 클래스, 아이디, html 텍스트를 가진 li
  }

  // ul에 각각의 li 추가
  for (let i = 0; i < cate_li.length; i++) {
    ul.appendChild(cate_li[i]);
  }
  // nav에 ul 추가
  nav.appendChild(ul);
  // HTML 요소 추가
  root.appendChild(nav);
}


// CreateDom() : html 요소, 클래스, 아이디, html 텍스트 추가해주기
function CreateDom(domType, className = [], idName = null, html = null) {
  // HTML 요소 생성
  const dom = document.createElement(domType);

  // 클래스 추가
  for (let i = 0; i < className.length; i++) {
    dom.classList.add(className[i]);
  }

  // 아이디 추가
  if (idName) { dom.id = idName }
  // html 텍스트 추가
  if (html) { dom.innerText = html; }

  return dom;
}

export default Nav;