const loadCategory = async ()=>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res= await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
};

const displayCategory = newsCategories =>{
    console.log(newsCategories);
    // news category section
    const categoryContainer = document.getElementById('news-category');

    const homeDiv = document.createElement('div');
    homeDiv.innerHTML = `
    <h5 class="m-2 hoverToColor" role="button" tabindex="0">Home</h5>
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