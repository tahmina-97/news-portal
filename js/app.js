const loadAllNews = async() => {
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        return data.data.news_category;
    }

    catch(error){
        console.log(error);
    }
}

const setNewsCategory = async() =>{
    const data = await loadAllNews();
    const ul = document.getElementById('all-categories');

    data.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `<button onclick="loadCategoryNews('${category.category_id}')" >${category.category_name}</button>`;
        li.classList.add('my-3');
        ul.appendChild(li);
        
    });
}

const loadCategoryNews =  async(categoryId) =>{
    try{
        const url= `https://openapi.programming-hero.com/api/news/category/${categoryId}`
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    }
    catch(error){
        console.log(error);
    }
    
}

const displayNews = async(data) =>{
    const categoryData = await loadAllNews();
    const notFoundMsg = document.getElementById('no-news-found');
    const newsFound = document.getElementById('news-found');
    newsFound.innerHTML=`${data.length} items found for category`;
    if(data.length === 0){
        notFoundMsg.classList.remove('hidden');
    }
    else{
        notFoundMsg.classList.add('hidden');
    }
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent ='';
    
    for(const news of data){
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card lg:card-side bg-base-100 shadow-xl rounded-none p-4">
            <figure><img class="w-64 h-full rounded-md" src="${news.thumbnail_url}" alt="Album"></figure>
            <div class="card-body">
                <h2 class="card-title">${news.title? news.title : 'No Information Found'}</h2>
                <p>${news.details.length > 200 ? news.details.slice(0,200) + '...' : news.details }</p>
                <div class="card-actions justify-between mt-3 items-center">
                    <div class="flex items-center"> 
                        <img class="h-10 w-10 rounded-full" src="${news.author.img}">
                        <div class="mx-2"> 
                            <h5 class=""> ${news.author.name? news.author.name : 'No Information Found'} </h5>
                            <h5 class="text-sm text-gray-400"> ${news.author.published_date? news.author.published_date : 'No Information Found'} </h5>

                        </div>
                    </div>
                    <div> 
                    <p> <i class="fa-regular fa-eye"></i> ${news.total_view} </p>
                    </div>
                    <div> 
                    <p> <i class="fa-solid fa-star"></i> ${news.rating.number} </p>
                    </div>
                    
                    <label for="my-modal-6" class="btn border-none bg-transparent hover:bg-indigo-200 modal-button">
                    <i class="text-2xl text-indigo-700 fa-solid fa-arrow-right-long"></i>
                    </label>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(div);

    }

}



loadCategoryNews('01');

setNewsCategory();
