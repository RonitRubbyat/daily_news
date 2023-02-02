// nav bar
document.getElementById('navbarId').innerHTML =`
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
                    <li class="nav-item">
                        <a class="navbar-brand" href="#">
                            <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="User" width="30"
                                height="24">
                        </a>
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
    console.log(newsCategories);
    // news category section
    const categoryContainer = document.getElementById('news-category');

    const homeDiv = document.createElement('div');
    homeDiv.innerHTML = `
    <h5 onclick="loadNews()" class="m-2 hoverToColor" role="button" tabindex="0">Home</h5>
    `;
    categoryContainer.appendChild(homeDiv);

    newsCategories.forEach(newsCategory => {
        const div = document.createElement('div');
        div.innerHTML = `
        <h5 class="m-2 hoverToColor" role="button" tabindex="0">${newsCategory.category_name}</h5>
        `;
        categoryContainer.appendChild(div);
    });
};
loadCategory();