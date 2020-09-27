class homeSliderCtrl {
    constructor() {
        this.myInterval = 5000;
        this.noWrapSlides = false;

        this.slides = [ {image:'https://data.whicdn.com/images/307144997/original.jpg?t=1518442689',text:"Get funding for your code projects.", id: 0},
                    {image:'/images/portada1.png',text:"Supports other projects to keep the community growing.", id: 1},
                    {image:'/images/portada3.jpg',text:"Other users can do the code you don't know how to do.", id: 2}];
    }
}

let homeSlider = {
    controller: homeSliderCtrl,
    templateUrl: 'home/homeSlider.html'
};

export default homeSlider;