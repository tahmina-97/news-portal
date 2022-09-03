const loadAllNews = async() => {
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        return data.data.news_category;
    }

    catch(error){
        alert(error);
    }
}

const setNewsCategory = async() =>{
    const data = await loadAllNews();
    const ul = document.getElementById('all-categories');
    // console.log(data);

    data.forEach(category => {
        
        const li = document.createElement('li');
        li.innerHTML = `<button 
        onclick="loadCategoryNews('${category.category_id}', '${category.category_name}')" >${category.category_name}</button>`;
        li.classList.add('my-3');
        ul.appendChild(li);
        
    });
}

const loadCategoryNews =  async(categoryId, categoryName) =>{
    toggleSpinner(true);

    try{
        const url= `https://openapi.programming-hero.com/api/news/category/${categoryId}`
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data, categoryName);
    }
    catch(error){
        alert(error);
    }
    
}

const displayNews = async(data, categoryName) =>{
    
    const notFoundMsg = document.getElementById('no-news-found');
    const newsFound = document.getElementById('news-found');
    newsFound.innerHTML=`${data.length} items found for category ${categoryName}`;
    if(data.length === 0){
        notFoundMsg.classList.remove('hidden');
    }
    else{
        notFoundMsg.classList.add('hidden');
    }
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent ='';

    // function minView(){
    //     data.sort((a,b) => a.total_view - b.total_view);
    //     return data

    // }
    // function maxView(){
    //     data.sort((a,b) => b.total_view - a.total_view);
    //     return data;
    // }

    // sort news by descending order of views
    data.sort((a,b) => b.total_view - a.total_view);

    for(const news of data){
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl rounded-none p-4">
                <figure><img class="w-full md:w-80 lg:w-64 h-80 md:h-96 lg:h-full rounded-md" src="${news.thumbnail_url}" alt="Album"></figure>
                <div class="card-body">
                    <h2 class="card-title">${news.title? news.title : 'No Information Found'}</h2>
                    <p>${news.details.length > 280 ? news.details.slice(0,280) + '...' : news.details }</p>
                    <div class="card-actions justify-between mt-3 items-center">
                        <div class="flex items-center"> 
                            <img class="h-10 w-10 rounded-full" src="${news.author.img}">
                            <div class="mx-2"> 
                                <h5 class=""> ${news.author?.name? news.author.name : 'No Information Found'} </h5>
                                <h5 class="text-sm text-gray-400"> ${news.author?.published_date? news.author.published_date : 'No Information Found'} </h5>
    
                            </div>
                        </div>
                        <div> 
                        <p> <i class="fa-regular fa-eye"></i> ${news.total_view === null ? 'No Info Found' : news.total_view } </p>
                        </div>
                        <div> 
                        <p> <i class="fa-solid fa-star"></i> ${news.rating?.number? news.rating?.number :  'No Info Found' } </p>
                        </div>
                        
                        <label onclick="loadNewsDetails('${news._id}')" for="my-modal-6" class="btn border-none bg-transparent hover:bg-indigo-200 modal-button">
                        <i class="text-2xl text-indigo-700 fa-solid fa-arrow-right-long"></i>
                        </label>
                    </div>
                </div>
            </div>
            `
            newsContainer.appendChild(div);
    }

    toggleSpinner(false);

}

const loadNewsDetails = async(newsId)=>{
    try{
        const url =`https://openapi.programming-hero.com/api/news/${newsId}`
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
        // console.log(data.data[0]);
    }

    catch(error){
        alert(error);
    }
}

const displayNewsDetails = async(news)=>{
    // console.log(news);
    const modalBody= document.getElementById('modal-body');
    modalBody.innerHTML=`
        <h3 class="font-bold text-lg pb-4">${news.title? news.title : 'No Title Found'}</h3>
        <img src="${news.image_url}"/>
        <p class="py-4">${news.details? news.details: 'No Information Found'}</p>
        <h4> <span class="font-semibold"> Published on: </span>  ${news.author?.published_date? news.author.published_date : 'No Info Found'} </h4>
        <div class="flex justify-around items-center modal-action">
        <p class="font-semibold">${news.total_view? news.total_view : 'No Information Found'} views </p>
        <p class="text-red-800 font-bold"> ${news.others_info?.is_trending? 'Trending' : ''}  </p>
        <label for="my-modal-6" class="btn">Close</label>
        </div>
    `
}

const toggleSpinner = isLoading => {
    const loader = document.getElementById('spinner');
    if(isLoading){
        loader.classList.remove('hidden');
    }
    else{
        loader.classList.add('hidden');
    }
}


loadCategoryNews('01', 'Breaking News');

setNewsCategory();
