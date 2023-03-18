// do something!
const NewsList = (currentCate) => {

  const apiKey = '0f9905de960846e98061dc627bb87a24';
  const pageSize = 5;

  const newsListContainer = CreateDom('div', ['news-list-container']);
  const newsList = CreateDom('article', ['news-list']);
  const scrollObserver = CreateDom('div', ['scroll-observer']);
  const img = CreateDom('img');
  img.setAttribute('src', 'img/ball-triangle.svg');
  img.setAttribute('alt', 'Loading...');

  let appendStatus = false;
  let category = currentCate; // 현재 클릭한 카테고리
  let currentPage = 1;

  //로딩될 때
  const loadingHandler = (status) => {
    if (status) {
      scrollObserver.style.display = 'block';
    } else {
      scrollObserver.style.display = 'none';
    }
  }

  // 데이터 가져오기
  const getPosts = (category, page) => {

    const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${category === 'all' ? '' : category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

    const response = axios.get(url).then((Response) => {
      // 가져올 뉴스가 없을 때
      if (Response.data.articles.length === 0) {
        scrollObserver.style.display = 'none';
      }

      Response.data.articles.forEach((item) => {
        const newsItem = CreateDom('section', ['news-item']); // section class="news-item"

        if (item.description === null) { // 내용이 없을 때 공백
          item.description = '';
        }
        if (item.urlToImage === null) { // 이미지가 없을 때 대체이미지
          item.urlToImage = 'data: image / gif; base64, R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw ==';
        }
        // 각 section 내에 HTML 삽입
        newsItem.innerHTML = `
            <div class="thumbnail">
              <a href="${item.url}" target="_blank" rel="noopener noreferrer">
                <img src="${item.urlToImage}" alt="thumbnail" />
              </a>
            </div>
            <div class="contents">
              <h2>
                <a href="${item.url}" target="_blank" rel="noopener noreferrer">
                  ${item.title}
                </a>
              </h2>
              <p>
                ${item.description}
              </p>
            </div>
        `
        setTimeout(() => { // 1초 후 newsItem들 붙이기
          newsList.appendChild(newsItem);
          loadingHandler(false);
        }, 1000);
      })

    }).catch((Error) => {
      console.log(Error);
      return;
    })


  }

  const handleScroll = () => {
    // scrollTop : 스크롤되어 올라간 높이 | scrollHeight : 스크롤 안했을 때 전체 높이 | clientHeight : 눈에 보이는 만큼의 높이
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      currentPage++;
      loadingHandler(true);
      appendStatus = true;
      getPosts(category, currentPage);
      return;
    }
  }

  getPosts(category, currentPage);

  window.addEventListener('scroll', handleScroll);



  // CreateDom() : HTML 요소, 클래스, 아이디, html 텍스트 추가해주기
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

  newsListContainer.appendChild(newsList);
  root.appendChild(newsListContainer);
  scrollObserver.appendChild(img);
  root.appendChild(scrollObserver);

}


export default NewsList;