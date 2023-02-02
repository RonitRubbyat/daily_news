// nav bar
document.getElementById('navbarId').innerHTML = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <a class="navbar-brand" href="#"><span class="daily-back-color p-2 rounded-4">Daily</span> News</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link navLink" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link navLink" href="#">Blog</a>
                    </li>
            </div>
        </div>
    </nav>
`;
// category filde
const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
};

const displayCategory = newsCategories => {
    // console.log(newsCategories);
    // news category section
    // dinamicly home add
    const categoryContainer = document.getElementById('news-category');

    const homeDiv = document.createElement('div');
    homeDiv.innerHTML = `
    <h5 onclick="loadNews(02)" class="m-2 hoverToColor" role="button" tabindex="0">Home</h5>
    `;
    categoryContainer.appendChild(homeDiv);

    newsCategories.forEach(newsCategory => {
        const div = document.createElement('div');
        div.innerHTML = `
        <h5 onclick="loadNews(${newsCategory.category_id})" class="m-2 hoverToColor" role="button" tabindex="0">${newsCategory.category_name}</h5>
        `;
        categoryContainer.appendChild(div);
    });
    loadNews(02);
};

// loading news data
const loadNews = async categoryID => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryID}`;

    const res = await fetch(url);
    const data = await res.json();
    displayNewsInCard(data.data);
};
// displaing news cards
const displayNewsInCard = newsDatas => {
    // console.log(newsDatas);
    // news Found
    const newsFound = document.getElementById('newsFound');
    // found news section clear
    newsFound.innerHTML = '';
    newsFound.innerHTML = `
        <span>${newsDatas.length} items is found</span>
    `;
    // news card section
    const newsCardDiv = document.getElementById('newsCard');
    newsCardDiv.innerHTML = '';

    newsDatas.forEach(newsdata => {
        const div = document.createElement('div');
        div.classList.add('card', 'mb-3');
        div.innerHTML = `
            <div class="row g-0">
                <div class="col-4 p-2 d-sm-flex">
                    <img src="${newsdata.image_url ? newsdata.image_url : 'no-image found'}" class="img-fluid rounded-3">
                </div>
                <div class="col-8">
                    <div class="card-body">
                        <h5 class="card-title fw-bolder">${newsdata.title}</h5>
                        <p class="text-regular-color">${newsdata.details.slice(0, 33)}</p>
                        <p class="card-text text-ellipsis text-regular-color">${newsdata.details.slice(33, 200)}</p>
                        <p class="card-text">
                            <div class="d-flex justify-content-between align-items-center flex-wrap">
                                <div class="d-flex
                                align-items-center">
                                    <div class="authorPicSize me-2">
                                        <img class="img-fluid" src="${newsdata.author.img}">
                                    </div>
                                    <div>
                                        <p>${newsdata.author.name ? newsdata.author.name : 'no name founded'}</p>
                                        <p class="text-regular-color">${newsdata.author.published_date}</p>
                                    </div>
                                </div>
                                <div>
                                    <i class="fa-regular fa-eye"></i>
                                    <span> ${newsdata.total_view ? newsdata.total_view : 'Not Sure'}</span>
                                </div>
                                <div>
                                    <button onclick="loadNewsDataById('${newsdata._id}')" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#newsDetails">Show more <i
                                        class="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        `;
        newsCardDiv.appendChild(div);
    })
};

// display modal
const loadNewsDataById = async newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayNewsdata(data.data[0]);
};

const displayNewsdata = news => {
    // console.log(news);
    document.getElementById('newsDetailsLabel').innerText = `${news.title}`;

    document.getElementById('newsDetailsInModal').innerHTML = `
     <div class="mb-4">
        <img src="${news.thumbnail_url}" class="d-flex mx-auto" height="170px" width="150">
    </div>
    <div>
        <h6>${news.details}</h6>
    </div>
    `;
}
loadCategory();