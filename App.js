// do something!
import { Nav, NewsList } from './components/index.js';

; (function () {

  let currentCate = ""; //현재 클릭한 카테고리

  const category = [ // html 요소, 클래스, 아이디, html 텍스트
    ["li", ["category-item", "active"], "all", "전체보기"],
    ['li', ['category-item'], 'business', '비즈니스'],
    ['li', ['category-item'], 'entertainment', '엔터테인먼트'],
    ['li', ['category-item'], 'health', '건강'],
    ['li', ['category-item'], 'science', '과학'],
    ['li', ['category-item'], 'sports', '스포츠'],
    ['li', ['category-item'], 'technology', '기술']
  ];


  Nav(category);

  const categoryNav = document.querySelectorAll('.category-list > ul > li'); // 모든 카테고리 li
  for (let i = 0; i < categoryNav.length; i++) {
    categoryNav[i].addEventListener('click', function () {
      let clickId = this.id;
      currentCate = clickId; // 현재 클릭한 카테고리의 아이디값
      // 클릭 카테고리에 따라 active 추가, 제거
      for (let j = 0; j < categoryNav.length; j++) {
        categoryNav[j].classList.remove('active'); // active 클래스 모두 제거 후
      }
      categoryNav[i].classList.add('active'); // 클릭한 카테고리 li만 active 클래스 추가
      document.querySelector('.news-list-container').remove();
      document.querySelector('.scroll-observer').remove();
      //새로 불러오기
      NewsList(currentCate);
    });
  }

  NewsList(currentCate);


})()