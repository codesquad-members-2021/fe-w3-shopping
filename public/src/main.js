// const mainSlide = document.querySelector(".main-banner__slide");
const staticContainer = document.querySelector('.main-banner__static');
const slideContainer = document.querySelector('.main-banner__slide');
const slideBundle = document.querySelector(".slide-bundle");
const issueContainer = document.querySelector('.issue-banner__slide');
const issueBanner = document.querySelector('.issue-banner');
const issueBundle = document.querySelector('.issue-bundle');



const local = "http://localhost"
const port = 3000;
const homePath = "/data/homeContents.json";
const bannerPath = "/data/banner.json"

export function loadBannerData() {
    return fetch(`${local}:${port}${bannerPath}`)
    .then(response => response.json())
    .then(json => json.mileageList);
}

export function loadHomeContentsData() {
    return fetch(`${local}:${port}${homePath}`)
    .then(response => response.json())
    .then(json => json.contents);
}
loadHomeContentsData();
export {staticContainer, slideContainer, slideBundle, issueContainer, issueBanner, issueBundle};
