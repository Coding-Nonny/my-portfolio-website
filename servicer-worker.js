// service-worker.js

const CACHE_NAME = "my-cache-v1";
const urlsToCache = [
  "./assets/script/home.js",
  "./assets/script/view.js",
  "./assets/script/blog-func.js",
  "./assets/script/github-fetch.js",
  "./assets/script/mode.js",
  "./assets/script/prism.js",
  "./assets/script/lazysizes.min.js",
  "./assets/image/PXL_20230320_145608575_adobe_express.png",
  "./assets/svg/undraw_aircraft_re_m05i.svg",
  "./assets/svg/undraw_cloud_hosting_7xb1.svg",
  "./assets/svg/undraw_code_thinking_re_gka2.svg",
  "./assets/svg/undraw_editable_re_4l94.svg",
  "./assets/svg/undraw_freelancer_re_irh4.svg",
  "./assets/svg/undraw_newspaper_re_syf5.svg",
  "./assets/svg/undraw_programming_re_kg9v.svg",
  "./assets/svg/undraw_react_re_g3ui.svg",
  "./assets/svg/undraw_source_code_re_wd9m.svg",
  "./assets/svg/undraw_blog_post_re_fy5x.svg",
  "./assets/svg/undraw_coding_re_iv62.svg",
  "./assets/svg/undraw_mobile_devices_k1ok.svg",
  "./assets/svg/undraw_real_time_sync_re_nky7.svg",
  "./assets/svg/undraw_artificial_intelligence_re_enpp.svg",
  "./assets/svg/undraw_fixing_bugs_w7gi.svg",
  "./assets/svg/undraw_into_the_night_vumi.svg",
  "./assets/svg/undraw_social_share_re_qb4v.svg",
  "./assets/image/colors.png",
];

self.addEventListener(
  "install",
  function (event) {
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then(function (cache) {
          console.log("Cache opened");
          return cache.addAll(urlsToCache);
        })
    );
  }
);

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(
          function () {
            console.log(
              "Error fetching resource:",
              event.request.url
            );
          }
        );
      })
  );
});
